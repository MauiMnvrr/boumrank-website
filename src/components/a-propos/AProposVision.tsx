'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function AProposVision() {
  const t = useTranslations('about.vision');

  return (
    <section className="bg-[var(--bg-elevated)] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-data text-sm font-bold uppercase tracking-widest text-gradient">
              {t('eyebrow')}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
              {t('title')}{' '}
              <span className="text-gradient">{t('titleGradient')}</span>
              {t('titleSuffix')}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[var(--text-body)]">{t('body')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <NetworkSVG />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NetworkSVG() {
  return (
    <svg viewBox="0 0 320 320" className="h-auto w-full max-w-sm" aria-hidden>
      <defs>
        <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B6FC2" />
          <stop offset="40%" stopColor="#1E9DAA" />
          <stop offset="100%" stopColor="#2EAE6D" />
        </linearGradient>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E9DAA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1E9DAA" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g stroke="url(#netGrad)" strokeWidth="2" fill="none" opacity="0.7">
        <line x1="80" y1="80" x2="240" y2="80" />
        <line x1="80" y1="80" x2="80" y2="240" />
        <line x1="240" y1="80" x2="240" y2="240" />
        <line x1="80" y1="240" x2="240" y2="240" />
        <line x1="80" y1="80" x2="240" y2="240" />
        <line x1="240" y1="80" x2="80" y2="240" />
      </g>

      {([[80, 80], [240, 80], [80, 240], [240, 240]] as [number, number][]).map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="32" fill="url(#nodeGrad)" />
          <circle cx={cx} cy={cy} r="14" fill="white" stroke="url(#netGrad)" strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
}
