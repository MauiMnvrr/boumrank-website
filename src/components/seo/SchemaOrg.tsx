import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, COMPANY } from '@/lib/constants';

// SAFE: All JSON-LD content is generated from application constants and
// typed data structures — no user input is interpolated into the HTML.

interface SchemaOrgProps {
  schemas: Record<string, unknown>[];
}

export function SchemaOrg({ schemas }: SchemaOrgProps) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/logo-horizontal-violet-cyan-gradient.png`,
    description: SITE_DESCRIPTION,
    foundingDate: String(COMPANY.foundingYear),
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY.email,
      contactType: 'customer service',
      availableLanguage: 'French',
    },
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '65',
      highPrice: '79',
      priceCurrency: 'EUR',
      offerCount: 3,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '500',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'fr',
    description: SITE_DESCRIPTION,
  };
}

export function faqPageSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function productSchema(plans: Array<{
  name: string;
  price: string;
  description: string;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${SITE_NAME} - Plateforme de gamification`,
    description: SITE_DESCRIPTION,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: plans
      .filter((p) => p.price !== 'Sur Mesure')
      .map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.price.replace('\u20ac', ''),
        priceCurrency: 'EUR',
        priceValidUntil: new Date(
          new Date().getFullYear() + 1,
          0,
          1
        ).toISOString().split('T')[0],
        availability: 'https://schema.org/InStock',
        description: plan.description,
      })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishDate: string;
  author: string;
  coverImage?: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logos/logo-horizontal-violet-cyan-gradient.png`,
      },
    },
    ...(post.coverImage && {
      image: {
        '@type': 'ImageObject',
        url: post.coverImage,
      },
    }),
    ...(post.tags && {
      keywords: post.tags.join(', '),
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    inLanguage: 'fr',
  };
}
