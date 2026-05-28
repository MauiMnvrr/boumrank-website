'use client';

import React from 'react';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
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

type AnyHref =
  | '/'
  | '/fonctionnalites'
  | '/tarifs'
  | '/a-propos'
  | '/contact'
  | '/blog'
  | '/experience'
  | '/technologie'
  | '/presentation'
  | '/mentions-legales'
  | '/conditions-generales'
  | '/politique-de-confidentialite'
;

type AnchorHref = `/#${string}` | `/generateur-qr-demo` | `/secteurs/${string}`;

type FooterLink = {
  labelKey: string;
  href: AnyHref;
  badgeKey?: string;
};

type AnchorFooterLink = {
  labelKey: string;
  href: AnchorHref;
  badgeKey?: string;
};

export const Footer: React.FC = () => {
  const { isDark } = useDarkMode();
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const productLinks: (FooterLink | AnchorFooterLink)[] = [
    { labelKey: 'columns.product.features', href: '/fonctionnalites' },
    { labelKey: 'columns.product.pricing', href: '/tarifs' },
    {
      labelKey: 'columns.product.roiCalculator',
      href: '/#calculateur',
      badgeKey: 'badges.new',
    },
    { labelKey: 'columns.product.demo', href: '/experience' },
    { labelKey: 'columns.product.technology', href: '/technologie' },
  ];

  const solutionsLinks: (FooterLink | AnchorFooterLink)[] = [
    { labelKey: 'columns.solutions.restaurants', href: '/secteurs/restaurants' },
    { labelKey: 'columns.solutions.salons', href: '/secteurs/salons-beaute' },
    { labelKey: 'columns.solutions.retail', href: '/secteurs/boutiques-retail' },
    { labelKey: 'columns.solutions.multisite', href: '/contact' },
    {
      labelKey: 'columns.solutions.network',
      href: '/#vision',
      badgeKey: 'badges.soon',
    },
  ];

  const resourcesLinks: (FooterLink | AnchorFooterLink)[] = [
    { labelKey: 'columns.resources.blog', href: '/blog' },
    { labelKey: 'columns.resources.faq', href: '/#faq' },
    {
      labelKey: 'columns.resources.guide',
      href: '/#lead-magnet',
      badgeKey: 'badges.pdf',
    },
    {
      labelKey: 'columns.resources.qrGenerator',
      href: '/generateur-qr-demo',
      badgeKey: 'badges.free',
    },
    {
      labelKey: 'columns.resources.presentation',
      href: '/presentation',
    },
    { labelKey: 'columns.resources.about', href: '/a-propos' },
  ];

  const legalLinks: FooterLink[] = [
    { labelKey: 'columns.legal.legalNotice', href: '/mentions-legales' },
    { labelKey: 'columns.legal.terms', href: '/conditions-generales' },
    { labelKey: 'columns.legal.privacy', href: '/politique-de-confidentialite' },
    { labelKey: 'columns.legal.contact', href: '/contact' },
  ];

  const columns = [
    { titleKey: 'columns.product.title', links: productLinks },
    { titleKey: 'columns.solutions.title', links: solutionsLinks },
    { titleKey: 'columns.resources.title', links: resourcesLinks },
    { titleKey: 'columns.legal.title', links: legalLinks },
  ];

  const renderLink = (link: FooterLink | AnchorFooterLink) => {
    const label = t(link.labelKey);
    const badge = link.badgeKey ? t(link.badgeKey) : null;
    const isHash = link.href.startsWith('/#') || link.href.startsWith('/generateur') || link.href.startsWith('/secteurs/');

    const content = (
      <>
        <span>{label}</span>
        {badge && (
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)] text-white whitespace-nowrap">
            {badge}
          </span>
        )}
      </>
    );

    const className =
      'text-[var(--text-secondary)] text-sm hover:text-[var(--primary-blue)] transition-colors flex items-center gap-2 leading-snug';

    if (isHash) {
      return (
        <a href={link.href} className={className}>
          {content}
        </a>
      );
    }

    return (
      <Link href={link.href as AnyHref} className={className}>
        {content}
      </Link>
    );
  };

  return (
    <footer className="bg-[var(--bg-primary)] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top row: brand + 4 link columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand block */}
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
              {t('tagline')}
            </p>
            <div className="flex flex-col gap-2 text-xs text-[var(--text-muted)]">
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
            <div key={col.titleKey} className="col-span-1">
              <h4 className="font-display font-bold uppercase text-xs tracking-widest text-[var(--text-primary)] mb-4">
                {t(col.titleKey)}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.labelKey}>{renderLink(link)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--border-default)]">
          <p className="text-[var(--text-muted)] text-xs uppercase font-display font-bold tracking-wider text-center md:text-left">
            {t('copyright', { year })}
          </p>
          <div className="flex items-center gap-3">
            {COMPANY.socials.twitter && (
              <a
                href={COMPANY.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--primary-blue)] hover:border-[var(--border-highlight)] transition-all"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}
            {COMPANY.socials.linkedin && (
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--primary-blue)] hover:border-[var(--border-highlight)] transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {COMPANY.socials.instagram && (
              <a
                href={COMPANY.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--primary-blue)] hover:border-[var(--border-highlight)] transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
