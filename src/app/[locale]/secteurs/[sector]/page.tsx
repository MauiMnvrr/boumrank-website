import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectorPageClient } from '@/components/secteurs/SectorPageClient';
import { SECTORS, SECTOR_SLUGS, getSectorBySlug } from '@/data/sectors';
import { SITE_URL } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Static params — pre-render all sector pages at build time          */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return SECTOR_SLUGS.flatMap((slug) => [
    { locale: 'fr', sector: slug },
    { locale: 'en', sector: slug },
  ]);
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}): Promise<Metadata> {
  const { locale, sector: slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return {};

  const d = locale === 'en' ? sector.en : sector.fr;
  const canonical =
    locale === 'fr'
      ? `${SITE_URL}/secteurs/${slug}`
      : `${SITE_URL}/en/sectors/${slug}`;

  return {
    title: d.seo.title,
    description: d.seo.description,
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/secteurs/${slug}`,
        en: `${SITE_URL}/en/sectors/${slug}`,
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; sector: string }>;
}) {
  const { locale, sector: slug } = await params;
  setRequestLocale(locale);

  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const isEn = locale === 'en';
  const d = isEn ? sector.en : sector.fr;

  const breadcrumbs = [
    { label: 'BoumRank', href: '/' as const },
    { label: d.name },
  ];

  return (
    <>
      <SchemaOrg
        schemas={[
          organizationSchema(),
          {
            '@type': 'WebPage',
            name: d.seo.title,
            description: d.seo.description,
            url: isEn
              ? `${SITE_URL}/en/sectors/${slug}`
              : `${SITE_URL}/secteurs/${slug}`,
          },
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />
      <SectorPageClient sector={sector} locale={locale} />
    </>
  );
}
