import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getBlogPosts, getAllTags } from '@/lib/notion';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Conseils, guides et actualités sur la gamification, les avis clients et le marketing local. Découvrez comment booster votre commerce.',
  alternates: { canonical: 'https://www.boumrank.com/blog' },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentTag = params.tag || undefined;
  const { posts } = await getBlogPosts({ tag: currentTag });
  const allTags = await getAllTags();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Accueil', href: '/' }, { label: 'Blog' }]} />

      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              Blog
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase mt-4 mb-6 text-[var(--text-primary)]">
              Insights &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                Stratégies
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
              Conseils, guides et retours d&apos;expérience pour transformer votre marketing local
              grâce à la gamification.
            </p>
          </div>

          {/* Tag filters */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                  !currentTag
                    ? 'bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[#1B6FC2]'
                }`}
              >
                Tous
              </Link>
              {allTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
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

          {/* Posts grid */}
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl overflow-hidden hover:border-[#1B6FC2]/50 transition-all hover:-translate-y-1 shadow-sm"
                >
                  {/* Cover image */}
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

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
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
                        {new Date(post.publishDate).toLocaleDateString('fr-FR', {
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
                Bientôt disponible
              </h2>
              <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                Nos premiers articles arrivent bientôt. Revenez vite pour découvrir nos conseils
                sur la gamification et le marketing local !
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
