'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail } from 'lucide-react';
import { useDarkMode } from '@/components/ui/DarkModeProvider';
import { COMPANY } from '@/lib/constants';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

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
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

type LinkColumn = {
  title: string;
  links: { label: string; href: string; external?: boolean; badge?: string }[];
};

const columns: LinkColumn[] = [
  {
    title: 'Produit',
    links: [
      { label: 'Comment ça marche', href: '/comment-ca-marche' },
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Calculateur ROI', href: '/#calculateur', badge: 'Nouveau' },
      { label: 'Démo en ligne', href: '/experience' },
      { label: 'Technologie', href: '/technologie' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Restaurants & bars', href: '/#pour-qui' },
      { label: 'Salons & beauté', href: '/#pour-qui' },
      { label: 'Boutiques & retail', href: '/#pour-qui' },
      { label: 'Multi-sites', href: '/contact' },
      { label: 'Le réseau (vision)', href: '/#vision', badge: 'Bientôt' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Guide : 50 avis Google en 30 j', href: '/#lead-magnet', badge: 'PDF' },
      { label: 'Générateur de QR de démo', href: '/generateur-qr-demo', badge: 'Gratuit' },
      { label: 'À propos', href: '/a-propos' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'CGV', href: '/conditions-generales' },
      { label: 'Confidentialité', href: '/politique-de-confidentialite' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const Footer: React.FC = () => {
  const { isDark } = useDarkMode();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-primary)] pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top row: brand + 4 link columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand block (col-span-2 on desktop) */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <Image
                src={
                  isDark
                    ? '/logos/logo-horizontal-blanc.png'
                    : '/logos/logo-horizontal-violet-cyan-gradient.png'
                }
                alt="BoumRank"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
              Le marketing local qui se joue. Plus d&apos;avis Google, plus de followers,
              plus de clients qui reviennent. Setup en 5 minutes.
            </p>
            <div className="flex flex-col gap-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[var(--primary-teal)]" />
                <span>Conçu à Marseille · Soutenu par Pépite Aix-Marseille</span>
              </div>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 hover:text-[var(--primary-blue)] transition-colors"
              >
                <Mail size={14} className="text-[var(--primary-teal)]" />
                <span>{COMPANY.email}</span>
              </a>
            </div>
          </div>

          {/* 4 link columns */}
          {columns.map((col) => (
            <div key={col.title} className="col-span-1">
              <h4 className="font-display font-bold uppercase text-xs tracking-widest text-[var(--text-primary)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-secondary)] text-sm hover:text-[var(--primary-blue)] transition-colors flex items-center gap-2 leading-snug"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)] text-white whitespace-nowrap">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row: copyright + socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--border-default)]">
          <p className="text-[var(--text-muted)] text-xs uppercase font-display font-bold tracking-wider text-center md:text-left">
            © {year} BoumRank — Tous droits réservés ·{' '}
            <span className="text-[var(--text-secondary)]">SAS en cours de création</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/boumrank"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--primary-blue)] hover:border-[var(--border-highlight)] transition-all"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/boumrank"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--primary-blue)] hover:border-[var(--border-highlight)] transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/boumrank"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--primary-blue)] hover:border-[var(--border-highlight)] transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
