import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NotionRenderer } from '@/components/ui/NotionRenderer';
import { SchemaOrg, blogPostingSchema } from '@/components/seo/SchemaOrg';
import { getBlogPost, getBlogPosts, getPageBlocks, type BlogLocale } from '@/lib/notion';
import { SITE_URL } from '@/lib/constants';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const fr = await getBlogPosts({ pageSize: 100, locale: 'fr' });
  const en = await getBlogPosts({ pageSize: 100, locale: 'en' });
  return [
    ...fr.posts.map((post) => ({ locale: 'fr', slug: post.slug })),
    ...en.posts.map((post) => ({ locale: 'en', slug: post.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, { locale: locale as BlogLocale });
  if (!post) return { title: locale === 'en' ? 'Article not found' : 'Article non trouvé' };

  const canonical =
    locale === 'fr'
      ? `${SITE_URL}/blog/${post.slug}`
      : `${SITE_URL}/en/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogPost(slug, { locale: locale as BlogLocale });
  if (!post) notFound();

  const blocks = await getPageBlocks(post.id);
  const isEn = locale === 'en';
  const dateLocale = isEn ? 'en-US' : 'fr-FR';

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
            locale,
          }),
        ]}
      />

      <Breadcrumbs
        items={[
          { label: isEn ? 'Home' : 'Accueil', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="py-12 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[#1B6FC2] transition-colors mb-8 text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            {isEn ? 'Back to blog' : 'Retour au blog'}
          </Link>

          <header className="mb-10">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={{ pathname: '/blog', query: { tag } }}
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
              <span>•</span>
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString(dateLocale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </header>

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

          <div className="mb-16">
            <NotionRenderer blocks={blocks} />
          </div>

          <div className="border-t border-[var(--border-default)] pt-8">
            <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-3">
                {isEn ? 'Want to try BoumRank?' : 'Envie d’essayer BoumRank ?'}
              </h3>
              <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                {isEn
                  ? 'Turn your customer reviews into games and rewards. Get started for free today.'
                  : 'Transformez vos avis clients en jeux et récompenses. Commencez gratuitement aujourd’hui.'}
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-8 py-4 rounded-full font-bold uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] hover:scale-105 transition-transform"
              >
                {isEn ? 'Start now' : 'Commencer maintenant'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
