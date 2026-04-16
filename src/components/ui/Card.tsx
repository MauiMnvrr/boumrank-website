'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * BoumRank Card — design system 2026
 *
 * Variants:
 * - `glass` (default)  → glassmorphism (rgba white + backdrop-blur 16px)
 * - `solid`            → bg-surface, border, soft shadow
 * - `elevated`         → bg-elevated, large shadow, hover lift
 * - `outline`          → transparent, border-default
 * - `gradient`         → fond brand gradient subtil, idéal pour CTAs
 *
 * Padding : sm · md (default) · lg · xl
 */
const cardVariants = cva(
  'rounded-2xl transition-all duration-300',
  {
    variants: {
      variant: {
        glass: [
          'bg-[var(--glass-bg)]',
          'backdrop-blur-[16px]',
          'border border-[var(--glass-border)]',
          'shadow-[var(--glass-shadow)]',
          'hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-0.5',
        ].join(' '),
        solid: [
          'bg-[var(--bg-surface)]',
          'border border-[var(--border-default)]',
          'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
          'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[var(--border-highlight)]',
        ].join(' '),
        elevated: [
          'bg-[var(--bg-elevated)]',
          'shadow-[0_12px_36px_rgba(0,0,0,0.1)]',
          'hover:shadow-[0_20px_48px_rgba(0,0,0,0.15)] hover:-translate-y-1',
        ].join(' '),
        outline: [
          'bg-transparent',
          'border border-[var(--border-default)]',
          'hover:border-[var(--border-highlight)] hover:bg-[var(--bg-surface)]/50',
        ].join(' '),
        gradient: [
          'bg-[linear-gradient(135deg,rgba(27,111,194,0.08)_0%,rgba(46,174,109,0.08)_100%)]',
          'border border-[var(--border-highlight)]',
          'hover:bg-[linear-gradient(135deg,rgba(27,111,194,0.12)_0%,rgba(46,174,109,0.12)_100%)]',
        ].join(' '),
      },
      padding: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
    },
    defaultVariants: {
      variant: 'glass',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-2 mb-4', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display font-bold text-xl text-[var(--text-primary)] leading-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[var(--text-secondary)] leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-[var(--text-body)]', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-3 mt-6 pt-4 border-t border-[var(--border-default)]', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { cardVariants };
