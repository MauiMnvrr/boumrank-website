'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDarkMode } from '@/components/ui/DarkModeProvider';

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

export const Footer: React.FC = () => {
  const { isDark } = useDarkMode();

  return (
    <footer className="bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src={isDark ? "/logos/logo-horizontal-blanc.png" : "/logos/logo-horizontal-violet-cyan-gradient.png"}
                alt="BoumRank"
                width={200}
                height={52}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-[var(--text-muted)] text-sm max-w-xs">
              La plateforme de gamification ultime pour les commerces locaux. Transformez les avis clients en jeux et recompenses.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-bold uppercase mb-4 text-sm">Produit</h4>
            <ul className="space-y-2 text-[var(--text-muted)] text-sm">
              <li>
                <Link href="/experience" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  L&apos;Exp&eacute;rience
                </Link>
              </li>
              <li>
                <Link href="/technologie" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  Technologie
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  &Agrave; propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-primary)] font-bold uppercase mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-[var(--text-muted)] text-sm">
              <li>
                <Link href="/politique-de-confidentialite" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  Confidentialite
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#1B6FC2] cursor-pointer transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--border-default)]">
          <p className="text-[var(--text-muted)] text-xs uppercase font-bold">
            &copy; 2026 BoumRank. Tous droits reserves.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <TwitterIcon className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer w-5 h-5 transition-colors" />
            <LinkedinIcon className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer w-5 h-5 transition-colors" />
            <InstagramIcon className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer w-5 h-5 transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};
