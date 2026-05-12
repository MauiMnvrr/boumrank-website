'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';

type Visual = 'wheel' | 'actions' | 'probabilities' | 'coupon';

type Step = {
  number: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  kpiValue: string;
  kpiLabel: string;
  accent: string;
  accentSoft: string;
  visual: Visual;
};

const ACCENTS = [
  { accent: '#1B6FC2', accentSoft: 'rgba(27, 111, 194, 0.12)', visual: 'wheel' as Visual },
  { accent: '#1E9DAA', accentSoft: 'rgba(30, 157, 170, 0.12)', visual: 'actions' as Visual },
  { accent: '#2EAE6D', accentSoft: 'rgba(46, 174, 109, 0.12)', visual: 'probabilities' as Visual },
  { accent: '#F28C28', accentSoft: 'rgba(242, 140, 40, 0.12)', visual: 'coupon' as Visual },
];

/* ---------- Visuals ---------- */

const WheelVisual = ({ accent }: { accent: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-20 h-20 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-full h-full rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
        style={{
          background:
            'conic-gradient(from 0deg, #1B6FC2 0% 16%, #1E9DAA 16% 33%, #2EAE6D 33% 50%, #F28C28 50% 66%, #1B6FC2 66% 83%, #2EAE6D 83% 100%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: hovered ? 1.6 : 8, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[34%] rounded-full bg-[var(--bg-surface)] shadow flex items-center justify-center">
        <div className="w-2 h-2 rounded-full" style={{ background: accent }} />
      </div>
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: `9px solid ${accent}`,
        }}
      />
    </div>
  );
};

const ActionsVisual = () => {
  const items = [
    { letter: 'G', color: '#4285F4' },
    { letter: 'IG', color: '#E1306C' },
    { letter: 'f', color: '#1877F2' },
    { letter: 'TT', color: '#111111' },
  ];
  return (
    <div className="flex items-center justify-center gap-1.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="w-9 h-9 rounded-full text-white font-display font-extrabold flex items-center justify-center text-[11px] shadow-[0_6px_14px_rgba(0,0,0,0.2)]"
          style={{ background: item.color }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
        >
          {item.letter}
        </motion.div>
      ))}
    </div>
  );
};

const ProbabilitiesVisual = ({ accent }: { accent: string }) => {
  const bars = [
    { label: 'Café', pct: 50 },
    { label: '−10 %', pct: 30 },
    { label: 'Menu', pct: 15 },
    { label: 'Jackpot', pct: 5 },
  ];
  return (
    <div className="w-full flex flex-col gap-1.5">
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-12 text-[9px] text-[var(--text-secondary)] truncate">{bar.label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${accent}, ${accent}99)` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
            />
          </div>
          <span className="w-7 text-right font-data font-bold text-[9px] text-[var(--text-primary)]">
            {bar.pct}%
          </span>
        </div>
      ))}
    </div>
  );
};

const CouponVisual = ({ accent, label, value, validity }: { accent: string; label: string; value: string; validity: string }) => (
  <div className="flex items-center justify-center">
    <motion.div
      className="relative bg-[var(--bg-surface)] rounded-lg px-4 py-2 border-2"
      style={{ borderColor: accent, color: accent }}
      animate={{
        boxShadow: [
          '0 6px 18px rgba(242,140,40,0.18)',
          '0 6px 28px rgba(242,140,40,0.45)',
          '0 6px 18px rgba(242,140,40,0.18)',
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--bg-elevated)]"
        style={{ border: `2px solid ${accent}`, borderLeft: 'none' }}
      />
      <div
        className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--bg-elevated)]"
        style={{ border: `2px solid ${accent}`, borderRight: 'none' }}
      />
      <div className="text-center">
        <div className="text-[7px] uppercase tracking-widest font-display font-extrabold opacity-70">
          {label}
        </div>
        <div className="font-display font-extrabold text-xl leading-none mt-0.5">{value}</div>
        <div
          className="border-t border-dashed mt-1 pt-0.5 text-[7px] font-medium opacity-80"
          style={{ borderColor: accent }}
        >
          {validity}
        </div>
      </div>
    </motion.div>
  </div>
);

