import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SchemaOrg, faqPageSchema, productSchema } from '@/components/seo/SchemaOrg';
import { FinalCTA } from '@/components/home/FinalCTA';
import { TarifsHero } from '@/components/tarifs/TarifsHero';
import { TarifsFeaturesCentral } from '@/components/tarifs/TarifsFeaturesCentral';
import { TarifsPlansDetail } from '@/components/tarifs/TarifsPlansDetail';
import { TarifsMultiBanner } from '@/components/tarifs/TarifsMultiBanner';
import { TarifsFaq } from '@/components/tarifs/TarifsFaq';
import { TARIFS_FAQS } from '@/data/tarifs-faqs';
import { SITE_URL, PRICING_OFFERS } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.pricing' });
  const canonical =
    locale === 'fr' ? `${SITE_URL}/tarifs` : `${SITE_URL}/en/pricing`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/tarifs`,
        en: `${SITE_URL}/en/pricing`,
      },
    },
  };
}

const plansForSchema = PRICING_OFFERS.map((offer) => ({
  name: offer.label,
  price: String(offer.price),
  description:
    offer.id === 'yearly'
      ? `Service complet BoumRank avec engagement 12 mois (économisez ${offer.yearlySaving}€/an), notre meilleur deal.`
      : offer.id === 'six-months'
        ? `Service complet BoumRank avec engagement 6 mois (économisez ${offer.yearlySaving}€/an).`
        : 'Service complet BoumRank, sans engagement, résiliable à tout moment.',
}));

export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SchemaOrg schemas={[faqPageSchema(TARIFS_FAQS), productSchema(plansForSchema)]} />
      <TarifsHero />
      <TarifsPlansDetail />
      <TarifsFeaturesCentral />
      <TarifsMultiBanner />
      <TarifsFaq />
      <FinalCTA />
    </>
  );
}
