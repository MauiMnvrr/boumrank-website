'use client';

import { motion } from 'framer-motion';
import { MessageSquareWarning, EyeOff, Clock4 } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: MessageSquareWarning,
    title: "Demander un avis, c'est gênant.",
    body: "On hésite à le faire en personne, par peur de paraître insistant.",
  },
  {
    icon: EyeOff,
    title: "Le SEO local, c'est opaque.",
    body: "Trop d'outils, trop de jargon, jamais le temps de s'y mettre vraiment.",
  },
  {
    icon: Clock4,
    title: "Le marketing, c'est chronophage.",
    body: "Chaque heure passée à automatiser, c'est une heure de moins avec vos clients.",
  },
];

export function AProposStory() {
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
          Vous êtes commerçant, pas community manager.
        </motion.h2>

        <div className="mt-10 space-y-6 text-lg text-[var(--text-body)] md:text-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Vous ouvrez à 7h. Vous fermez à 22h. Entre les deux, vous cuisinez,
            vous coupez, vous coiffez, vous accueillez. Vous donnez tout ce que
            vous avez à votre métier. Le référencement Google, les avis clients,
            les relances, les programmes de fidélité, vous savez que c&apos;est
            important. Mais vous n&apos;avez ni le temps, ni l&apos;envie, ni
            l&apos;énergie de devenir spécialiste en marketing digital.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-medium text-[var(--text-primary)]"
          >
            Pendant ce temps, vos concurrents qui maîtrisent ces outils prennent
            votre place sur Google.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PAIN_POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
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
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {point.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
