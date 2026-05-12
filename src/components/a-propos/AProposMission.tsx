'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Heart, Zap, MapPin } from 'lucide-react';

const ICONS = [Heart, Zap, MapPin];

export function AProposMission() {
  const t = useTranslations('about.mission');
  const pillars = t.raw('pillars') as Array<{ title: string; body: string }>;

  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl"
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl font-display text-xl font-semibold leading-snug text-[var(--text-primary)] md:text-3xl"
        >
          {t('statement')}{' '}
          <span className="text-gradient">{t('statementGradient')}</span>
          {t('statementSuffix')}
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl bg-[var(--bg-elevated)] p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--primary-teal)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[var(--text-secondary)]">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
