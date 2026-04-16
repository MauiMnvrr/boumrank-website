'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Star, Users, TrendingUp, Euro, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { cn } from '@/lib/utils';

// =====================================================
// Assumptions used in formulas (tunable)
// =====================================================
// These ratios are realistic baseline estimates — disclaimer shown in UI
// since we don't yet have enough beta data to publish hard numbers.

const ASSUMPTIONS = {
  /** % of customers who scan the QR code */
  scanRate: 0.35, // 35% default
  /** % of scanners who complete the marketing action (review / follow / etc.) */
  conversionToAction: 0.55, // 55%
  /** % of winners who actually come back to redeem the coupon */
  returnRate: 0.45, // 45%
  /** avg €/client uplift from a returning customer (compared to a 1-shot) */
  uplift: 1.25, // 25% uplift when they return
};

const formatEUR = (n: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

const formatInt = (n: number) =>
  new Intl.NumberFormat('fr-FR').format(Math.max(0, Math.round(n)));

/**
 * Animated counter that tweens from previous value to new value.
 */
function AnimatedCounter({ value, suffix = '', format = formatInt }: { value: number; suffix?: string; format?: (n: number) => string }) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const from = prevValue.current;
    const to = value;
    const duration = 500; // ms

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else prevValue.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return (
    <span>
      {format(display)}
      {suffix}
    </span>
  );
}

