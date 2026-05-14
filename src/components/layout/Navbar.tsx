'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { useDarkMode } from '@/components/ui/DarkModeProvider';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { cn } from '@/lib/utils';
import { AUTH_URL } from '@/lib/constants';

type MenuItem = {
  key: 'features' | 'pricing' | 'blog' | 'about';
  href: '/fonctionnalites' | '/tarifs' | '/blog' | '/a-propos';
};

const menuItems: MenuItem[] = [
  { key: 'features', href: '/fonctionnalites' },
  { key: 'pricing', href: '/tarifs' },
  { key: 'blog', href: '/blog' },
  { key: 'about', href: '/a-propos' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useOnboarding();
  const { isDark, toggle: onToggleDark } = useDarkMode();
  const tNav = useTranslations('navbar');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
        isScrolled
          ? 'bg-[var(--glass-bg)] backdrop-blur-[16px] py-3 shadow-[var(--glass-shadow)] border-b border-[var(--glass-border)]'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center gap-4 sm:gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="cursor-pointer group flex-shrink-0"
          onClick={() => {
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Image
            src={
              isDark
                ? '/logos/logo-horizontal-blanc.png'
                : '/logos/logo-horizontal-violet-cyan-gradient.png'
            }
            alt="BoumRank"
            width={825}
            height={134}
            className="h-9 md:h-11 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'text-[var(--text-secondary)] hover:text-[var(--primary-blue)]',
                  'font-display font-bold text-[13px] uppercase tracking-[0.1em] transition-all relative',
                  "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px]",
                  'after:bg-[linear-gradient(90deg,#1B6FC2_0%,#2EAE6D_100%)] hover:after:w-full after:transition-all',
                  isActive && 'text-[var(--primary-blue)] after:w-full'
                )}
              >
                {tNav(item.key)}
              </Link>
            );
          })}
        </div>

        {/* Right side: Espace Client + Dark mode + Lang toggle + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={AUTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-display font-bold text-[13px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            {tCommon('clientPortal')}
            <ExternalLink size={13} className="opacity-50" />
          </a>

          <LanguageToggle />

          <button
            onClick={onToggleDark}
            className="p-2 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all"
            aria-label={tCommon('toggleDarkMode')}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Button onClick={openModal} variant="gradient" size="sm">
            {tCommon('tryFree')}
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            aria-label={tCommon('toggleDarkMode')}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="text-[var(--text-primary)] p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={tCommon('menu')}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-[64px] bg-[var(--bg-primary)] z-[99] overflow-y-auto"
          >
            <div className="flex flex-col p-8 gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    'font-display font-extrabold text-2xl uppercase transition-colors',
                    pathname === item.href
                      ? 'text-[var(--primary-blue)]'
                      : 'text-[var(--text-primary)] hover:text-[var(--primary-blue)]'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {tNav(item.key)}
                </Link>
              ))}

              <div className="w-full h-px bg-[var(--border-default)] my-2" />

              <a
                href={AUTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] font-display font-bold text-lg uppercase tracking-widest"
              >
                {tCommon('clientPortal')}
                <ExternalLink size={16} />
              </a>

              <LanguageToggle variant="full" />

              <Button
                onClick={(e) => {
                  openModal(e);
                  setIsMobileMenuOpen(false);
                }}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {tCommon('tryFree')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
