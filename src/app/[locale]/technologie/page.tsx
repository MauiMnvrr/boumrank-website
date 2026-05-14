import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, softwareApplicationSchema } from '@/components/seo/SchemaOrg';
import { AIValidation } from '@/components/home/AIValidation';
import { PerformanceTracking } from '@/components/home/PerformanceTracking';
import { CTA } from '@/components/home/CTA';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.technology' });
  const canonical =
    locale === 'fr' ? `${SITE_URL}/technologie` : `${SITE_URL}/en/technology`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: { fr: `${SITE_URL}/technologie`, en: `${SITE_URL}/en/technology` },
    },
  };
}

export default async function TechnologiePage({
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E9DAA]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: isEn ? 'Technology' : 'Technologie' },
            ]}
          />

          <div className="text-center mt-12 mb-4">
            <span className="text-[#1E9DAA] font-bold uppercase tracking-widest text-sm">
              {isEn ? 'Artificial intelligence' : 'Intelligence artificielle'}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-[1.05] text-[var(--text-primary)]">
              {isEn ? 'Our ' : 'Notre '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9DAA] via-[#2EAE6D] to-[#1B6FC2]">
                {isEn ? 'technology' : 'technologie'}
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? 'A proprietary AI that validates customer proofs in under 3 seconds, paired with real-time analytics to drive your growth.'
                : 'Une IA propriétaire qui valide les preuves clients en moins de 3 secondes, couplée à des analytics en temps réel pour piloter votre croissance.'}
            </p>
          </div>
        </div>
      </section>

      <AIValidation />
      <PerformanceTracking />
      <CTA />
    </>
  );
}
