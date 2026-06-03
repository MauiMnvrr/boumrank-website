import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { Button } from '@/components/ui/Button';
import { SITE_URL, DEMO_URL, COMPANY } from '@/lib/constants';
import { TrackedLink } from '@/components/ui/TrackedLink';
import { Mail, PlayCircle, Phone, Download } from 'lucide-react';

const SLIDE_COUNT = 8;
const PHONE_DISPLAY = '06 26 63 84 28';
const PHONE_HREF = 'tel:+33626638428';
const INSTAGRAM_HANDLE = '@we_are_boumrank';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

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
  const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => i + 1);

  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />

      <section className="pt-28 sm:pt-32 pb-14 sm:pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-[#1B6FC2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: t('breadcrumb') },
            ]}
          />

          <div className="text-center mt-10 sm:mt-12 mb-10 sm:mb-12">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-xs sm:text-sm">
              {t('eyebrow')}
            </span>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-3 sm:mt-4 mb-5 sm:mb-6 sm:leading-[1.05] text-[var(--text-primary)] text-balance">
              {t('titleLine1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                {t('titleLine2')}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed text-pretty">
              {t('lead')}
            </p>
          </div>

          <p className="text-center text-xs text-[var(--text-muted)] mb-6 sm:mb-8 uppercase font-display tracking-wider">
            {t('helper')}
          </p>

          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
            {slides.map((n) => (
              <div
                key={n}
                className="group relative rounded-xl sm:rounded-3xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[0_10px_30px_rgba(27,111,194,0.08)] sm:shadow-[0_20px_60px_rgba(27,111,194,0.12)] transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <Image
                  src={`/presentation/slide-${n}.png`}
                  alt={t('slideAlt', { number: n })}
                  width={1440}
                  height={810}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1024px"
                  className="w-full h-auto"
                  priority={n === 1}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <a href="/presentation.pdf" download className="w-full sm:w-auto max-w-xs">
              <Button variant="subtle" size="md" className="w-full sm:w-auto">
                <Download size={18} />
                {t('downloadPdf')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_40%,#2EAE6D_100%)] opacity-[0.04] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#1E9DAA] font-bold uppercase tracking-widest text-xs sm:text-sm">
              {t('cta.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mt-3 sm:mt-4 mb-5 sm:mb-6 leading-tight text-[var(--text-primary)] text-balance">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-body)] mb-8 sm:mb-10 leading-relaxed text-pretty">
              {t('cta.lead')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link href={isEn ? '/en/contact' : '/contact'} className="w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                  <Mail size={18} />
                  {t('cta.contactButton')}
                </Button>
              </Link>
              <TrackedLink
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                event="demo_click"
                payload={{ cta_location: 'presentation' }}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <PlayCircle size={18} />
                  {t('cta.demoButton')}
                </Button>
              </TrackedLink>
            </div>

            <div className="mt-10 sm:mt-12 pt-8 border-t border-[var(--border-default)]">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-5">
                {t('cta.directLabel')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href={PHONE_HREF}
                  data-cta="phone"
                  data-cta-location="presentation"
                  className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-3.5 font-data text-base font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-200 hover:border-[#1B6FC2] hover:text-[#1B6FC2] hover:shadow-md"
                >
                  <Phone
                    size={18}
                    className="text-[#2EAE6D] transition-colors group-hover:text-[#1B6FC2]"
                  />
                  {PHONE_DISPLAY}
                </a>
                <a
                  href={COMPANY.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram BoumRank"
                  data-cta="instagram"
                  data-cta-location="presentation"
                  className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-3.5 text-base font-semibold text-[var(--text-primary)] shadow-sm transition-all duration-200 hover:border-[#E84393] hover:text-[#E84393] hover:shadow-md"
                >
                  <InstagramIcon className="w-[18px] h-[18px] text-[#E84393]" />
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
