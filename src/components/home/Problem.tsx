'use client';

import { motion } from 'framer-motion';
import { MessageSquareOff, Store, ThumbsDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';

const ICONS = [
  { icon: <MessageSquareOff size={24} />, emoji: '😩' },
  { icon: <Store size={24} />, emoji: '😤' },
  { icon: <ThumbsDown size={24} />, emoji: '😡' },
];

export const Problem = () => {
  const t = useTranslations('home.problem');
  const items = t.raw('items') as { title: string; body: string }[];

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(242,140,40,0.04),transparent_60%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {t('h2Part1')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)]">
              {t('h2Highlight')}
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {t('lead')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card variant="glass" padding="lg" className="h-full flex flex-col group cursor-default">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,rgba(242,140,40,0.1)_0%,rgba(232,67,147,0.1)_100%)] border border-[rgba(242,140,40,0.2)] flex items-center justify-center text-[var(--secondary-orange)] group-hover:scale-110 transition-transform">
                    {ICONS[i].icon}
                  </div>
                  <span className="text-4xl group-hover:scale-110 transition-transform">{ICONS[i].emoji}</span>
                </div>

                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] leading-tight mb-3">
                  {f.title}
                </h3>

                <p className="text-[var(--text-body)] leading-relaxed text-base">
                  {f.body}
                </p>

                <div className="mt-auto pt-6">
                  <div className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#F28C28_0%,#E84393_100%)] opacity-60 group-hover:w-20 transition-all duration-300" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-display font-semibold">
            {t('outroPart1')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] font-bold">
              {t('outroHighlight')}
            </span>{' '}
            {t('outroPart2')} 👇
          </p>
        </motion.div>
      </div>
    </section>
  );
};
