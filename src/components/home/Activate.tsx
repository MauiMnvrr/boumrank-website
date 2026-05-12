'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

const GoogleLogo = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2c-.4.4 6.6-4.8 6.6-14.9 0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" className="w-9 h-9" aria-hidden="true">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD600" />
        <stop offset="25%" stopColor="#FF7A00" />
        <stop offset="50%" stopColor="#FF0069" />
        <stop offset="75%" stopColor="#D300C5" />
        <stop offset="100%" stopColor="#7638FA" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="#fff" />
  </svg>
);

const TikTokLogo = () => (
  <svg viewBox="0 0 24 24" className="w-9 h-9" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#010101" />
    <path d="M16.5 7.4a4.4 4.4 0 0 1-2.8-1.1V14a3.6 3.6 0 1 1-3.6-3.6c.2 0 .4 0 .6.1v2a1.7 1.7 0 1 0 1.2 1.6V4.5h1.9a4.4 4.4 0 0 0 2.7 3z" fill="#25F4EE" transform="translate(-0.6 0.6)" />
    <path d="M16.5 7.4a4.4 4.4 0 0 1-2.8-1.1V14a3.6 3.6 0 1 1-3.6-3.6c.2 0 .4 0 .6.1v2a1.7 1.7 0 1 0 1.2 1.6V4.5h1.9a4.4 4.4 0 0 0 2.7 3z" fill="#FE2C55" transform="translate(0.6 -0.6)" />
    <path d="M16.5 7.4a4.4 4.4 0 0 1-2.8-1.1V14a3.6 3.6 0 1 1-3.6-3.6c.2 0 .4 0 .6.1v2a1.7 1.7 0 1 0 1.2 1.6V4.5h1.9a4.4 4.4 0 0 0 2.7 3z" fill="#fff" />
  </svg>
);

const TripadvisorLogo = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
    <circle cx="24" cy="24" r="20" fill="#34E0A1" />
    <circle cx="17" cy="26" r="6" fill="#fff" />
    <circle cx="31" cy="26" r="6" fill="#fff" />
    <circle cx="17" cy="26" r="2.6" fill="#000" />
    <circle cx="31" cy="26" r="2.6" fill="#000" />
    <path d="M14 17 Q24 11 34 17" stroke="#000" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" className="w-9 h-9" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#1877F2" />
    <path d="M14.6 12.6h2.2l.4-2.7h-2.6V8.2c0-.8.4-1.5 1.6-1.5h1.1V4.4S16.3 4.2 15.4 4.2c-2 0-3.3 1.2-3.3 3.4v2.3H9.7v2.7h2.4v6.7h2.5z" fill="#fff" />
  </svg>
);

const LOGOS: React.ReactNode[] = [
  <GoogleLogo key="g" />,
  <InstagramLogo key="i" />,
  <TikTokLogo key="t" />,
  <TripadvisorLogo key="tr" />,
  <FacebookLogo key="f" />,
  <Mail key="m" size={36} className="text-[var(--primary-teal)]" strokeWidth={1.8} />,
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

      <div className="container mx-auto px-6 relative z-10">
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
              {t('h2Part2')}{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                {t('h2Em2')}
              </span>
              .
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-body)] leading-relaxed max-w-2xl mx-auto text-center">
              {t('lead')}
            </p>
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[var(--text-muted)] font-display uppercase tracking-widest mt-12"
        >
          {t('footnote')}
        </motion.p>
      </div>
    </section>
  );
};
