import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section1Menu } from '@/components/fonctionnalites/Section1Menu';
import { Section2Mecanique } from '@/components/fonctionnalites/Section2Mecanique';
import { Section3Pilotage } from '@/components/fonctionnalites/Section3Pilotage';
import { FinalCTA } from '@/components/home/FinalCTA';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.features' });
  const canonical =
    locale === 'fr' ? `${SITE_URL}/fonctionnalites` : `${SITE_URL}/en/features`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/fonctionnalites`,
        en: `${SITE_URL}/en/features`,
      },
    },
  };
}

export default async function FonctionnalitesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />
      <Section1Menu />
      <Section2Mecanique />
      <Section3Pilotage />
      <FinalCTA />
    </>
  );
}
