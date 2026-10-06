'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Users, MousePointerClick, FlaskConical, ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

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

// Chiffres mesurés dans le mémoire Kedge de Maui (pilote de Marseille, janvier à août 2026,
// différence de différences face à 10 restaurants voisins) : environ +12 avis par mois et par
// restaurant pendant l'utilisation, environ 4 avis de plus pour 10 clics sur le bouton avis.
// Remplace l'ancien simulateur (clients/jour ÷ 5 × 24), qui affichait 288 avis pour 60 clients/jour.
const MEASURED_EXTRA_REVIEWS_PER_MONTH = 12;

export const RoiCalculator = () => {
  const { openModal } = useOnboarding();
  const t = useTranslations('home.roi');
  const locale = useLocale();

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
            <Card variant="solid" padding="lg" className="h-full flex flex-col gap-5">
              <h3 className="flex items-center gap-2 font-display font-bold text-xl text-[var(--text-primary)]">
                <span className="text-[var(--primary-blue)]"><FlaskConical size={20} /></span>
                {t('methodTitle')}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {t('methodBody')}
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed italic pt-4 mt-auto border-t border-[var(--border-default)]">
                {t('methodNote')}
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
                    +<AnimatedCounter value={MEASURED_EXTRA_REVIEWS_PER_MONTH} format={(n) => String(Math.round(n))} />
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
                    <MousePointerClick size={18} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                    {t('clicksLabel')}
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                  {t('clicksValue')}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {t('clicksCaption')}
                </p>
              </Card>

              <Card variant="solid" padding="md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#2EAE6D_0%,#1E8A52_100%)] flex items-center justify-center text-white">
                    <Users size={18} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                    {t('panelLabel')}
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                  {t('panelValue')}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {t('panelCaption')}
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
