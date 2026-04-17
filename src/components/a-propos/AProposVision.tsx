'use client';

import { motion } from 'framer-motion';
import { Rocket, Network } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const AProposVision = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(124,92,252,0.08),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,174,109,0.1),transparent_70%)] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="gradient" size="md" className="mb-5">
            <Rocket size={14} />
            La vision 2030
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            Demain, BoumRank fera parler{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#7C5CFC_0%,#1B6FC2_50%,#2EAE6D_100%)]">
              tous les commerces du quartier
            </span>{' '}
            entre eux.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] italic">
            La marketplace cross-promo : notre horizon.
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
                Aujourd&apos;hui, chaque commerçant BoumRank gère son propre jeu, ses propres lots, ses
                propres clients. C&apos;est déjà un game-changer.{' '}
                <span className="font-semibold text-[var(--text-primary)]">Mais on vise plus grand.</span>
              </p>

              <div className="my-6 pl-5 border-l-4 border-[var(--primary-blue)] py-2 bg-[var(--bg-elevated)]/50 rounded-r-xl">
                <p className="text-[var(--text-primary)] font-display font-semibold">
                  Imaginez 2027 : votre client joue chez vous, gagne un café offert. La semaine
                  suivante, le caviste d&apos;à côté met son propre lot sur votre Roue, et envoie ses
                  clients chez vous via son jeu à lui.
                </p>
                <p className="text-[var(--text-body)] mt-3">
                  Vous devenez{' '}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] font-bold">
                    partenaires de croissance
                  </span>{' '}
                  plutôt que concurrents silencieux. Le quartier tout entier devient une boucle
                  gamifiée de clients qui circulent, découvrent, reviennent.
                </p>
              </div>

              <p>
                En 2030, BoumRank aura tissé la{' '}
                <span className="font-semibold text-[var(--text-primary)]">
                  plus grande marketplace cross-promo entre commerces locaux de France
                </span>
                . Des quartiers entiers connectés. Des milliers de commerçants qui ne perdent plus
                leurs clients au profit d&apos;Uber Eats ou d&apos;Amazon — mais les échangent entre eux.
              </p>

              <p>
                C&apos;est pour ça qu&apos;on se lève le matin. Et c&apos;est pour ça qu&apos;on vous veut à bord
                dès maintenant :{' '}
                <span className="font-semibold text-[var(--primary-green)]">
                  les premiers clients BoumRank auront la place de choix dans la marketplace de
                  demain.
                </span>
              </p>
            </div>

            {/* Network visualization */}
            <div className="mt-8 pt-6 border-t border-[var(--border-default)] flex items-center justify-center gap-3 md:gap-5 flex-wrap">
              {[
                '🍔 Restaurant',
                '🍷 Caviste',
                '💇 Salon',
                '🛍️ Boutique',
                '☕ Café',
              ].map((label, i, arr) => (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <div className="px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] font-display font-semibold text-xs md:text-sm text-[var(--text-primary)]">
                    {label}
                  </div>
                  {i < arr.length - 1 && (
                    <Network size={14} className="text-[var(--primary-blue)]" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
