import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from 'next/font/google';
import { DarkModeProvider } from '@/components/ui/DarkModeProvider';
import { OnboardingProvider } from '@/components/ui/OnboardingProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DarkModeScript } from '@/components/ui/DarkModeScript';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
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
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | BoumRank',
    default: 'BoumRank | Transformez vos avis clients en jeux et récompenses',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE_NAME,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <DarkModeScript />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        <DarkModeProvider>
          <OnboardingProvider>
            <Navbar />
            <main className="flex-1 bg-[var(--bg-primary)] text-[var(--text-body)] transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </OnboardingProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
