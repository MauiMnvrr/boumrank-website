'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ExternalLink, Sun, Moon, ChevronDown, Utensils, Scissors, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { useDarkMode } from '@/components/ui/DarkModeProvider';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { AUTH_URL } from '@/lib/constants';

type SectorItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
};

const sectorItems: SectorItem[] = [
  {
    name: 'Restaurants & bars',
    href: '/#pour-qui',
    icon: <Utensils size={18} />,
    description: 'Décuplez vos avis Google et fidélisez vos clients après le service.',
  },
  {
    name: 'Salons & beauté',
    href: '/#pour-qui',
    icon: <Scissors size={18} />,
    description: 'Activez vos clientes au pic de satisfaction, juste avant qu\'elles partent.',
  },
  {
    name: 'Boutiques & retail',
    href: '/#pour-qui',
    icon: <ShoppingBag size={18} />,
    description: 'Remplacez la carte de fidélité poussiéreuse par un jeu addictif.',
  },
];

type MenuItem = {
  name: string;
  href?: string;
  dropdown?: SectorItem[];
};

const menuItems: MenuItem[] = [
  { name: 'Comment ça marche', href: '/comment-ca-marche' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Pour qui', dropdown: sectorItems },
  { name: 'Blog', href: '/blog' },
  { name: 'À propos', href: '/a-propos' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { openModal } = useOnboarding();
  const { isDark, toggle: onToggleDark } = useDarkMode();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hover-controlled dropdown with grace delay
  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(name);
  };
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

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
      <div className="container mx-auto px-6 flex justify-between items-center gap-6">
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
            width={160}
            height={40}
            className="h-10 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = item.href ? pathname === item.href : false;

            // Dropdown item
            if (item.dropdown) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--primary-blue)]',
                      'font-display font-bold text-[13px] uppercase tracking-[0.1em] transition-colors',
                      openDropdown === item.name && 'text-[var(--primary-blue)]'
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      size={14}
                      className={cn(
                        'transition-transform',
                        openDropdown === item.name && 'rotate-180'
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[380px] bg-[var(--bg-surface)] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-[var(--border-default)] p-2 backdrop-blur-md"
                      >
                        <div className="flex flex-col">
                          {item.dropdown.map((sector) => (
                            <Link
                              key={sector.name}
                              href={sector.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-elevated)] transition-colors group/item"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[linear-gradient(135deg,rgba(27,111,194,0.12)_0%,rgba(46,174,109,0.12)_100%)] flex items-center justify-center text-[var(--primary-blue)] group-hover/item:scale-110 transition-transform">
                                {sector.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-display font-bold text-sm text-[var(--text-primary)] group-hover/item:text-[var(--primary-blue)] transition-colors">
                                  {sector.name}
                                </div>
                                <div className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">
                                  {sector.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            // Regular link
            return (
              <Link
                key={item.name}
                href={item.href!}
                className={cn(
                  'text-[var(--text-secondary)] hover:text-[var(--primary-blue)]',
                  'font-display font-bold text-[13px] uppercase tracking-[0.1em] transition-all relative',
                  "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px]",
                  'after:bg-[linear-gradient(90deg,#1B6FC2_0%,#2EAE6D_100%)] hover:after:w-full after:transition-all',
                  isActive && 'text-[var(--primary-blue)] after:w-full'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Espace Client + Dark mode + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={AUTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-display font-bold text-[13px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            Espace client
            <ExternalLink size={13} className="opacity-50" />
          </a>

          <button
            onClick={onToggleDark}
            className="p-2 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all"
            aria-label="Basculer le mode sombre"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Button onClick={openModal} variant="gradient" size="sm">
            Essayer gratuitement
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            aria-label="Basculer le mode sombre"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="text-[var(--text-primary)] p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
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
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 top-[64px] bg-[var(--bg-primary)] z-[99] overflow-y-auto"
          >
            <div className="flex flex-col p-8 gap-6">
              {menuItems.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="flex flex-col gap-3">
                    <div className="font-display font-extrabold text-2xl uppercase text-[var(--text-primary)]">
                      {item.name}
                    </div>
                    <div className="pl-4 flex flex-col gap-3 border-l-2 border-[var(--border-highlight)]">
                      {item.dropdown.map((sector) => (
                        <Link
                          key={sector.name}
                          href={sector.href}
                          className="flex items-center gap-3 text-[var(--text-secondary)] font-display font-semibold text-base"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-[var(--primary-blue)]">{sector.icon}</span>
                          {sector.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={cn(
                      'font-display font-extrabold text-2xl uppercase transition-colors',
                      pathname === item.href
                        ? 'text-[var(--primary-blue)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--primary-blue)]'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}

              <div className="w-full h-px bg-[var(--border-default)] my-2" />

              <a
                href={AUTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] font-display font-bold text-lg uppercase tracking-widest"
              >
                Espace client
                <ExternalLink size={16} />
              </a>

              <Button
                onClick={(e) => {
                  openModal(e);
                  setIsMobileMenuOpen(false);
                }}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                Essayer gratuitement
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
