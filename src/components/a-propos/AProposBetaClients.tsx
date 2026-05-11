'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    headline: 'Des centaines',
    unit: "d'avis Google par mois",
    body: 'Génération automatique, sans relance, sans gêne.',
  },
  {
    headline: "Jusqu'à 1 client sur 3",
    unit: 'qui revient',
    body: 'Le mini-jeu rapproche, la récompense fait revenir.',
  },
];

export function AProposBetaClients() {
  return (
    <section className="bg-[var(--bg-elevated)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl"
        >
          Des résultats concrets,{' '}
          <span className="text-gradient">pas des promesses en l&apos;air</span>.
        </motion.h2>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.headline}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-10 text-center shadow-sm"
            >
              <p className="font-data text-4xl font-bold leading-tight text-gradient md:text-5xl">
                {stat.headline}
              </p>
              <p className="mt-2 font-display text-lg font-medium text-[var(--text-primary)]">
                {stat.unit}
              </p>
              <p className="mt-4 text-sm text-[var(--text-secondary)]">
                {stat.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-12 max-w-2xl text-center text-sm text-[var(--text-secondary)]"
        >
          Testé d&apos;abord chez nos proches. Étendu aujourd&apos;hui à des
          restaurants, salons, boutiques, instituts.
        </motion.p>
      </div>
    </section>
  );
}
