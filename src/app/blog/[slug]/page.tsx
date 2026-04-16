import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NotionRenderer } from '@/components/ui/NotionRenderer';
import { SchemaOrg, blogPostingSchema } from '@/components/seo/SchemaOrg';
import { getBlogPost, getBlogPosts, getPageBlocks } from '@/lib/notion';
import { SITE_URL } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const { posts } = await getBlogPosts({ pageSize: 100 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Article non trouvé' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
      ...(post.coverImage && {
        images: [{ url: post.coverImage, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);

  return (
    <>
      <SchemaOrg
        schemas={[
          blogPostingSchema({
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            publishDate: post.publishDate,
            author: post.author,
            coverImage: post.coverImage || undefined,
            tags: post.tags,
          }),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="py-12 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[#1B6FC2] transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Retour au blog
          </Link>

          {/* Article header */}
          <header className="mb-10">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-[10px] font-bold uppercase tracking-wider text-[#1B6FC2] bg-[#1B6FC2]/10 px-3 py-1 rounded-full hover:bg-[#1B6FC2]/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-extrabold uppercase text-[var(--text-primary)] leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-[var(--text-muted)] text-sm font-medium">
              <span className="font-bold text-[var(--text-secondary)]">
                {post.author}
              </span>
              <span>&bull;</span>
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
                priority
              />
            </div>
          )}

          {/* Article content */}
          <div className="mb-16">
            <NotionRenderer blocks={blocks} />
          </div>

          {/* Article footer */}
          <div className="border-t border-[var(--border-default)] pt-8">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-3">
                Envie d&apos;essayer BoumRank ?
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                Transformez vos avis clients en jeux et récompenses.
                Commencez gratuitement aujourd&apos;hui.
              </p>
              <Link
                href="/#cta"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-8 py-4 rounded-full font-bold uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] hover:scale-105 transition-transform"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
