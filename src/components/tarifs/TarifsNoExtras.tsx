'use client';

import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

const noExtras = [
  'Zéro frais de setup',
  'Zéro frais par coupon émis',
  'Zéro frais par avis Google généré',
  'Zéro frais de résiliation',
  'Zéro engagement de durée',
];

export const TarifsNoExtras = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <Eyebrow variant="subtle" size="md" className="mb-5">
              Transparence tarifaire
            </Eyebrow>
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
              Ce qu&apos;on ne facture{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#2EAE6D_100%)]">
                jamais en plus
              </span>
              .
            </h2>
            <p className="text-lg text-[var(--text-secondary)] italic">
              Parce que les frais cachés, c&apos;est la spécialité des autres.
            </p>
          </div>

          <Card variant="gradient" padding="lg">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {noExtras.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-3 border border-[var(--border-default)]"
                >
                  <XCircle size={22} className="flex-shrink-0 text-[var(--primary-green)]" />
                  <span className="font-display font-semibold text-sm text-[var(--text-primary)]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
