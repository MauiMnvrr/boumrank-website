import { Client } from '@notionhq/client';
import type { BlogPost, NotionBlock } from '@/types/blog';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_BLOG_DATABASE_ID || '';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractProperty(property: any, type: string): any {
  switch (type) {
    case 'title':
      return property?.title?.map((t: { plain_text: string }) => t.plain_text).join('') || '';
    case 'rich_text':
      return property?.rich_text?.map((t: { plain_text: string }) => t.plain_text).join('') || '';
    case 'date':
      return property?.date?.start || '';
    case 'multi_select':
      return property?.multi_select?.map((s: { name: string }) => s.name) || [];
    case 'checkbox':
      return property?.checkbox || false;
    case 'files':
      if (property?.files?.length > 0) {
        const file = property.files[0];
        return file.file?.url || file.external?.url || null;
      }
      return null;
    default:
      return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPageToPost(page: any): BlogPost {
  const props = page.properties;
  return {
    id: page.id,
    title: extractProperty(props.Title, 'title'),
    slug: extractProperty(props.Slug, 'rich_text'),
    excerpt: extractProperty(props.Excerpt, 'rich_text'),
    publishDate: extractProperty(props.PublishDate, 'date'),
    tags: extractProperty(props.Tags, 'multi_select'),
    coverImage: extractProperty(props.CoverImage, 'files'),
    author: extractProperty(props.Author, 'rich_text') || 'BoumRank',
    lastEdited: page.last_edited_time,
  };
}

export async function getBlogPosts(options?: {
  tag?: string;
  pageSize?: number;
  startCursor?: string;
}): Promise<{ posts: BlogPost[]; hasMore: boolean; nextCursor: string | null }> {
  if (!databaseId) {
    return { posts: [], hasMore: false, nextCursor: null };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {
      property: 'Published',
      checkbox: { equals: true },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const andFilters: any[] = [filter];

    if (options?.tag) {
      andFilters.push({
        property: 'Tags',
        multi_select: { contains: options.tag },
      });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: andFilters.length > 1 ? { and: andFilters } : filter,
      sorts: [{ property: 'PublishDate', direction: 'descending' }],
      page_size: options?.pageSize || 12,
      start_cursor: options?.startCursor || undefined,
    });

    const posts = response.results.map(mapPageToPost);

    return {
      posts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
    };
  } catch {
    console.error('Failed to fetch blog posts from Notion');
    return { posts: [], hasMore: false, nextCursor: null };
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!databaseId) return null;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Published', checkbox: { equals: true } },
        ],
      },
      page_size: 1,
    });

    if (response.results.length === 0) return null;
    return mapPageToPost(response.results[0]);
  } catch {
    console.error(`Failed to fetch blog post: ${slug}`);
    return null;
  }
}

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    const blocks: NotionBlock[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      blocks.push(...(response.results as any[]));
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
    } while (cursor);

    return blocks;
  } catch {
    console.error(`Failed to fetch blocks for page: ${pageId}`);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  if (!databaseId) return [];

  try {
    const { posts } = await getBlogPosts({ pageSize: 100 });
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  } catch {
    return [];
  }
}
