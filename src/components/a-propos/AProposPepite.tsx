'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { QrCode, Dices, Gift } from 'lucide-react';

const ICONS = [QrCode, Dices, Gift];

export function AProposPepite() {
  const t = useTranslations('about.pepite');
  const steps = t.raw('steps') as Array<{ n: string; title: string; body: string }>;

  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
            {t('title')}{' '}
            <span className="text-gradient">{t('titleGradient')}</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--text-body)] md:text-xl">{t('subtitle')}</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 shadow-sm"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{
                    background: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 40%, #2EAE6D 100%)',
                  }}
                />
                <div className="flex items-start justify-between">
                  <span className="font-data text-5xl font-bold text-gradient">{step.n}</span>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-elevated)] text-[var(--primary-blue)]">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[var(--text-secondary)]">{step.body}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl text-center text-lg italic text-[var(--text-body)]"
        >
          {t('aside')}
        </motion.p>
      </div>
    </section>
  );
}
