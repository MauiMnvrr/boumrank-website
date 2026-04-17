import { Metadata } from 'next';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { FinalCTA } from '@/components/home/FinalCTA';
import { CommentCaMarcheHero } from '@/components/comment-ca-marche/CommentCaMarcheHero';
import { CommentCaMarcheSteps } from '@/components/comment-ca-marche/CommentCaMarcheSteps';
import { CommentCaMarcheCoupon } from '@/components/comment-ca-marche/CommentCaMarcheCoupon';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Comment ça marche — 4 étapes, 5 minutes, zéro friction',
  description:
    "Du setup au premier avis Google encaissé : 4 étapes détaillées + le mécanisme coupon anti-fraude expliqué. Setup 5 min, zéro app, 100% autonome.",
  alternates: { canonical: `${SITE_URL}/comment-ca-marche` },
};

export default function CommentCaMarchePage() {
  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />
      <CommentCaMarcheHero />
      <CommentCaMarcheSteps />
      <CommentCaMarcheCoupon />
      <FinalCTA />
    </>
  );
}
