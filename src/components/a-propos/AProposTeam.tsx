'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AProposTeam() {
  return (
    <section className="bg-[var(--bg-elevated)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-5 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <div className="relative mx-auto max-w-sm md:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-2 rounded-3xl opacity-40 blur-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 40%, #2EAE6D 100%)',
                }}
              />
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/founders/liam-maui.jpg"
                  alt="Liam et Maui, co-fondateurs de BoumRank, assis côte à côte"
                  width={1200}
                  height={1500}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-xs text-[var(--text-secondary)] md:text-left">
                Liam (à gauche) et Maui, co-fondateurs de BoumRank.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-3"
          >
            <h2 className="font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
              On a trouvé <span className="text-gradient">une pépite</span>.
            </h2>

            <blockquote className="mt-8 border-l-4 border-[var(--primary-teal)] pl-6">
              <p className="font-display text-xl italic leading-relaxed text-[var(--text-primary)] md:text-2xl">
                «&nbsp;On a regardé nos proches, nos amis commerçants, galérer
                chaque jour pour faire connaître leur passion. On savait
                qu&apos;il existait une meilleure façon. On l&apos;a cherchée.
                On l&apos;a trouvée.&nbsp;»
              </p>
              <footer className="mt-4 text-sm font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                Liam &amp; Maui, co-fondateurs de BoumRank
              </footer>
            </blockquote>

            <p className="mt-8 text-base leading-relaxed text-[var(--text-body)] md:text-lg">
              On a d&apos;abord testé chez nos proches, la mère de Liam, le
              frère de Maui, avant de le proposer à qui que ce soit
              d&apos;autre. Parce qu&apos;on n&apos;avait pas le droit de leur
              faire perdre du temps. Aujourd&apos;hui, ça marche. Et on veut le
              proposer à tous les commerçants qui méritent qu&apos;on
              s&apos;occupe d&apos;eux.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
