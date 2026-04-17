'use client';

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const AProposMission = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(46,174,109,0.08),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="gradient" size="md" className="mb-5">
            <Target size={14} />
            Notre mission
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            Transformer le marketing local en jeu.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              Littéralement.
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] italic">
            Parce qu&apos;un commerce de quartier mérite des outils aussi puissants qu&apos;une chaîne
            internationale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card variant="glass" padding="xl">
            <div className="space-y-5 text-[var(--text-body)] leading-relaxed">
              <p>
                Pendant que les grandes enseignes dépensent des millions en agences de branding,{' '}
                <span className="font-semibold text-[var(--text-primary)]">
                  le restaurateur indépendant se retrouve avec Google My Business en onglet
                </span>
                , un compte Instagram qu&apos;il met à jour entre deux services, et une carte de fidélité
                en papier qu&apos;il distribue à perte. Le déséquilibre est injuste.
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">BoumRank, c&apos;est notre réponse</span>{' '}
                : un outil unique qui fait ce que les grandes enseignes paient à prix d&apos;or — des
                mécaniques de gamification sophistiquées, du branding 100% custom, des analytics de
                pro — mais accessible à{' '}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] font-extrabold">
                  65€/mois
                </span>
                , activable en 5 minutes, utilisable par quelqu&apos;un qui n&apos;a jamais ouvert une
                plateforme marketing de sa vie.
              </p>
              <p className="text-xl font-display font-bold text-[var(--text-primary)] text-center pt-3">
                On ne croit pas à la complexité.
                <br />
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)]">
                  On croit au jeu.
                </span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
