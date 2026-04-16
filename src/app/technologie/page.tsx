import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, softwareApplicationSchema } from '@/components/seo/SchemaOrg';
import { AIValidation } from '@/components/home/AIValidation';
import { PerformanceTracking } from '@/components/home/PerformanceTracking';
import { CTA } from '@/components/home/CTA';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Technologie IA',
  description:
    "D\u00e9couvrez la technologie derri\u00e8re BoumRank : validation IA \u00e0 99.8% de pr\u00e9cision, analytics en temps r\u00e9el et suivi de performance pour votre commerce.",
  alternates: { canonical: `${SITE_URL}/technologie` },
};

export default function TechnologiePage() {
  return (
    <>
      <SchemaOrg schemas={[softwareApplicationSchema()]} />

      <section className="pt-32 pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E9DAA]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Technologie' },
            ]}
          />

          <div className="text-center mt-12 mb-4">
            <span className="text-[#1E9DAA] font-bold uppercase tracking-widest text-sm">
              Intelligence artificielle
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              Notre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E9DAA] via-[#2EAE6D] to-[#1B6FC2]">
                technologie
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              Une IA propri&eacute;taire qui valide les preuves clients en moins de 3
              secondes, coupl&eacute;e &agrave; des analytics en temps r&eacute;el pour
              piloter votre croissance.
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