const VisualByKey = ({
  which,
  accent,
  couponLabel,
  couponValue,
  couponValidity,
}: {
  which: Visual;
  accent: string;
  couponLabel: string;
  couponValue: string;
  couponValidity: string;
}) => {
  switch (which) {
    case 'wheel':
      return <WheelVisual accent={accent} />;
    case 'actions':
      return <ActionsVisual />;
    case 'probabilities':
      return <ProbabilitiesVisual accent={accent} />;
    case 'coupon':
      return <CouponVisual accent={accent} label={couponLabel} value={couponValue} validity={couponValidity} />;
  }
};

/* ---------- Step Node ---------- */

type StepNodeProps = {
  step: Step;
  index: number;
  position: 'top' | 'bottom';
  couponLabel: string;
  couponValue: string;
  couponValidity: string;
  stepPrefix: string;
};

const StepNode = ({ step, index, position, couponLabel, couponValue, couponValidity, stepPrefix }: StepNodeProps) => {
  const isTop = position === 'top';
  return (
    <motion.div
      initial={{ opacity: 0, y: isTop ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      className={`relative flex flex-col ${isTop ? 'lg:justify-end' : 'lg:justify-start'} items-center text-center`}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="relative rounded-2xl p-5 w-full max-w-[280px] group"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(70% 60% at 50% 0%, ${step.accentSoft} 0%, transparent 70%)`,
          }}
        />

        <div className="relative flex items-center justify-center mb-3">
          <div
            className="font-display font-extrabold uppercase tracking-widest text-[9px] px-2.5 py-1 rounded-full"
            style={{
              color: step.accent,
              background: step.accentSoft,
              border: `1px solid ${step.accent}33`,
            }}
          >
            {stepPrefix} {step.number} · {step.label}
          </div>
        </div>

        <div className="relative h-20 flex items-center justify-center mb-4">
          <VisualByKey
            which={step.visual}
            accent={step.accent}
            couponLabel={couponLabel}
            couponValue={couponValue}
            couponValidity={couponValidity}
          />
        </div>

        <h3 className="relative font-display font-bold text-base leading-tight mb-2 text-[var(--text-primary)]">
          {step.title}
        </h3>

        <p className="relative text-[13px] text-[var(--text-body)] leading-relaxed mb-3">
          {step.body}
        </p>

        <div
          className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: step.accentSoft,
            border: `1px solid ${step.accent}33`,
          }}
        >
          <Sparkles size={11} style={{ color: step.accent }} />
          <span className="font-data font-extrabold text-[13px] leading-none" style={{ color: step.accent }}>
            {step.kpiValue}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] leading-none">{step.kpiLabel}</span>
        </div>
      </motion.div>

      <div className="hidden lg:flex flex-col items-center">
        <div
          className={`w-px h-6 ${isTop ? 'order-2' : 'order-1'}`}
          style={{ background: `linear-gradient(${isTop ? '180deg' : '0deg'}, ${step.accent}, transparent)` }}
        />
        <div
          className={`w-3 h-3 rounded-full ${isTop ? 'order-3' : 'order-2'}`}
          style={{
            background: step.accent,
            boxShadow: `0 0 0 4px ${step.accentSoft}, 0 0 18px ${step.accent}66`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ---------- Main section ---------- */

export const Section2Mecanique = () => {
  const t = useTranslations('features.section2');
  const rawSteps = t.raw('steps') as Array<{
    number: string;
    label: string;
    title: string;
    body: string;
    bullets: string[];
    kpiValue: string;
    kpiLabel: string;
  }>;

  const steps: Step[] = rawSteps.map((s, i) => ({
    ...s,
    ...ACCENTS[i],
  }));

  const couponLabel = t('couponLabel');
  const couponValue = t('couponValue');
  const couponValidity = t('couponValidity');
  const stepPrefix = t('stepPrefix');

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(30,157,170,0.18) 0%, rgba(46,174,109,0.10) 40%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5 text-[var(--text-primary)]">
            {t('title')}{' '}
            <span className="text-gradient">{t('titleGradient')}</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            {t('subtitle')}{' '}
            <span className="text-[var(--text-primary)] font-semibold">{t('subtitleHighlight')}</span>{' '}
            {t('subtitleSuffix')}
          </p>
        </motion.div>

        {/* DESKTOP */}
        <div className="hidden lg:block relative max-w-[1180px] mx-auto">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1180 480"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1B6FC2" />
                <stop offset="33%" stopColor="#1E9DAA" />
                <stop offset="66%" stopColor="#2EAE6D" />
                <stop offset="100%" stopColor="#F28C28" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 60 240 C 180 80, 320 80, 440 240 S 740 400, 880 240 S 1120 80, 1180 240"
              fill="none"
              stroke="url(#flowGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </svg>

          <div className="relative grid grid-cols-4 gap-6 min-h-[480px]">
            {steps.map((step, i) => {
              const isTop = i % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex ${isTop ? 'items-start pt-0 pb-24' : 'items-end pt-24 pb-0'} justify-center`}
                >
                  <StepNode
                    step={step}
                    index={i}
                    position={isTop ? 'top' : 'bottom'}
                    couponLabel={couponLabel}
                    couponValue={couponValue}
                    couponValidity={couponValidity}
                    stepPrefix={stepPrefix}
                  />
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display font-bold text-sm text-white shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 40%, #2EAE6D 100%)',
                boxShadow: '0 10px 30px rgba(46,174,109,0.35)',
              }}
            >
              {t('resultPill')}
              <ArrowRight size={16} />
            </div>
          </motion.div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden relative max-w-md mx-auto">
          <div
            aria-hidden
            className="absolute left-4 top-0 bottom-0 w-[2px] rounded-full"
            style={{
              background:
                'linear-gradient(180deg, #1B6FC2 0%, #1E9DAA 33%, #2EAE6D 66%, #F28C28 100%)',
              opacity: 0.4,
            }}
          />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-12"
              >
                <div
                  className="absolute left-[10px] top-5 w-3 h-3 rounded-full"
                  style={{
                    background: step.accent,
                    boxShadow: `0 0 0 4px ${step.accentSoft}`,
                  }}
                />

                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'var(--glass-blur)',
                    WebkitBackdropFilter: 'var(--glass-blur)',
                    border: '1px solid var(--glass-border)',
                    borderLeft: `3px solid ${step.accent}`,
                    boxShadow: 'var(--glass-shadow)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="font-display font-extrabold uppercase tracking-widest text-[10px] px-2.5 py-1 rounded-full"
                      style={{
                        color: step.accent,
                        background: step.accentSoft,
                        border: `1px solid ${step.accent}33`,
                      }}
                    >
                      {stepPrefix} {step.number} · {step.label}
                    </div>
                  </div>

                  <div className="h-20 flex items-center justify-center mb-3">
                    <VisualByKey
                      which={step.visual}
                      accent={step.accent}
                      couponLabel={couponLabel}
                      couponValue={couponValue}
                      couponValidity={couponValidity}
                    />
                  </div>

                  <h3 className="font-display font-bold text-base leading-tight mb-2 text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-body)] leading-relaxed mb-3">
                    {step.body}
                  </p>

                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: step.accentSoft,
                      border: `1px solid ${step.accent}33`,
                    }}
                  >
                    <Sparkles size={11} style={{ color: step.accent }} />
                    <span className="font-data font-extrabold text-[13px] leading-none" style={{ color: step.accent }}>
                      {step.kpiValue}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] leading-none">
                      {step.kpiLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
