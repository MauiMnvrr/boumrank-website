'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedCounterProps = {
  /** Final value to count up to. */
  to: number;
  /** Starting value (default 0). */
  from?: number;
  /** Animation duration in seconds (default 1.6). */
  duration?: number;
  /** Optional decimals to keep (default inferred from `to`). */
  decimals?: number;
  /** Prefix string ("€", "$", "+"). Rendered before the number. */
  prefix?: string;
  /** Suffix string ("%", " avis", "/mo"). Rendered after the number. */
  suffix?: string;
  /** Use locale thousand separators (default true, fr-FR). */
  separator?: boolean;
  /** Optional className applied to the wrapping span. */
  className?: string;
  /** Re-run animation each time the element re-enters the viewport (default false). */
  rerun?: boolean;
};

/**
 * Animated count-up. Triggers when the element enters the viewport.
 * Honours `prefers-reduced-motion` (jumps straight to the final value).
 */
export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.6,
  decimals,
  prefix = '',
  suffix = '',
  separator = true,
  className,
  rerun = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: !rerun, amount: 0.4 });
  const [value, setValue] = useState(from);

  const inferredDecimals =
    decimals ?? (Number.isInteger(to) && Number.isInteger(from) ? 0 : 1);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setValue(to);
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, to, from, duration]);

  const formatted = separator
    ? value.toLocaleString('fr-FR', {
        minimumFractionDigits: inferredDecimals,
        maximumFractionDigits: inferredDecimals,
      })
    : value.toFixed(inferredDecimals);

  return (
    <span ref={ref} className={cn('font-data tabular-nums', className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
