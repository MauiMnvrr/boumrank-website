import { Metadata } from 'next';
import { SchemaOrg, faqPageSchema, productSchema } from '@/components/seo/SchemaOrg';
import { PricingTeaser } from '@/components/home/PricingTeaser';
import { FinalCTA } from '@/components/home/FinalCTA';
import { TarifsHero } from '@/components/tarifs/TarifsHero';
import { TarifsPlansDetail } from '@/components/tarifs/TarifsPlansDetail';
import { TarifsNoExtras } from '@/components/tarifs/TarifsNoExtras';
import { TarifsFaq } from '@/components/tarifs/TarifsFaq';
import { TARIFS_FAQS } from '@/data/tarifs-faqs';
import { TarifsPayment } from '@/components/tarifs/TarifsPayment';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tarifs — Un prix clair, zéro devis, zéro engagement',
  description:
    "Découvrez les 3 plans BoumRank : Essentiel 65€/mois, Performance 79€/mois, Enterprise sur devis. Essai gratuit 14 jours, résiliation en 1 clic, sans mauvaise surprise.",
  alternates: { canonical: `${SITE_URL}/tarifs` },
};

const plansForSchema = [
  {
    name: 'Essentiel',
    price: '65',
    description: "L'arme de base pour démarrer fort avec 1 jeu + branding aux couleurs + support FR.",
  },
  {
    name: 'Performance',
    price: '79',
    description: 'Le combo complet avec les 3 jeux, branding 100% custom, analytics avancés et support prioritaire.',
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    description: "Multi-établissements, API, account manager dédié et SLA — fait pour les enseignes qui jouent dans la cour des grands.",
  },
];

export default function TarifsPage() {
  return (
    <>
      <SchemaOrg schemas={[faqPageSchema(TARIFS_FAQS), productSchema(plansForSchema)]} />
      <TarifsHero />
      <PricingTeaser />
      <TarifsPlansDetail />
      <TarifsNoExtras />
      <TarifsFaq />
      <TarifsPayment />
      <FinalCTA />
    </>
  );
}
