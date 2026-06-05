'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Gamepad2, Palette, BarChart3, QrCode, Zap, MessageCircle, Check } from 'lucide-react';

const ICONS = [
  <Gamepad2 key="gamepad" size={20} />,
  <Palette key="palette" size={20} />,
  <BarChart3 key="bar" size={20} />,
  <QrCode key="qr" size={20} />,
  <Zap key="zap" size={20} />,
  <MessageCircle key="msg" size={20} />,
];

export const TarifsFeaturesCentral = () => {
  const t = useTranslations('pricing.features');
  const items = t.raw('items') as Array<{ title: string; body: string }>;
  const promises = t.raw('promises') as string[];

  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-10">
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
                {t('title1')}{' '}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
                  {t('title2')}
                </span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  tabIndex={0}
                  className="group flex gap-3 items-start rounded-xl outline-none cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(46,174,109,0.1)] text-[var(--primary-green)] flex items-center justify-center">
                    {ICONS[i]}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[var(--text-primary)] text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--text-body)] leading-snug max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-28 group-hover:opacity-100 group-hover:mt-1 group-focus-within:max-h-28 group-focus-within:opacity-100 group-focus-within:mt-1">
                      {feature.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--border-default)] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-[var(--text-muted)]">
              {promises.map((promise, i) => (
                <span key={promise} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-[var(--text-muted)]">·</span>}
                  <Check size={14} className="text-[var(--primary-green)]" />
                  <span className="font-display font-semibold">{promise}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
