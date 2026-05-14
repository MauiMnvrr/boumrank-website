import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getBlogPosts, getAllTags, type BlogLocale } from '@/lib/notion';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.blog' });
  const canonical = locale === 'fr' ? `${SITE_URL}/blog` : `${SITE_URL}/en/blog`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: { fr: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` },
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const currentTag = sp.tag || undefined;
  const blogLocale = locale as BlogLocale;
  const { posts } = await getBlogPosts({ tag: currentTag, locale: blogLocale });
  const allTags = await getAllTags(blogLocale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const isEnEmpty = locale === 'en' && posts.length === 0 && !process.env.NOTION_BLOG_DATABASE_ID_EN;
  const dateLocale = locale === 'en' ? 'en-US' : 'fr-FR';
  const allLabel = locale === 'en' ? 'All' : 'Tous';
  const eyebrow = locale === 'en' ? 'Blog' : 'Blog';
  const titleEyebrow = locale === 'en' ? 'Insights & ' : 'Insights & ';
  const titleHighlight = locale === 'en' ? 'Strategies' : 'Stratégies';

  return (
    <>
      <Breadcrumbs items={[{ label: locale === 'en' ? 'Home' : 'Accueil', href: '/' }, { label: t('title') }]} />

      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              {eyebrow}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase mt-4 mb-6 text-[var(--text-primary)]">
              {titleEyebrow}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                {titleHighlight}
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              {t('lead')}
            </p>
          </div>

          {isEnEmpty ? (
            <div className="max-w-xl mx-auto text-center py-12 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl p-10">
              <span className="text-6xl mb-6 block">🌍</span>
              <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4">
                {t('comingSoon.title')}
              </h2>
              <p className="text-[var(--text-secondary)] mb-8">
                {t('comingSoon.lead')}
              </p>
              <a
                href={`${SITE_URL}/blog`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-transform"
              >
                {t('comingSoon.cta')}
              </a>
            </div>
          ) : (
            <>
              {allTags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  <Link
                    href={{ pathname: '/blog' }}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                      !currentTag
                        ? 'bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[#1B6FC2]'
                    }`}
                  >
                    {allLabel}
                  </Link>
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={{ pathname: '/blog', query: { tag } }}
                      className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                        currentTag === tag
                          ? 'bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white'
                          : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[#1B6FC2]'
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {posts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link
                      key={post.id}
                      href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                      className="group bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl overflow-hidden hover:border-[#1B6FC2]/50 transition-all hover:-translate-y-1 shadow-sm"
                    >
                      <div className="relative aspect-[16/9] bg-[var(--bg-elevated)]">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#1B6FC2]/20 to-[#2EAE6D]/20 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-bold uppercase tracking-wider text-[#1B6FC2] bg-[#1B6FC2]/10 px-2 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <h2 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-2 group-hover:text-[#1B6FC2] transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-[var(--text-muted)] text-xs font-medium">
                          <span>{post.author}</span>
                          <time dateTime={post.publishDate}>
                            {new Date(post.publishDate).toLocaleDateString(dateLocale, {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <span className="text-6xl mb-6 block">📝</span>
                  <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4">
                    {tCommon('learnMore')}
                  </h2>
                  <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                    {t('noPosts')}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
