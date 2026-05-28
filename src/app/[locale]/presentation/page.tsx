import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { Button } from '@/components/ui/Button';
import { SITE_URL, DEMO_URL } from '@/lib/constants';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Mail, PlayCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.presentation' });
  const canonical =
    locale === 'fr'
      ? `${SITE_URL}/presentation`
      : `${SITE_URL}/en/presentation`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/presentation`,
        en: `${SITE_URL}/en/presentation`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      type: 'article',
    },
  };
}

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'presentation' });

  const isEn = locale === 'en';
  const pdfUrl = '/presentation.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH';

  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />

      <section className="pt-32 pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B6FC2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: t('breadcrumb') },
            ]}
          />

          <div className="text-center mt-12 mb-12">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              {t('eyebrow')}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-[1.05] text-[var(--text-primary)]">
              {t('titleLine1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                {t('titleLine2')}
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              {t('lead')}
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[0_24px_80px_rgba(27,111,194,0.18)] bg-[var(--bg-elevated)]">
            <div
              className="w-full"
              style={{ aspectRatio: '16 / 9', minHeight: '480px' }}
            >
              <iframe
                src={pdfUrl}
                title={t('iframeTitle')}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-center text-xs text-[var(--text-muted)] mt-4 uppercase font-display tracking-wider">
            {t('helper')}
          </p>
        </div>
      </section>

      <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_40%,#2EAE6D_100%)] opacity-[0.04] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#1E9DAA] font-bold uppercase tracking-widest text-sm">
              {t('cta.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mt-4 mb-6 leading-tight text-[var(--text-primary)]">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-[var(--text-body)] mb-10 leading-relaxed">
              {t('cta.lead')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={isEn ? '/en/contact' : '/contact'}>
                <Button variant="gradient" size="lg">
                  <Mail size={18} />
                  {t('cta.contactButton')}
                </Button>
              </Link>
              <TrackedLink href={DEMO_URL} target="_blank" rel="noopener noreferrer" event="demo_click" payload={{ cta_location: 'presentation' }}>
                <Button variant="outline" size="lg">
                  <PlayCircle size={18} />
                  {t('cta.demoButton')}
                </Button>
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
