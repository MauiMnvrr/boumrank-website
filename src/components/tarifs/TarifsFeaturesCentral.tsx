'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Palette, BarChart3, QrCode, Zap, MessageCircle, Check } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: <Gamepad2 size={20} />,
    title: 'Les 3 jeux débloqués',
    body: 'Roue, Slots, Blackjack, tous activables à volonté',
  },
  {
    icon: <Palette size={20} />,
    title: 'Branding 100% custom',
    body: '13 templates, palette illimitée, illustrations',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Dashboard Performance',
    body: 'Taux scan, conversion, retour caisse, temps moyen',
  },
  {
    icon: <QrCode size={20} />,
    title: 'QR codes illimités',
    body: '3 formats imprimables, swipe caissier illimité',
  },
  {
    icon: <Zap size={20} />,
    title: 'Campagnes séquentielles',
    body: 'Happy hour, week-end, anniversaire client',
  },
  {
    icon: <MessageCircle size={20} />,
    title: 'Support FR prioritaire',
    body: 'Réponse en chat sous 2h, hébergement RGPD en Europe',
  },
];

const PROMISES = [
  'Setup en 5 minutes',
  'Essai 14 jours sans CB',
  'Export CSV + Zapier',
  'Mises à jour à vie',
];

export const TarifsFeaturesCentral = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-10">
              <span className="inline-block font-display font-bold uppercase text-[10px] tracking-[0.15em] text-[var(--primary-blue)] bg-[rgba(27,111,194,0.08)] px-3 py-1.5 rounded-full mb-3">
                Ce que vous obtenez
              </span>
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
                Toutes les features.{' '}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
                  Tout le temps.
                </span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Peu importe l&apos;offre choisie, vous avez 100% du service. Pas de feature gating, pas d&apos;upsell caché.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-3 items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(46,174,109,0.1)] text-[var(--primary-green)] flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[var(--text-primary)] text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--text-body)] leading-snug">{feature.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--border-default)] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-[var(--text-muted)]">
              {PROMISES.map((promise, i) => (
                <span key={promise} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-[var(--text-muted)]">·</span>}
                  <Check size={14} className="text-[var(--primary-green)]" />
                  <span className="font-display font-semibold">{promise}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
