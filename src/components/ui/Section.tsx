import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  /** Vertical padding density */
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  /** Background tint */
  tone?: 'cream' | 'white' | 'green' | 'sky' | 'transparent';
}

const spacings = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-24 sm:py-32 lg:py-40',
  xl: 'py-32 sm:py-44 lg:py-56',
};

const tones = {
  cream: 'bg-brand-cream text-brand-ink',
  white: 'bg-white text-brand-ink',
  green: 'bg-brand-green text-brand-cream',
  sky: 'bg-brand-sky text-brand-ink',
  transparent: '',
};

/**
 * Section — vertical-rhythm wrapper με tonal backgrounds.
 * Παρέχει συνεπή spacing & background colors σε όλο το site.
 */
export function Section({
  spacing = 'lg',
  tone = 'transparent',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn('relative', spacings[spacing], tones[tone], className)}
      {...props}
    />
  );
}
