import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from 'next/font/google';
import { SITE_URL } from '@/lib/constants';
import './campagne.css';

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

export const metadata: Metadata = {
  title: 'BoumRank : transformez vos clients en avis 5 étoiles et en habitués',
  description:
    'Un QR code, un mini-jeu, un avis Google, une récompense en boutique. BoumRank fait jouer vos clients et les fait revenir. Réservez un appel de 15 minutes.',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'BoumRank',
    title: 'BoumRank : faites jouer vos clients, récoltez des avis 5 étoiles',
    description:
      'Un QR code, un jeu, un avis Google, une récompense en boutique. Setup en 5 minutes, sans engagement.',
    url: `${SITE_URL}/campagne`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function CampagneLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${plusJakarta.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body
        className="cmp-root antialiased"
        style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
