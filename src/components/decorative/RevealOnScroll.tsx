'use client';

import { motion, type Variants } from 'framer-motion';
import { Children, isValidElement, type ReactNode } from 'react';
import { EASE, inViewOnce, staggerParent } from '@/lib/motion';
import { cn } from '@/lib/utils';

type RevealOnScrollProps = {
  children: ReactNode;
  /** "fade" = standard fade-up. "mask" = clip-path reveal. "split" = stagger each child. */
  mode?: 'fade' | 'mask' | 'split';
  delay?: number;
  stagger?: number;
  amount?: number;
  className?: string;
};

const fadeVariant: Variants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE.outExpo },
  },
};

const maskVariant: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE.outQuint },
  },
};

const splitChild: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE.outExpo } },
};

/**
 * Wrapper that runs a tasteful reveal on scroll-in, replacing the mechanical
 * inline `{opacity:0,y:30} → {opacity:1,y:0}` pattern duplicated across the codebase.
 *
 * - `mode="fade"` (default): single fade-up with subtle blur lift
 * - `mode="mask"`: left-to-right clip-path reveal (great for headlines)
 * - `mode="split"`: staggers every direct child individually
 */
export function RevealOnScroll({
  children,
  mode = 'fade',
  delay = 0,
  stagger = 0.08,
  amount,
  className,
}: RevealOnScrollProps) {
  if (mode === 'split') {
    return (
      <motion.div
        className={cn(className)}
        variants={staggerParent(stagger, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={amount !== undefined ? { once: true, amount } : inViewOnce}
      >
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) {
            return (
              <motion.span key={i} variants={splitChild}>
                {child}
              </motion.span>
            );
          }
          return (
            <motion.span key={i} variants={splitChild} style={{ display: 'inline-block' }}>
              {child}
            </motion.span>
          );
        })}
      </motion.div>
    );
  }

  const variant = mode === 'mask' ? maskVariant : fadeVariant;

  return (
    <motion.div
      className={cn(className)}
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={amount !== undefined ? { once: true, amount } : inViewOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default RevealOnScroll;
