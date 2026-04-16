export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  tags: string[];
  coverImage: string | null;
  author: string;
  lastEdited: string;
}

export interface BlogPostWithContent extends BlogPost {
  blocks: NotionBlock[];
}

export interface NotionBlock {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
