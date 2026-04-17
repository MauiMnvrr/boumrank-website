'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const AProposStory = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            <Lightbulb size={14} />
            Notre histoire
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            De Feednback à BoumRank :{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              le pivot qui a tout changé
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] italic">
            Marseille, mars 2026. L&apos;instant où l&apos;évidence nous a sauté à la gueule.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card variant="glass" padding="xl">
            <div className="space-y-5 text-[var(--text-body)] leading-relaxed">
              <p>
                Au départ, on s&apos;appelait <span className="font-semibold text-[var(--text-primary)]">Feednback</span>.
                On aidait les commerçants à collecter des retours clients via un formulaire stylé.
                On a lancé, on a signé quelques clients, on a écouté. Et le retour était toujours le
                même :
              </p>

              <blockquote className="pl-5 border-l-4 border-[var(--primary-blue)] italic text-[var(--text-primary)] font-medium text-lg">
                « C&apos;est cool votre truc, mais ce que je veux vraiment, c&apos;est plus d&apos;avis Google
                — et mes clients s&apos;en foutent de remplir un formulaire. »
              </blockquote>

              <p>
                On a compris qu&apos;on s&apos;y prenait à l&apos;envers.{' '}
                <span className="font-semibold text-[var(--text-primary)]">
                  Personne ne veut remplir un formulaire. Tout le monde veut jouer.
                </span>{' '}
                En mars 2026, on a pivoté à 180 degrés : exit le formulaire, place au jackpot.
                BoumRank était né.
              </p>

              <p>
                Basés à Marseille, entourés par l&apos;écosystème de Pépite Aix-Marseille Université,
                on a rebuild le produit en 6 semaines avec une obsession : rendre le marketing local
                aussi fun qu&apos;une partie de casino, aussi simple qu&apos;un QR code collé sur la table.
              </p>
            </div>

            {/* Timeline visual */}
            <div className="mt-8 pt-6 border-t border-[var(--border-default)]">
              <div className="flex items-center gap-3 text-sm font-display font-bold uppercase tracking-widest">
                <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-muted)]">
                  Feednback
                </div>
                <ArrowRight size={16} className="text-[var(--primary-blue)]" />
                <div className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] text-white shadow-[0_4px_12px_rgba(27,111,194,0.3)]">
                  BoumRank
                </div>
                <div className="text-xs text-[var(--text-muted)] ml-auto">Mars 2026</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
