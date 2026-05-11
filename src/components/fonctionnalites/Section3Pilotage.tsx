'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Coins,
  Trophy,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

type Advantage = {
  icon: React.ReactNode;
  badge: string;
  title: string;
  body: string;
  highlight: string;
  gradient: string;
  accent: string;
};

const advantages: Advantage[] = [
  {
    icon: <Star size={24} />,
    badge: 'Le menu intégré',
    title: 'Le menu, qui fait la différence',
    body: 'Nous sommes les seuls à inclure votre menu digitalisé sans surcoût. C\'est pour nous, c\'est cadeau, et ça nous fait vraiment plaisir',
    highlight: '+47% d\'avis déposés vs solutions standalone',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
    accent: '#1B6FC2',
  },
  {
    icon: <Coins size={24} />,
    badge: 'L\'auto-financement',
    title: 'La seule solution qui s\'auto-finance',
    body: 'Fixez un minimum d\'achat. Le client revient, consomme et la solution s\'auto-finance. Max d\'avis, aucune sortie !',
    highlight: 'Panier moyen +32% sur les retours coupon',
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
    accent: '#2EAE6D',
  },
  {
    icon: <Zap size={24} />,
    badge: 'Setup 2 minutes',
    title: 'Plus de scans, plus de fans',
    body: 'Fini le QR code isolé de nos concurrents. Notre intégration fait jouer 1 client sur 3 au lieu de 1 sur 5. Résultat : plus de joueurs, plus d\'avis.',
    highlight: '0 ligne de code · 0 app · 0 formation',
    gradient: 'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
    accent: '#F28C28',
  },
];

export const Section3Pilotage = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      {/* Big "3" decorative number */}
      <div className="absolute top-12 left-4 md:left-12 font-display font-extrabold text-[20rem] md:text-[28rem] leading-none opacity-[0.04] select-none pointer-events-none text-[var(--primary-green)]">
        3
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(46,174,109,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Un dashboard.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#2EAE6D_0%,#F28C28_100%)]">
              Trois avantages
            </span>{' '}
            que personne ne vous offre.
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Toutes vos métriques en temps réel,{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              et la vision claire de votre ROI
            </span>{' '}
            — sans Excel, sans agence.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-8 bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] blur-3xl opacity-20" />

            <Card
              variant="elevated"
              padding="lg"
              className="relative bg-[var(--bg-surface)] border-2 border-[var(--border-default)]"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-default)] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E74C3C]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F39C12]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27AE60]" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-display font-bold text-[var(--text-muted)]">
                  Dashboard · Cette semaine
                </div>
                <div className="text-xs text-[var(--text-muted)] font-data">12/05 — 18/05</div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: 'Actions cette semaine',
                    value: '342',
                    delta: '+18%',
                    icon: <TrendingUp size={16} />,
                    color: '#1B6FC2',
                  },
                  {
                    label: 'Cashback généré',
                    value: '1 247 €',
                    delta: '+32%',
                    icon: <Coins size={16} />,
                    color: '#2EAE6D',
                  },
                  {
                    label: 'Coupons utilisés',
                    value: '89',
                    delta: '+12%',
                    icon: <Trophy size={16} />,
                    color: '#F28C28',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-4 bg-[var(--bg-primary)] border border-[var(--border-default)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[var(--text-muted)]">
                        {stat.label}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          background: `${stat.color}15`,
                          color: stat.color,
                        }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div className="font-data font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-1">
                      {stat.value}
                    </div>
                    <div
                      className="text-xs font-semibold inline-flex items-center gap-1"
                      style={{ color: stat.color }}
                    >
                      <TrendingUp size={12} /> {stat.delta} vs semaine dernière
                    </div>
                  </div>
                ))}
              </div>

              {/* Bar chart mock */}
              <div className="rounded-xl p-5 bg-[var(--bg-primary)] border border-[var(--border-default)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-display font-bold text-[var(--text-muted)]">
                      Note Google
                    </div>
                    <div className="font-data font-bold text-lg text-[var(--text-primary)]">
                      4,7 ★ <span className="text-[var(--primary-green)] text-sm font-semibold">+0,3 ce mois</span>
                    </div>
                  </div>
                  <LayoutDashboard size={18} className="text-[var(--text-muted)]" />
                </div>
                <div className="flex items-end justify-between gap-1 md:gap-2 h-20">
                  {[35, 48, 42, 58, 52, 67, 78, 72, 81, 89, 92, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.04 }}
                      className="flex-1 rounded-t-md bg-[linear-gradient(180deg,#2EAE6D_0%,#1E9DAA_100%)] opacity-90"
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
            Vous voyez en temps réel{' '}
            <span className="font-semibold text-[var(--text-primary)]">
              les actions de la semaine
            </span>
            , le{' '}
            <span className="font-semibold text-[var(--primary-green)]">
              cashback rapporté par chaque coupon utilisé
            </span>
            , et l&apos;évolution de votre note Google. Tout exportable.
            Tout horodaté. Tout à vous.
          </p>
        </motion.div>

        {/* 3 competitive advantages */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight">
              Trois choses que{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_50%,#F28C28_100%)]">
                personne d&apos;autre
              </span>{' '}
              ne fait.
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  variant="solid"
                  padding="lg"
                  className="h-full relative overflow-hidden"
                  style={{ borderTop: `4px solid ${a.accent}` }}
                >
                  {/* Big badge number */}
                  <div
                    className="absolute -top-4 -right-4 font-display font-extrabold text-[8rem] leading-none opacity-[0.06] select-none pointer-events-none"
                    style={{ color: a.accent }}
                  >
                    0{i + 1}
                  </div>

                  <div className="relative z-10">
                    <div
                      className="inline-flex w-14 h-14 rounded-2xl items-center justify-center text-white mb-5 shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                      style={{ background: a.gradient }}
                    >
                      {a.icon}
                    </div>

                    <div
                      className="text-[10px] uppercase tracking-widest font-display font-extrabold mb-2"
                      style={{ color: a.accent }}
                    >
                      {a.badge}
                    </div>

                    <h4 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)] mb-3 leading-tight">
                      {a.title}
                    </h4>

                    <p className="text-sm md:text-base text-[var(--text-body)] leading-relaxed mb-5">
                      {a.body}
                    </p>

                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-display font-bold"
                      style={{
                        background: `${a.accent}12`,
                        border: `1px solid ${a.accent}30`,
                        color: a.accent,
                      }}
                    >
                      <TrendingUp size={12} />
                      {a.highlight}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
