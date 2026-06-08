import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from 'next/font/google';
import { DarkModeProvider } from '@/components/ui/DarkModeProvider';
import { OnboardingProvider } from '@/components/ui/OnboardingProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DarkModeScript } from '@/components/ui/DarkModeScript';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { ConsentBoot } from '@/components/analytics/ConsentBoot';
import { AnalyticsScripts } from '@/components/analytics/AnalyticsScripts';
import { Suspense } from 'react';
import { JourneyTracking } from '@/components/analytics/JourneyTracking';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { routing, type Locale } from '@/i18n/routing';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '700'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  const ogLocale = locale === 'en' ? 'en_US' : 'fr_FR';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_NAME}`,
      default: t('title'),
    },
    description: t('description'),
    openGraph: {
      type: 'website',
      locale: ogLocale,
      siteName: SITE_NAME,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      languages: {
        fr: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <DarkModeScript />
        <ConsentBoot />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        <NextIntlClientProvider>
          <DarkModeProvider>
            <OnboardingProvider>
              <Navbar />
              <main className="flex-1 bg-[var(--bg-primary)] text-[var(--text-body)] transition-colors duration-300">
                {children}
              </main>
              <Footer />
              <CookieBanner />
            </OnboardingProvider>
          </DarkModeProvider>
        </NextIntlClientProvider>
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <JourneyTracking />
        </Suspense>
      </body>
    </html>
  );
}
