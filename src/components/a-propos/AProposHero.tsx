'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function AProposHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(27,111,194,0.18), rgba(30,157,170,0.12) 35%, rgba(46,174,109,0.08) 65%, transparent 80%)',
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center md:py-40">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl"
        >
          Deux amis, une obsession :{' '}
          <span className="text-gradient">
            que les commerçants restent concentrés sur leur passion.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl"
        >
          BoumRank est né d&apos;un constat simple. Voici notre histoire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            y: { duration: 2, delay: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="mt-16 text-[var(--text-secondary)]"
          aria-hidden
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </div>
    </section>
  );
}
