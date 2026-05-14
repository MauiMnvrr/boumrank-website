'use client';

import { cn } from '@/lib/utils';

type AuroraBackgroundProps = {
  variant?: 'light' | 'dark' | 'auto';
  intensity?: 'soft' | 'medium' | 'strong';
  className?: string;
  /** When true, contains the aurora inside the parent. Default true. */
  contain?: boolean;
};

/**
 * Animated aurora gradient background.
 * Three radial blobs drift over each other, with conic accents on light builds.
 * Pure CSS, GPU-friendly, no JS runtime.
 * Pause under prefers-reduced-motion (handled in globals.css).
 */
export function AuroraBackground({
  variant = 'auto',
  intensity = 'medium',
  className,
  contain = true,
}: AuroraBackgroundProps) {
  const opacity =
    intensity === 'soft' ? 'opacity-40' : intensity === 'strong' ? 'opacity-90' : 'opacity-60';

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        contain && 'overflow-hidden',
        className
      )}
    >
      {/* Soft base wash */}
      <div
        className={cn(
          'absolute inset-0',
          variant === 'dark' && 'bg-[radial-gradient(ellipse_at_top,_rgba(27,111,194,0.18),_transparent_55%)]',
          variant === 'light' && 'bg-[radial-gradient(ellipse_at_top,_rgba(27,111,194,0.10),_transparent_55%)]',
          variant === 'auto' && 'bg-[radial-gradient(ellipse_at_top,_rgba(27,111,194,0.12),_transparent_55%)]'
        )}
      />

      {/* Drifting blue blob */}
      <div
        className={cn(
          'absolute -top-32 -left-24 h-[55vmin] w-[55vmin] rounded-full blur-3xl animate-aurora',
          opacity
        )}
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(27,111,194,0.55), transparent 60%)',
          animationDelay: '0s',
        }}
      />

      {/* Drifting teal blob */}
      <div
        className={cn(
          'absolute top-1/3 -right-20 h-[60vmin] w-[60vmin] rounded-full blur-3xl animate-aurora',
          opacity
        )}
        style={{
          background:
            'radial-gradient(circle at 70% 40%, rgba(30,157,170,0.50), transparent 65%)',
          animationDelay: '-6s',
          animationDuration: '28s',
        }}
      />

      {/* Drifting green blob */}
      <div
        className={cn(
          'absolute -bottom-24 left-1/4 h-[50vmin] w-[50vmin] rounded-full blur-3xl animate-aurora',
          opacity
        )}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(46,174,109,0.45), transparent 65%)',
          animationDelay: '-12s',
          animationDuration: '32s',
        }}
      />

      {/* Top fade so headers stay readable */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />
      {/* Bottom fade for clean section transitions */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </div>
  );
}

export default AuroraBackground;
