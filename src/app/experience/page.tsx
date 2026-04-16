import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, softwareApplicationSchema } from '@/components/seo/SchemaOrg';
import { GameScenario } from '@/components/home/GameScenario';
import { GameShowcase } from '@/components/home/GameShowcase';
import { CTA } from '@/components/home/CTA';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: "L'Exp\u00e9rience de Jeu",
  description:
    "Plongez dans l'exp\u00e9rience BoumRank : machine \u00e0 sous, roue de la fortune, blackjack. D\u00e9couvrez comment vos clients vivent le parcours de gamification.",
  alternates: { canonical: `${SITE_URL}/experience` },
};

export default function ExperiencePage() {
  return (
    <>
      <SchemaOrg schemas={[softwareApplicationSchema()]} />

      <section className="pt-32 pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C5CFC]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1B6FC2]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Accueil', href: '/' },
              { label: "L'Exp&eacute;rience" },
            ]}
          />

          <div className="text-center mt-12 mb-4">
            <span className="text-[#7C5CFC] font-bold uppercase tracking-widest text-sm">
              Parcours client immersif
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              L&apos;exp&eacute;rience{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFC] via-[#1B6FC2] to-[#1E9DAA]">
                de jeu
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              Du scan QR Code au coupon gagnant, d&eacute;couvrez comment vos clients
              vivent une exp&eacute;rience ludique et addictive qui les fait revenir.
            </p>
          </div>
        </div>
      </section>

      <GameScenario />
      <GameShowcase />
      <CTA />
    </>
  );
}
