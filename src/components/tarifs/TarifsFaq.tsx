'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TARIFS_FAQS } from '@/data/tarifs-faqs';
import { cn } from '@/lib/utils';

export const TarifsFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(27,111,194,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            FAQ tarifs
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            Les 5 questions{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              avant de sortir la CB
            </span>
            .
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {TARIFS_FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={cn(
                  'rounded-2xl border transition-colors overflow-hidden',
                  isOpen
                    ? 'bg-[var(--bg-surface)] border-[var(--border-highlight)] shadow-[0_8px_24px_rgba(27,111,194,0.08)]'
                    : 'bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--border-highlight)]'
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 font-display font-bold text-base md:text-lg text-[var(--text-primary)] leading-snug">
                    <span className="text-[var(--text-muted)] mr-2 font-mono text-sm">
                      Q{(i + 1).toString().padStart(2, '0')}.
                    </span>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors',
                      isOpen
                        ? 'bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] text-white'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                    )}
                  >
                    <Plus size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 pl-14 md:pl-16">
                        <p className="text-[var(--text-body)] leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
