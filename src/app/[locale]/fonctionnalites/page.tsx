import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Section1Jeux } from '@/components/fonctionnalites/Section1Jeux';
import { Section2Actions } from '@/components/fonctionnalites/Section2Actions';
import { Section3Coupons } from '@/components/fonctionnalites/Section3Coupons';
import { Section4Marque } from '@/components/fonctionnalites/Section4Marque';
import { Section5Menu } from '@/components/fonctionnalites/Section5Menu';
import { Section6Dashboard } from '@/components/fonctionnalites/Section6Dashboard';
import { Section7Mobile } from '@/components/fonctionnalites/Section7Mobile';
import { FinalCTA } from '@/components/home/FinalCTA';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { SITE_URL } from '@/lib/constants';
import '@/components/fonctionnalites/fonctionnalites.css';

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
      <Section1Jeux />
      <Section2Actions />
      <Section3Coupons />
      <Section4Marque />
      <Section5Menu />
      <Section6Dashboard />
      <Section7Mobile />
      <FinalCTA />
    </>
  );
}
