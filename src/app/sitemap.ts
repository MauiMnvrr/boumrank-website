import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { routing } from '@/i18n/routing';

type LocalizedPath = keyof typeof routing.pathnames;

const STATIC_PATHS: {
  path: LocalizedPath;
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
}[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/experience', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/technologie', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tarifs', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/fonctionnalites', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/a-propos', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/politique-de-confidentialite', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/conditions-generales', priority: 0.3, changeFrequency: 'yearly' },
];

function resolvePath(path: LocalizedPath, locale: 'fr' | 'en'): string {
  const map = routing.pathnames[path];
  const segment = typeof map === 'string' ? map : map[locale];
  if (segment === '/') {
    return locale === 'fr' ? SITE_URL : `${SITE_URL}/en`;
  }
  return locale === 'fr' ? `${SITE_URL}${segment}` : `${SITE_URL}/en${segment}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    const frUrl = resolvePath(path, 'fr');
    const enUrl = resolvePath(path, 'en');
    const alternates = {
      languages: { fr: frUrl, en: enUrl },
    };

    entries.push({
      url: frUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    });
    entries.push({
      url: enUrl,
      lastModified,
      changeFrequency,
      priority: priority * 0.9,
      alternates,
    });
  }

  return entries;
}
