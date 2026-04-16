'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, MessageCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HOME_FAQS } from '@/data/home-faqs';
import { cn } from '@/lib/utils';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden"
    >
      {/* Background decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(27,111,194,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            FAQ · {HOME_FAQS.length} questions
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Les {HOME_FAQS.length} questions qu&apos;on nous pose{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              avant de se lancer
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Si vous pensez à autre chose,{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              on répond en moins de 2 h en chat.
            </span>
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {HOME_FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                className={cn(
                  'rounded-2xl border transition-colors overflow-hidden',
                  isOpen
                    ? 'bg-[var(--bg-surface)] border-[var(--border-highlight)] shadow-[0_8px_24px_rgba(27,111,194,0.08)]'
                    : 'bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--border-highlight)]'
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-5 text-left group"
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
                        : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] group-hover:bg-[var(--border-highlight)]'
                    )}
                  >
                    <Plus size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 pt-0 pl-14 md:pl-16">
                        <p className="text-[var(--text-body)] leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom : contact prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)]">
            <div className="w-9 h-9 rounded-full bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] flex items-center justify-center text-white">
              <MessageCircle size={16} />
            </div>
            <span className="text-sm text-[var(--text-body)]">
              Autre question ?{' '}
              <Link
                href="/contact"
                className="font-semibold text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors underline underline-offset-2 decoration-[var(--primary-blue)]/30 hover:decoration-[var(--primary-blue)]"
              >
                Écrivez-nous
              </Link>{' '}
              — on répond en moins de 2 h.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
