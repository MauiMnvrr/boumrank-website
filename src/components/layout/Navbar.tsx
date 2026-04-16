'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { useDarkMode } from '@/components/ui/DarkModeProvider';
import { AUTH_URL } from '@/lib/constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useOnboarding();
  const { isDark, toggle: onToggleDark } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "L'Exp\u00e9rience", href: '/experience' },
    { name: 'Technologie', href: '/technologie' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-md py-3 shadow-lg border-b border-[var(--border-default)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="cursor-pointer group"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Image
            src={isDark ? "/logos/logo-horizontal-blanc.png" : "/logos/logo-horizontal-violet-cyan-gradient.png"}
            alt="BoumRank"
            width={280}
            height={176}
            className="h-44 w-auto transition-transform group-hover:scale-105 -my-12"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[var(--text-secondary)] hover:text-[#1B6FC2] font-bold text-[13px] uppercase tracking-[0.1em] transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#1B6FC2] hover:after:w-full after:transition-all ${
                pathname === item.href ? 'text-[#1B6FC2] after:w-full' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <a
            href={AUTH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-bold text-[13px] uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            Espace Client
            <ExternalLink size={14} className="opacity-50" />
          </a>

          <button
            onClick={onToggleDark}
            className="p-2 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all"
            aria-label="Basculer le mode sombre"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(27, 111, 194, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-7 py-3 rounded-full font-bold text-[13px] uppercase tracking-wider shadow-[0_0_15px_rgba(27,111,194,0.3)] transition-all flex items-center justify-center"
          >
            Essayer gratuitement
          </motion.button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            aria-label="Basculer le mode sombre"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-[var(--text-primary)] p-2 hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 top-[70px] bg-[var(--bg-primary)] z-[99] overflow-y-auto"
          >
            <div className="flex flex-col p-8 gap-8 items-center text-center">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[var(--text-primary)] font-extrabold text-2xl uppercase hover:text-[#1B6FC2] transition-colors ${
                    pathname === item.href ? 'text-[#1B6FC2]' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="w-full h-px bg-[var(--border-default)] my-4" />
              <a
                href={AUTH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] font-bold text-lg uppercase tracking-widest"
              >
                Espace Client
              </a>
              <button
                onClick={(e) => {
                  openModal(e as unknown as React.MouseEvent);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white py-5 rounded-full font-extrabold uppercase text-lg shadow-[0_0_30px_rgba(27,111,194,0.3)] flex items-center justify-center"
              >
                Essayer gratuitement
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
