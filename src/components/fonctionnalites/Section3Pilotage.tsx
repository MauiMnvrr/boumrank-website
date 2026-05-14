'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  Coins,
  Trophy,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';

const STAT_ICONS = [
  <TrendingUp key="trend" size={16} />,
  <Coins key="coins" size={16} />,
  <Trophy key="trophy" size={16} />,
];
const STAT_COLORS = ['#1B6FC2', '#2EAE6D', '#F28C28'];

const ADVANTAGE_ICONS = [
  <Star key="star" size={24} />,
  <Coins key="coins" size={24} />,
  <Zap key="zap" size={24} />,
];
const ADVANTAGE_GRADIENTS = [
  'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
  'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
  'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
];
const ADVANTAGE_ACCENTS = ['#1B6FC2', '#2EAE6D', '#F28C28'];

export const Section3Pilotage = () => {
  const t = useTranslations('features.section3');
  const stats = t.raw('stats') as Array<{ label: string; value: string; delta: string; deltaLabel: string }>;
  const advantages = t.raw('advantages') as Array<{ badge: string; title: string; body: string }>;

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute top-12 left-4 md:left-12 font-display font-extrabold text-[20rem] md:text-[28rem] leading-none opacity-[0.04] select-none pointer-events-none text-[var(--primary-green)]">
        3
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(46,174,109,0.06),transparent_60%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {t('title')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#2EAE6D_0%,#F28C28_100%)]">
              {t('titleGradient')}
            </span>{' '}
            {t('titleSuffix')}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            {t('subtitle')}{' '}
            <span className="text-[var(--text-primary)] font-semibold">{t('subtitleHighlight')}</span>{' '}
            {t('subtitleSuffix')}
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
            <div className="absolute -inset-8 bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] blur-3xl opacity-20" />
            <Card
              variant="elevated"
              padding="lg"
              className="relative bg-[var(--bg-surface)] border-2 border-[var(--border-default)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-default)] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E74C3C]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F39C12]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27AE60]" />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-display font-bold text-[var(--text-muted)]">
                  {t('dashboardLabel')}
                </div>
                <div className="text-xs text-[var(--text-muted)] font-data">{t('dashboardRange')}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 bg-[var(--bg-primary)] border border-[var(--border-default)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[var(--text-muted)]">
                        {stat.label}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: `${STAT_COLORS[i]}15`, color: STAT_COLORS[i] }}
                      >
                        {STAT_ICONS[i]}
                      </div>
                    </div>
                    <div className="font-data font-bold text-2xl md:text-3xl text-[var(--text-primary)] mb-1">
                      {stat.value}
                    </div>
                    <div
                      className="text-xs font-semibold inline-flex items-center gap-1"
                      style={{ color: STAT_COLORS[i] }}
                    >
                      <TrendingUp size={12} /> {stat.delta} {stat.deltaLabel}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-5 bg-[var(--bg-primary)] border border-[var(--border-default)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-display font-bold text-[var(--text-muted)]">
                      {t('googleRatingLabel')}
                    </div>
                    <div className="font-data font-bold text-lg text-[var(--text-primary)]">
                      {t('googleRatingValue')}{' '}
                      <span className="text-[var(--primary-green)] text-sm font-semibold">
                        {t('googleRatingDelta')}
                      </span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
            {t('description')}{' '}
            <span className="font-semibold text-[var(--text-primary)]">{t('descriptionHighlight1')}</span>
            {', '}
            <span className="font-semibold text-[var(--primary-green)]">{t('descriptionHighlight2')}</span>
            {', '}
            {t('descriptionSuffix')}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight">
              {t('advantagesTitle')}{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_50%,#F28C28_100%)]">
                {t('advantagesTitleGradient')}
              </span>{' '}
              {t('advantagesTitleSuffix')}
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
                  style={{ borderTop: `4px solid ${ADVANTAGE_ACCENTS[i]}` }}
                >
                  <div
                    className="absolute -top-4 -right-4 font-display font-extrabold text-[8rem] leading-none opacity-[0.06] select-none pointer-events-none"
                    style={{ color: ADVANTAGE_ACCENTS[i] }}
                  >
                    0{i + 1}
                  </div>

                  <div className="relative z-10">
                    <div
                      className="inline-flex w-14 h-14 rounded-2xl items-center justify-center text-white mb-5 shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                      style={{ background: ADVANTAGE_GRADIENTS[i] }}
                    >
                      {ADVANTAGE_ICONS[i]}
                    </div>

                    <div
                      className="text-[10px] uppercase tracking-widest font-display font-extrabold mb-2"
                      style={{ color: ADVANTAGE_ACCENTS[i] }}
                    >
                      {a.badge}
                    </div>

                    <h4 className="font-display font-bold text-lg md:text-xl text-[var(--text-primary)] mb-3 leading-tight">
                      {a.title}
                    </h4>

                    <p className="text-sm md:text-base text-[var(--text-body)] leading-relaxed">
                      {a.body}
                    </p>
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
