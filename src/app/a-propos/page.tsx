import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'À propos — Liam & Maui, deux amis qui ont trouvé une pépite',
  description:
    "L'histoire de BoumRank : deux amis qui en avaient assez de voir leurs proches commerçants se noyer dans le marketing. La pépite, les résultats, la vision 2030.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
};

export default function AProposPage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          organizationSchema(),
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Accueil', url: `${SITE_URL}/` },
            { name: 'À propos', url: `${SITE_URL}/a-propos` },
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
