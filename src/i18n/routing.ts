import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
  },
  pathnames: {
    '/': '/',
    '/tarifs': {
      fr: '/tarifs',
      en: '/pricing',
    },
    '/a-propos': {
      fr: '/a-propos',
      en: '/about',
    },
    '/comment-ca-marche': {
      fr: '/comment-ca-marche',
      en: '/how-it-works',
    },
    '/fonctionnalites': {
      fr: '/fonctionnalites',
      en: '/features',
    },
    '/contact': '/contact',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/experience': '/experience',
    '/technologie': {
      fr: '/technologie',
      en: '/technology',
    },
    '/mentions-legales': {
      fr: '/mentions-legales',
      en: '/legal-notice',
    },
    '/politique-de-confidentialite': {
      fr: '/politique-de-confidentialite',
      en: '/privacy-policy',
    },
    '/conditions-generales': {
      fr: '/conditions-generales',
      en: '/terms',
    },
    '/presentation': '/presentation',
  },
});

export type Locale = (typeof routing.locales)[number];
