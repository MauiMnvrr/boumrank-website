'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const FLAGS: Record<string, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};

const LABELS: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
};

type LanguageToggleProps = {
  variant?: 'compact' | 'full';
  className?: string;
};

export const LanguageToggle = ({
  variant = 'compact',
  className,
}: LanguageToggleProps) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('common');

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale || isPending) return;
    startTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace(pathname as any, { locale: nextLocale });
    });
  };

  return (
    <div
      role="group"
      aria-label={t('switchLanguage')}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] p-0.5 transition-colors',
        variant === 'full' && 'w-full justify-center gap-2 p-1',
        className,
      )}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchLocale(loc)}
            aria-pressed={isActive}
            aria-label={`${t('switchLanguage')}: ${LABELS[loc]}`}
            disabled={isPending}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full font-display font-bold uppercase tracking-wider transition-all',
              variant === 'compact'
                ? 'px-2.5 py-1 text-[11px]'
                : 'flex-1 px-4 py-2 text-sm',
              isActive
                ? 'bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_40%,#2EAE6D_100%)] text-white shadow-[0_4px_12px_rgba(27,111,194,0.25)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]',
              isPending && 'pointer-events-none opacity-70',
            )}
          >
            <span aria-hidden className="text-base leading-none">
              {FLAGS[loc]}
            </span>
            <span>{LABELS[loc]}</span>
          </button>
        );
      })}
    </div>
  );
};
