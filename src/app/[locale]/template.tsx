'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Next.js route template — runs on every navigation under [locale].
 * Subtle fade + slide-up that respects prefers-reduced-motion (Framer Motion
 * automatically honours it when used with motion components).
 */
export default function LocaleTemplate({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
