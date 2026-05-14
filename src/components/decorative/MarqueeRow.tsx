'use client';

import { type ReactNode, Children } from 'react';
import { cn } from '@/lib/utils';

type MarqueeRowProps = {
  children: ReactNode;
  /** Animation duration in seconds. Lower = faster. Default 40s. */
  duration?: number;
  /** Direction. Default left. */
  direction?: 'left' | 'right';
  /** Gap between items (Tailwind unit). Default 'gap-8'. */
  gap?: string;
  /** Pause animation on hover. Default true. */
  pauseOnHover?: boolean;
  /** Add edge fade mask. Default true. */
  fade?: boolean;
  className?: string;
};

/**
 * CSS-only infinite marquee — no JS, no measure hooks.
 * Children are duplicated once (aria-hidden) to create the seamless loop.
 * Animation pauses on hover via the .marquee-paused parent class.
 *
 * Why CSS over Framer's animate(): a CSS @keyframes loop is GPU-composited,
 * doesn't allocate per-frame, and respects prefers-reduced-motion automatically
 * (rules in globals.css).
 */
export function MarqueeRow({
  children,
  duration = 40,
  direction = 'left',
  gap = 'gap-8',
  pauseOnHover = true,
  fade = true,
  className,
}: MarqueeRowProps) {
  const items = Children.toArray(children);
  const animationClass = direction === 'right' ? 'animate-marquee-rev' : 'animate-marquee';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        fade && 'marquee-fade',
        pauseOnHover && 'marquee-paused',
        className
      )}
    >
      <div
        className={cn('flex w-max items-center', gap, animationClass)}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {items.map((child, i) => (
          <div key={`b-${i}`} aria-hidden="true" className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeRow;
