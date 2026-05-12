'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { QrCode, Sparkles, Megaphone } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const ICONS = [QrCode, Sparkles, Megaphone];

export const Section1Menu = () => {
  const t = useTranslations('features.section1');
  const benefits = t.raw('benefits') as Array<{ title: string; body: string }>;
  const menuItems = t.raw('menuItems') as Array<{ label: string; price: string }>;

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 font-display font-extrabold text-[20rem] md:text-[28rem] leading-none opacity-[0.04] select-none pointer-events-none text-[var(--primary-blue)]">
        1
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(27,111,194,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {t('title')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_100%)]">
              {t('titleGradient')}
            </span>{' '}
            {t('titleSuffix')}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            {t('subtitle')}{' '}
            <span className="text-[var(--text-primary)] font-semibold">{t('subtitleHighlight')}</span>
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] blur-3xl opacity-30 scale-90" />
              <div className="relative w-[280px] md:w-[320px] aspect-[9/19] rounded-[3rem] bg-[var(--text-primary)] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-[var(--text-primary)] rounded-b-2xl z-20" />
                <div className="relative w-full h-full rounded-[2.3rem] bg-[var(--bg-primary)] overflow-hidden flex flex-col">
                  <div className="pt-9 px-5 pb-3 flex justify-between items-center text-[10px] text-[var(--text-primary)] font-semibold">
                    <span>9:41</span>
                    <span>•••</span>
                  </div>
                  <div className="px-5 pb-3 border-b border-[var(--border-default)]">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                      {t('menuRestaurantName')}
                    </div>
                    <div className="font-display font-extrabold text-base text-[var(--text-primary)]">
                      {t('menuTitle')}
                    </div>
                  </div>
                  <div className="flex-1 px-5 py-4 space-y-3 overflow-hidden">
                    {menuItems.map((item) => (
                      <div key={item.label} className="flex justify-between items-center text-xs">
                        <span className="text-[var(--text-primary)]">{item.label}</span>
                        <span className="font-data font-semibold text-[var(--text-secondary)]">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-5">
            {benefits.map((b, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card variant="solid" padding="lg" className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[linear-gradient(135deg,rgba(27,111,194,0.12)_0%,rgba(46,174,109,0.12)_100%)] flex items-center justify-center text-[var(--primary-blue)]">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base md:text-lg text-[var(--text-primary)] mb-2 leading-tight">
                        {b.title}
                      </h3>
                      <p className="text-sm md:text-base text-[var(--text-body)] leading-relaxed">
                        {b.body}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
