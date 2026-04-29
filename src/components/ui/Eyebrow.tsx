import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

interface EyebrowProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'green' | 'orange' | 'cream';
  withDot?: boolean;
}

const variants = {
  green: 'border-brand-green/20 bg-white/70 text-brand-green',
  orange: 'border-brand-orange/30 bg-white/70 text-brand-orange',
  cream: 'border-brand-cream/40 bg-white/10 text-brand-cream',
};

const dotVariants = {
  green: 'bg-brand-orange',
  orange: 'bg-brand-green',
  cream: 'bg-brand-orange',
};

/**
 * Eyebrow — μικρή πινακίδα/badge που εμφανίζεται από πάνω από τίτλους ή sections.
 * Π.χ. «01 · Αποστολή», «Νέο · Φθινόπωρο 2026»
 */
export function Eyebrow({
  variant = 'green',
  withDot = true,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur',
        variants[variant],
        className,
      )}
      {...props}
    >
      {withDot && (
        <span className={cn('h-2 w-2 animate-bounce-soft rounded-full', dotVariants[variant])} />
      )}
      {children}
    </div>
  );
}
