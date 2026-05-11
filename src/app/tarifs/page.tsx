import { Metadata } from 'next';
import { SchemaOrg, faqPageSchema, productSchema } from '@/components/seo/SchemaOrg';
import { FinalCTA } from '@/components/home/FinalCTA';
import { TarifsHero } from '@/components/tarifs/TarifsHero';
import { TarifsFeaturesCentral } from '@/components/tarifs/TarifsFeaturesCentral';
import { TarifsPlansDetail } from '@/components/tarifs/TarifsPlansDetail';
import { TarifsMultiBanner } from '@/components/tarifs/TarifsMultiBanner';
import { TarifsFaq } from '@/components/tarifs/TarifsFaq';
import { TARIFS_FAQS } from '@/data/tarifs-faqs';
import { SITE_URL, PRICING_OFFERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tarifs — Un service, trois engagements, à partir de 59€/mois',
  description:
    "Un seul service BoumRank, toutes les features incluses. Trois offres : sans engagement à 79€/mois, 6 mois à 69€/mois, 1 an à 59€/mois. Essai gratuit 14 jours sans CB.",
  alternates: { canonical: `${SITE_URL}/tarifs` },
};

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

export default function TarifsPage() {
  return (
    <>
      <SchemaOrg schemas={[faqPageSchema(TARIFS_FAQS), productSchema(plansForSchema)]} />
      <TarifsHero />
      <TarifsFeaturesCentral />
      <TarifsPlansDetail />
      <TarifsMultiBanner />
      <TarifsFaq />
      <FinalCTA />
    </>
  );
}
