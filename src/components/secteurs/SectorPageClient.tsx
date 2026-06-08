'use client';

import { motion } from 'framer-motion';
import { Rocket, Check, AlertTriangle, Lightbulb, Quote, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { track, trackMeta } from '@/lib/analytics';
import type { SectorData, SectorLocale } from '@/data/sectors';

type Props = {
  sector: SectorData;
  locale: string;
};

export function SectorPageClient({ sector, locale }: Props) {
  const { openModal } = useOnboarding();
  const isEn = locale === 'en';
  const d: SectorLocale = isEn ? sector.en : sector.fr;

  const handleCta = () => {
    track('signup_click', { cta_location: `sector-${sector.slug}` });
    trackMeta('Lead', { content_name: `signup_sector_${sector.slug}` });
    openModal();
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[var(--bg-primary)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${sector.accent}40, transparent 70%)`,
          }}
        />
        <div className="absolute top-[15%] right-[10%] text-[10rem] opacity-[0.06] pointer-events-none select-none">
          {sector.emoji}
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-display font-extrabold text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: sector.accent }}
            >
              BoumRank {isEn ? 'for' : 'pour'} {d.name}
            </p>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[var(--text-primary)] mb-6">
              {d.heroTitle}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: sector.gradient }}
              >
                {d.heroHighlight}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
              {d.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleCta} variant="gradient" size="lg">
                <Rocket size={18} />
                {isEn ? 'Start free trial' : 'Essayer gratuitement'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-[var(--border-default)] bg-[var(--bg-elevated)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {d.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className="font-display font-extrabold text-3xl md:text-4xl mb-1"
                  style={{ color: sector.accent }}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[var(--text-secondary)] font-display font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] md:text-xs text-[var(--text-muted)] text-center max-w-2xl mx-auto mt-6 leading-relaxed">
            {isEn
              ? 'Figures observed with our first businesses. Every shop is unique, these are an order of magnitude, not a promise.'
              : 'Chiffres observés chez nos premiers commerces. Chaque enseigne reste unique, ces estimations donnent un ordre d\'idée, pas une promesse.'}
          </p>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-[var(--text-primary)] mb-4">
              {d.problemTitle}
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {d.problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card variant="glass" padding="md" className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#F28C28] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[var(--text-body)] leading-relaxed">{problem}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution section */}
      <section className="py-20 md:py-28 bg-[var(--bg-elevated)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-[var(--text-primary)] mb-4">
              {d.solutionTitle}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {d.solutions.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ background: sector.gradient }}
                    >
                      <Lightbulb size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2">
                        {sol.title}
                      </h3>
                      <p className="text-sm text-[var(--text-body)] leading-relaxed">{sol.body}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="glass" padding="lg" className="text-center relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, ${sector.accent}, transparent 70%)`,
                }}
              />
              <Quote size={32} className="mx-auto mb-6 opacity-20" style={{ color: sector.accent }} />
              <blockquote className="text-lg md:text-xl text-[var(--text-primary)] font-display font-semibold italic leading-relaxed mb-6 relative z-10">
                &laquo; {d.testimonial.quote} &raquo;
              </blockquote>
              <div className="relative z-10">
                <p className="font-display font-bold text-sm text-[var(--text-primary)]">
                  {d.testimonial.author}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{d.testimonial.role}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-[var(--bg-elevated)] relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${sector.accent}15, transparent 70%)`,
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl text-[var(--text-primary)] mb-5">
              {d.ctaTitle}
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-8">
              {d.ctaSubtitle}
            </p>
            <Button onClick={handleCta} variant="gradient" size="lg">
              <Rocket size={18} />
              {isEn ? 'Start free trial' : 'Essayer gratuitement'}
            </Button>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-xs text-[var(--text-body)]">
              <span className="inline-flex items-center gap-1.5"><Zap size={12} className="text-[var(--primary-green)]" /> Setup 5 min</span>
              <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-[var(--primary-green)]" /> {isEn ? 'No credit card' : 'Sans carte bancaire'}</span>
              <span className="inline-flex items-center gap-1.5"><Check size={12} className="text-[var(--primary-green)]" /> {isEn ? 'Cancel anytime' : 'Sans engagement'}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
