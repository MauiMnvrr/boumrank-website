'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp, Euro, ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { cn } from '@/lib/utils';

function AnimatedCounter({
  value,
  suffix = '',
  format,
}: {
  value: number;
  suffix?: string;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const from = prevValue.current;
    const to = value;
    const duration = 500;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
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
  const t = useTranslations('home.roi');
  const locale = useLocale();
  const [customersPerDay, setCustomersPerDay] = useState(60);
  const [avgTicket, setAvgTicket] = useState(18);

  const formatLocale = t('currencyLocale');
  const currency = t('currencyCode');

  const formatEUR = (n: number) =>
    new Intl.NumberFormat(formatLocale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Math.max(0, Math.round(n)));

  const formatInt = (n: number) =>
    new Intl.NumberFormat(formatLocale).format(Math.max(0, Math.round(n)));

  const { newReviewsPerMonth, returningCustomers, extraRevenue } = useMemo(() => {
    const reviews = (customersPerDay / 5) * 24;
    const returners = reviews / 10;
    const revenue = returners * avgTicket;

    return {
      newReviewsPerMonth: Math.round(reviews),
      returningCustomers: Math.round(returners),
      extraRevenue: revenue,
    };
  }, [customersPerDay, avgTicket]);

  return (
    <section
      id="calculateur"
      className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,174,109,0.08),transparent_70%)] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(27,111,194,0.08),transparent_70%)] -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {t('h2Part1')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              {t('h2Highlight')}
            </span>{' '}
            {t('h2Part2')}
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-6 md:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="solid" padding="lg" className="h-full flex flex-col gap-7">
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                {t('yourStore')}
              </h3>

              <SliderInput
                label={t('customersLabel')}
                value={customersPerDay}
                setValue={setCustomersPerDay}
                min={5}
                max={300}
                step={5}
                suffix={t('customersSuffix')}
                accent="#1B6FC2"
                icon={<Users size={18} />}
              />

              <SliderInput
                label={t('ticketLabel')}
                value={avgTicket}
                setValue={setAvgTicket}
                min={5}
                max={150}
                step={1}
                suffix={t('ticketSuffix')}
                accent="#1E9DAA"
                icon={<Euro size={18} />}
              />

              <p className="text-xs text-[var(--text-muted)] leading-relaxed italic pt-2 border-t border-[var(--border-default)]">
                {t('disclaimer')}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <Card variant="gradient" padding="lg" className="relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-2">
                    {t('newReviewsLabel')}
                  </div>
                  <div className="font-display font-extrabold text-5xl md:text-6xl text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] leading-none mb-2">
                    +<AnimatedCounter value={newReviewsPerMonth} format={formatInt} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {t('newReviewsCaption')}
                  </p>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/70 backdrop-blur-sm border border-[var(--border-highlight)] flex items-center justify-center text-[var(--primary-blue)]">
                  <Star size={24} />
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="solid" padding="md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#1E9DAA_0%,#177A85_100%)] flex items-center justify-center text-white">
                    <Users size={18} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                    {t('returnsLabel')}
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                  <AnimatedCounter value={returningCustomers} format={formatInt} />
                  <span className="text-sm font-semibold text-[var(--text-muted)]">{t('returnsPerMonth')}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {t('returnsCaption')}
                </p>
              </Card>

              <Card variant="solid" padding="md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#2EAE6D_0%,#1E8A52_100%)] flex items-center justify-center text-white">
                    <TrendingUp size={18} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                    {t('revenueLabel')}
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                  <AnimatedCounter value={extraRevenue} format={formatEUR} />
                  <span className="text-sm font-semibold text-[var(--text-muted)]">{t('returnsPerMonth')}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {t('revenueCaption')}
                </p>
              </Card>
            </div>

            <Button
              onClick={openModal}
              variant="gradient"
              size="lg"
              className="w-full mt-2"
              key={locale}
            >
              {t('cta')}
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

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

      <div className="relative h-11 flex items-center touch-none">
        <div className="absolute left-0 right-0 h-2 bg-[var(--bg-elevated)] rounded-full top-1/2 -translate-y-1/2" />
        <div
          className={cn('absolute left-0 h-2 rounded-full transition-none top-1/2 -translate-y-1/2')}
          style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${accent}DD, ${accent})` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ touchAction: 'none' }}
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] pointer-events-none transition-none"
          style={{ left: `calc(${percent}% - 12px)`, borderColor: accent }}
        />
      </div>
    </div>
  );
}
