'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageSquareWarning, EyeOff, Clock4 } from 'lucide-react';

const ICONS = [MessageSquareWarning, EyeOff, Clock4];

export function AProposStory() {
  const t = useTranslations('about.story');
  const painPoints = t.raw('painPoints') as Array<{ title: string; body: string }>;

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

        <div className="mt-10 space-y-6 text-lg text-[var(--text-body)] md:text-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('p1')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-medium text-[var(--text-primary)]"
          >
            {t('p2')}
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {painPoints.map((point, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--bg-elevated)] text-[var(--primary-blue)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{point.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
