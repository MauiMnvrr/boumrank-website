import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  SchemaOrg,
  organizationSchema,
  localBusinessSchema,
  breadcrumbSchema,
} from '@/components/seo/SchemaOrg';
import { AProposHero } from '@/components/a-propos/AProposHero';
import { AProposStory } from '@/components/a-propos/AProposStory';
import { AProposTeam } from '@/components/a-propos/AProposTeam';
import { AProposPepite } from '@/components/a-propos/AProposPepite';
import { AProposBetaClients } from '@/components/a-propos/AProposBetaClients';
import { AProposMission } from '@/components/a-propos/AProposMission';
import { AProposVision } from '@/components/a-propos/AProposVision';
import { AProposCTA } from '@/components/a-propos/AProposCTA';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.about' });
  const canonical =
    locale === 'fr' ? `${SITE_URL}/a-propos` : `${SITE_URL}/en/about`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/a-propos`,
        en: `${SITE_URL}/en/about`,
      },
    },
  };
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const aboutHome = locale === 'fr' ? 'Accueil' : 'Home';
  const aboutLabel = locale === 'fr' ? 'À propos' : 'About';
  const canonical =
    locale === 'fr' ? `${SITE_URL}/a-propos` : `${SITE_URL}/en/about`;

  return (
    <>
      <SchemaOrg
        schemas={[
          organizationSchema(),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: aboutHome, url: locale === 'fr' ? `${SITE_URL}/` : `${SITE_URL}/en` },
            { name: aboutLabel, url: canonical },
          ]),
        ]}
      />
      <AProposHero />
      <AProposStory />
      <AProposTeam />
      <AProposPepite />
      <AProposBetaClients />
      <AProposMission />
      <AProposVision />
      <AProposCTA />
    </>
  );
}
