import type { Metadata } from 'next';
import { Section1Menu } from '@/components/fonctionnalites/Section1Menu';
import { Section2Mecanique } from '@/components/fonctionnalites/Section2Mecanique';
import { Section3Pilotage } from '@/components/fonctionnalites/Section3Pilotage';
import { FinalCTA } from '@/components/home/FinalCTA';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fonctionnalités — Le menu, les jeux, les coupons et le dashboard',
  description:
    'Toute la mécanique BoumRank en 3 sections : le menu digital qui tease le jeu, les actions/lots/coupons configurables, et le dashboard de pilotage. 3 avantages concurrentiels exclusifs.',
  alternates: {
    canonical: `${SITE_URL}/fonctionnalites`,
  },
};

export default function FonctionnalitesPage() {
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
