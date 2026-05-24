import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { routing } from '@/i18n/routing';

type LocalizedPath = keyof typeof routing.pathnames;

const STATIC_PATHS: LocalizedPath[] = [
  '/',
  '/experience',
  '/technologie',
  '/tarifs',
  '/fonctionnalites',
  '/a-propos',
  '/contact',
  '/blog',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/conditions-generales',
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

  for (const path of STATIC_PATHS) {
    const frUrl = resolvePath(path, 'fr');
    const enUrl = resolvePath(path, 'en');
    const alternates = {
      languages: { fr: frUrl, en: enUrl, 'x-default': frUrl },
    };

    entries.push({ url: frUrl, lastModified, alternates });
    entries.push({ url: enUrl, lastModified, alternates });
  }

  return entries;
}
