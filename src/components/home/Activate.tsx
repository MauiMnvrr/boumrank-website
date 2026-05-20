'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FaGoogle, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import { SiTripadvisor } from 'react-icons/si';

const LOGOS: React.ReactNode[] = [
  <FaGoogle key="g" className="w-8 h-8" style={{ color: '#4285F4' }} />,
  <FaInstagram key="i" className="w-8 h-8" style={{ color: '#E4405F' }} />,
  <FaTiktok key="t" className="w-8 h-8" style={{ color: '#000000' }} />,
  <SiTripadvisor key="tr" className="w-8 h-8" style={{ color: '#34E0A1' }} />,
  <FaFacebook key="f" className="w-8 h-8" style={{ color: '#0866FF' }} />,
  <Mail key="m" size={32} className="text-[var(--primary-teal)]" strokeWidth={1.8} />,
];

export const Activate = () => {
  const t = useTranslations('home.activate');
  const actions = (t.raw('actions') as { label: string; sub: string }[]).map((a, i) => ({
    ...a,
    logo: LOGOS[i],
  }));

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] bg-[radial-gradient(circle,rgba(46,174,109,0.10),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-[radial-gradient(circle,rgba(27,111,194,0.10),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-12"
          >
            <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)] text-center">
              {t('h2Part1')}{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                {t('h2Em1')}
              </span>
            </h2>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
              className="group rounded-2xl bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] hover:shadow-[0_16px_48px_rgba(27,111,194,0.18)] hover:-translate-y-1 hover:border-[var(--border-highlight)] transition-all duration-300 p-5 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {action.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-base text-[var(--text-primary)] leading-tight">
                  {action.label}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-1 leading-snug">
                  {action.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
