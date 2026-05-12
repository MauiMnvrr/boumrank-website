'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Calendar, Zap, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

export const FinalCTA = () => {
  const { openModal } = useOnboarding();
  const t = useTranslations('home.finalCta');
  const tCommon = useTranslations('common');
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--bg-primary)]"
    >
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,111,194,0.06)_0%,rgba(46,174,109,0.08)_50%,rgba(242,140,40,0.06)_100%)]"
      />

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(124,92,252,0.12),transparent_70%)] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(46,174,109,0.12),transparent_70%)] translate-x-1/2 translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]">
            {t('h2Part1')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
              {t('h2Highlight')}
            </span>{' '}
            {t('h2Part2')}
          </h2>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
            <span className="text-[var(--text-primary)] font-semibold">{t('subPart1')}</span> {t('subPart2')}{' '}
            <span className="text-[var(--text-primary)] font-semibold">{t('subPart3')}</span> {t('subPart4')}{' '}
            <span className="text-[var(--text-primary)] font-semibold">{t('subPart5')}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button onClick={openModal} variant="gradient" size="xl">
              <Rocket size={20} />
              {tCommon('startTrial')}
            </Button>
            <Link href="/contact">
              <Button variant="outline" size="xl" type="button">
                <Calendar size={20} />
                {tCommon('bookDemo')}
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--text-body)]"
          >
            <TrustBadge icon={<Zap size={14} />} label={t('badges.setup')} />
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] hidden sm:block" />
            <TrustBadge icon={<Check size={14} />} label={t('badges.noCard')} />
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] hidden sm:block" />
            <TrustBadge icon={<Check size={14} />} label={t('badges.noCommit')} />
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] hidden sm:block" />
            <TrustBadge icon={<Check size={14} />} label={t('badges.support')} />
            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)] hidden sm:block" />
            <TrustBadge icon={<Check size={14} />} label={t('badges.rgpd')} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-xs text-[var(--text-muted)] font-display font-semibold uppercase tracking-widest"
          >
            {t('signature')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 font-display font-semibold text-sm text-[var(--text-body)]">
      <span className="text-[var(--primary-green)]">{icon}</span>
      {label}
    </div>
  );
}
