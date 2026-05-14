import type { Variants, Transition } from 'framer-motion';

/**
 * Centralized motion language for BoumRank.
 * All components should pull variants from here instead of redefining inline.
 * Easings mirror the CSS custom properties in globals.css.
 */

export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  inOutCirc: [0.85, 0, 0.15, 1] as const,
};

export const SPRING = {
  soft:  { type: 'spring' as const, stiffness: 140, damping: 22 },
  snappy:{ type: 'spring' as const, stiffness: 280, damping: 18 },
  bouncy:{ type: 'spring' as const, stiffness: 320, damping: 14, mass: 0.6 },
};

/* ---------- Basic entry variants ---------- */

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EASE.outExpo },
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE.outExpo } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE.outExpo } },
};

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE.outExpo } },
};

/* ---------- Reveal / mask variants ---------- */

export const revealMask: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.9, ease: EASE.outQuint } },
};

export const verticalCut: Variants = {
  hidden:  { y: '110%' },
  visible: (i: number = 0) => ({
    y: 0,
    transition: { ...SPRING.snappy, delay: i * 0.05 },
  }),
};

/* ---------- Stagger container ---------- */

export const staggerParent = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerChild = fadeUp;

/* ---------- Float / breathing loops ---------- */

export const floatY = (amplitude = 8, duration = 6): Variants => ({
  visible: {
    y: [0, -amplitude, 0],
    transition: { duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

/* ---------- Card hover (3D tilt baseline) ---------- */

export const cardHover = {
  rest:  { y: 0, scale: 1, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' },
  hover: {
    y: -6,
    scale: 1.015,
    boxShadow: '0 18px 40px rgba(27,111,194,0.18), 0 8px 20px rgba(46,174,109,0.12)',
    transition: { duration: 0.4, ease: EASE.outExpo },
  },
};

/* ---------- Default transition for whileInView usage ---------- */

export const inViewOnce = { once: true, amount: 0.25 } as const;

/* ---------- Helpers ---------- */

export function withDelay(transition: Transition, delay: number): Transition {
  return { ...transition, delay };
}
