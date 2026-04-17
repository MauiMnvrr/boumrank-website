import { Metadata } from 'next';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { FinalCTA } from '@/components/home/FinalCTA';
import { AProposHero } from '@/components/a-propos/AProposHero';
import { AProposStory } from '@/components/a-propos/AProposStory';
import { AProposTeam } from '@/components/a-propos/AProposTeam';
import { AProposMission } from '@/components/a-propos/AProposMission';
import { AProposPepite } from '@/components/a-propos/AProposPepite';
import { AProposBetaClients } from '@/components/a-propos/AProposBetaClients';
import { AProposVision } from '@/components/a-propos/AProposVision';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'À propos — Maui & Liam, deux fondateurs marseillais',
  description:
    "BoumRank est né du pivot de Feednback en mars 2026. L'équipe, la mission, les clients beta, et la vision 2030 de la marketplace cross-promo entre commerces locaux.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
};

export default function AProposPage() {
  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />
      <AProposHero />
      <AProposStory />
      <AProposTeam />
      <AProposMission />
      <AProposPepite />
      <AProposBetaClients />
      <AProposVision />
      <FinalCTA />
    </>
  );
}
