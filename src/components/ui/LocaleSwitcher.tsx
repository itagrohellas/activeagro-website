'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * LocaleSwitcher — εναλλαγή μεταξύ ελληνικών και αγγλικών.
 * Διατηρεί την ίδια σελίδα/path όταν αλλάζει το locale.
 *
 * Χρησιμοποιεί useTransition για loading state αν το switching πάρει χρόνο.
 */
export function LocaleSwitcher({ variant = 'dark', className }: LocaleSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === currentLocale || isPending) return;
    startTransition(() => {
      // @ts-expect-error -- pathname και params είναι σωστά αλλά το TS δεν τα συνδέει
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border p-0.5 backdrop-blur-md transition',
        variant === 'dark'
          ? 'border-brand-green/15 bg-white/60'
          : 'border-brand-cream/20 bg-white/10',
        isPending && 'opacity-60',
        className,
      )}
      role="group"
      aria-label="Επιλογή γλώσσας / Language selector"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => handleSwitch(locale)}
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={`Switch to ${locale === 'el' ? 'Ελληνικά' : 'English'}`}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition',
              isActive
                ? variant === 'dark'
                  ? 'bg-brand-green text-brand-cream shadow-sm'
                  : 'bg-brand-cream text-brand-green shadow-sm'
                : variant === 'dark'
                  ? 'text-brand-green/60 hover:text-brand-green'
                  : 'text-brand-cream/60 hover:text-brand-cream',
            )}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
