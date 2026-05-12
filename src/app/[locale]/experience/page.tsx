import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, softwareApplicationSchema } from '@/components/seo/SchemaOrg';
import { GameScenario } from '@/components/home/GameScenario';
import { GameShowcase } from '@/components/home/GameShowcase';
import { CTA } from '@/components/home/CTA';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.experience' });
  const canonical =
    locale === 'fr' ? `${SITE_URL}/experience` : `${SITE_URL}/en/experience`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: { fr: `${SITE_URL}/experience`, en: `${SITE_URL}/en/experience` },
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  return (
    <>
      <SchemaOrg schemas={[softwareApplicationSchema()]} />

      <section className="pt-32 pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C5CFC]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1B6FC2]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'The Experience' : "L'Expérience" },
            ]}
          />

          <div className="text-center mt-12 mb-4">
            <span className="text-[#7C5CFC] font-bold uppercase tracking-widest text-sm">
              {isEn ? 'Immersive customer journey' : 'Parcours client immersif'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              {isEn ? 'The ' : "L'"}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFC] via-[#1B6FC2] to-[#1E9DAA]">
                {isEn ? 'experience' : 'expérience de jeu'}
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? 'From QR scan to winning coupon, see how your customers go through a playful, addictive experience that brings them back.'
                : "Du scan QR Code au coupon gagnant, découvrez comment vos clients vivent une expérience ludique et addictive qui les fait revenir."}
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
