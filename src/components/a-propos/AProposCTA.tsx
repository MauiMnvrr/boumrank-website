'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { trackEvent } from '@/lib/events';

export function AProposCTA() {
  const t = useTranslations('about.cta');
  const { openModal } = useOnboarding();

  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[var(--border-default)] bg-[var(--bg-elevated)] p-10 text-center md:p-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(27,111,194,0.25), rgba(30,157,170,0.15) 40%, transparent 75%)',
            }}
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-body)] md:text-xl">
              {t('subtitle')}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button variant="gradient" size="lg">
                  {t('contact')}
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                data-cta="signup"
                data-cta-location="apropos-cta"
                onClick={() => {
                  trackEvent('signup_click', { cta_location: 'apropos-cta' });
                  openModal();
                }}
              >
                {t('trial')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
