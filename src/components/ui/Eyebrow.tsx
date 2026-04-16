'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * BoumRank Eyebrow — petit badge au-dessus d'un titre/section
 *
 * Variants:
 * - `gradient`  → bg gradient brand, texte blanc
 * - `orange` (default) → bg orange secondary, texte blanc — accent gamification
 * - `subtle`   → bg subtle, texte primary, bordure highlight
 * - `glass`    → glassmorphism léger
 * - `dot`      → minimal, juste un dot animé + texte
 *
 * Sizes : sm · md (default) · lg
 */
const eyebrowVariants = cva(
  [
    'inline-flex items-center gap-2',
    'font-display font-bold uppercase tracking-widest',
    'rounded-full whitespace-nowrap',
    'transition-all duration-200',
  ].join(' '),
  {
    variants: {
      variant: {
        gradient: [
          'text-white',
          'bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_40%,#2EAE6D_100%)]',
          'shadow-[0_4px_12px_rgba(27,111,194,0.3)]',
        ].join(' '),
        orange: [
          'text-white',
          'bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)]',
          'shadow-[0_4px_12px_rgba(242,140,40,0.3)]',
        ].join(' '),
        subtle: [
          'bg-[var(--bg-surface)] text-[var(--primary-blue)]',
          'border border-[var(--border-highlight)]',
          'shadow-[0_2px_8px_rgba(27,111,194,0.08)]',
        ].join(' '),
        glass: [
          'bg-[var(--glass-bg)]',
          'backdrop-blur-md',
          'border border-[var(--glass-border)]',
          'text-[var(--primary-blue)]',
        ].join(' '),
        dot: [
          'bg-transparent text-[var(--primary-blue)]',
          'px-3',
        ].join(' '),
      },
      size: {
        sm: 'h-6 px-3 text-[10px]',
        md: 'h-8 px-4 text-xs',
        lg: 'h-10 px-5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'orange',
      size: 'md',
    },
  }
);

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof eyebrowVariants> {
  /** Affiche un dot animé avant le texte (pulse) */
  withDot?: boolean;
  /** Couleur du dot (défaut: blanc pour gradient/orange, blue sinon) */
  dotColor?: string;
}

export const Eyebrow = React.forwardRef<HTMLDivElement, EyebrowProps>(
  (
    { className, variant, size, withDot = false, dotColor, children, ...props },
    ref
  ) => {
    const defaultDotColor =
      variant === 'gradient' || variant === 'orange'
        ? 'bg-white'
        : 'bg-[var(--primary-blue)]';

    return (
      <div
        ref={ref}
        className={cn(eyebrowVariants({ variant, size }), className)}
        {...props}
      >
        {(withDot || variant === 'dot') && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full animate-pulse',
              dotColor || defaultDotColor
            )}
          />
        )}
        {children}
      </div>
    );
  }
);
Eyebrow.displayName = 'Eyebrow';

export { eyebrowVariants };
