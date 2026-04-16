'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * BoumRank Button — design system 2026
 *
 * Variants:
 * - `gradient` (default) → fond gradient bleu→teal→vert, texte blanc, glow shadow
 * - `solid`              → fond ink primary, texte blanc
 * - `outline`            → bordure gradient, texte ink
 * - `ghost`              → transparent, texte ink, hover surface
 * - `subtle`             → bg subtle, texte ink
 *
 * Sizes : sm · md (default) · lg · xl
 */
const buttonVariants = cva(
  // base
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-display font-semibold uppercase tracking-wide',
    'rounded-full transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-blue)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        gradient: [
          'text-white',
          'bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_40%,#2EAE6D_100%)]',
          'shadow-[0_8px_24px_rgba(27,111,194,0.35)]',
          'hover:shadow-[0_12px_32px_rgba(27,111,194,0.5)] hover:scale-[1.03]',
          'active:scale-[0.98]',
        ].join(' '),
        solid: [
          'bg-[var(--text-primary)] text-white',
          'hover:bg-[var(--text-body)]',
          'active:scale-[0.98]',
        ].join(' '),
        outline: [
          'bg-transparent text-[var(--text-primary)]',
          'border-2 border-transparent',
          'bg-[linear-gradient(white,white),linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_40%,#2EAE6D_100%)]',
          'bg-clip-padding',
          '[background-clip:padding-box,border-box] [background-origin:padding-box,border-box]',
          'hover:bg-[var(--bg-elevated)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--text-primary)]',
          'hover:bg-[var(--bg-elevated)]',
        ].join(' '),
        subtle: [
          'bg-[var(--bg-surface)] text-[var(--text-primary)]',
          'border border-[var(--border-default)]',
          'hover:bg-[var(--bg-elevated)] hover:border-[var(--border-highlight)]',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-lg',
      },
    },
    defaultVariants: {
      variant: 'gradient',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { buttonVariants };