export const RoiCalculator = () => {
  const { openModal } = useOnboarding();
  const [customersPerDay, setCustomersPerDay] = useState(60);
  const [avgTicket, setAvgTicket] = useState(18);
  const [currentReviews, setCurrentReviews] = useState(24);

  // Computed outputs
  const {
    newReviewsPerMonth,
    returningCustomers,
    extraRevenue,
    monthsToReach100,
    // boumrankCost kept as a reference baseline (not displayed)
  } = useMemo(() => {
    const monthlyCustomers = customersPerDay * 30;
    const scanners = monthlyCustomers * ASSUMPTIONS.scanRate;
    const reviews = scanners * ASSUMPTIONS.conversionToAction;
    const returners = reviews * ASSUMPTIONS.returnRate;
    const revenue = returners * avgTicket * ASSUMPTIONS.uplift;

    const reviewsNeeded = Math.max(0, 100 - currentReviews);
    const months = reviews > 0 ? reviewsNeeded / reviews : 99;

    return {
      newReviewsPerMonth: Math.round(reviews),
      returningCustomers: Math.round(returners),
      extraRevenue: revenue,
      monthsToReach100: months,
    };
  }, [customersPerDay, avgTicket, currentReviews]);

  return (
    <section
      id="calculateur"
      className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,174,109,0.08),transparent_70%)] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(27,111,194,0.08),transparent_70%)] -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="gradient" size="md" className="mb-5">
            <Calculator size={14} />
            Calculateur ROI · Sans inscription
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Combien d&apos;avis Google{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              allez-vous débloquer
            </span>{' '}
            ce mois-ci ?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Bougez les curseurs.{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              Les chiffres parlent mieux qu&apos;un pitch.
            </span>
          </p>
        </motion.div>

        {/* Calculator grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[5fr_7fr] gap-8 items-stretch">
          {/* LEFT : Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="solid" padding="lg" className="h-full flex flex-col gap-7">
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                Votre commerce en 3 chiffres
              </h3>

              <SliderInput
                label="Clients par jour"
                value={customersPerDay}
                setValue={setCustomersPerDay}
                min={5}
                max={300}
                step={5}
                suffix=" clients/jour"
                accent="#1B6FC2"
                icon={<Users size={18} />}
              />

              <SliderInput
                label="Ticket moyen"
                value={avgTicket}
                setValue={setAvgTicket}
                min={5}
                max={150}
                step={1}
                suffix=" €"
                accent="#1E9DAA"
                icon={<Euro size={18} />}
              />

              <SliderInput
                label="Avis Google actuels"
                value={currentReviews}
                setValue={setCurrentReviews}
                min={0}
                max={500}
                step={1}
                suffix=" avis"
                accent="#2EAE6D"
                icon={<Star size={18} />}
              />

              <p className="text-xs text-[var(--text-muted)] leading-relaxed italic pt-2 border-t border-[var(--border-default)]">
                Estimations basées sur des ratios observés chez nos clients beta : 35 % de taux de scan, 55 % de taux de conversion en avis, 45 % de retour en boutique. Chaque commerce est différent — ces chiffres sont des ordres de grandeur.
              </p>
            </Card>
          </motion.div>

          {/* RIGHT : Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Big metric : new reviews */}
            <Card variant="gradient" padding="lg" className="relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-2">
                    Nouveaux avis Google / mois
                  </div>
                  <div className="font-display font-extrabold text-5xl md:text-6xl text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] leading-none mb-2">
                    +<AnimatedCounter value={newReviewsPerMonth} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    De quoi passer de{' '}
                    <span className="font-semibold text-[var(--text-primary)]">{currentReviews}</span>{' '}
                    à{' '}
                    <span className="font-semibold text-[var(--text-primary)]">
                      {currentReviews + newReviewsPerMonth}
                    </span>{' '}
                    avis dès le premier mois.
                  </p>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/70 backdrop-blur-sm border border-[var(--border-highlight)] flex items-center justify-center text-[var(--primary-blue)]">
                  <Star size={24} />
                </div>
              </div>
            </Card>

            {/* Two smaller metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="solid" padding="md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#1E9DAA_0%,#177A85_100%)] flex items-center justify-center text-white">
                    <Users size={18} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                    Retours en boutique
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                  <AnimatedCounter value={returningCustomers} />
                  <span className="text-sm font-semibold text-[var(--text-muted)]"> / mois</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Clients qui reviennent encaisser leur coupon
                </p>
              </Card>

              <Card variant="solid" padding="md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#2EAE6D_0%,#1E8A52_100%)] flex items-center justify-center text-white">
                    <TrendingUp size={18} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                    CA additionnel
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                  <AnimatedCounter value={extraRevenue} format={formatEUR} />
                  <span className="text-sm font-semibold text-[var(--text-muted)]"> / mois</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Chiffre d&apos;affaires lié au retour client
                </p>
              </Card>
            </div>

            {/* Time-to-100 estimator */}
            {currentReviews < 100 && newReviewsPerMonth > 0 && (
              <Card variant="outline" padding="md" className="bg-white/40 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-1">
                      Temps pour atteindre 100 avis
                    </div>
                    <div className="font-display font-bold text-lg text-[var(--text-primary)]">
                      {monthsToReach100 < 1
                        ? 'Moins d\'un mois'
                        : monthsToReach100 < 2
                          ? `Environ ${monthsToReach100.toFixed(1)} mois`
                          : `Environ ${Math.ceil(monthsToReach100)} mois`}
                    </div>
                  </div>
                  <div className="text-2xl">🎯</div>
                </div>
              </Card>
            )}

            {/* CTA */}
            <Button onClick={openModal} variant="gradient" size="lg" className="w-full mt-2">
              Débloquer ces avis avec BoumRank
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// =====================================================
// SliderInput sub-component
// =====================================================

type SliderInputProps = {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  accent: string;
  icon: React.ReactNode;
};

function SliderInput({ label, value, setValue, min, max, step, suffix = '', accent, icon }: SliderInputProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 text-sm font-display font-bold text-[var(--text-primary)]">
          <span style={{ color: accent }}>{icon}</span>
          {label}
        </label>
        <span
          className="font-display font-extrabold text-lg"
          style={{ color: accent }}
        >
          {value}
          {suffix}
        </span>
      </div>

      <div className="relative h-2">
        {/* Track background */}
        <div className="absolute inset-0 bg-[var(--bg-elevated)] rounded-full" />
        {/* Progress fill */}
        <div
          className={cn('absolute left-0 top-0 h-full rounded-full transition-none')}
          style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${accent}DD, ${accent})` }}
        />
        {/* Native input range (transparent, on top) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] pointer-events-none transition-none"
          style={{ left: `calc(${percent}% - 10px)`, borderColor: accent }}
        />
      </div>
    </div>
  );
}
