import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends Omit<ComponentPropsWithoutRef<'h1'>, 'children'> {
  as?: HeadingTag;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Variation axis flavor (Fraunces variable axes). */
  flavor?: 'soft' | 'wonky' | 'tight' | 'default';
  /** Override font family — μπορεί να χρησιμοποιηθεί sans αντί για display. */
  family?: 'display' | 'sans';
  children?: ReactNode;
}

const sizes = {
  sm: 'text-3xl sm:text-4xl',
  md: 'text-display-sm sm:text-display-md',
  lg: 'text-display-md sm:text-display-lg',
  xl: 'text-display-lg sm:text-display-xl',
  '2xl': 'text-display-xl sm:text-display-2xl',
};

const flavors = {
  soft: 'display-soft',
  wonky: 'display-wonky',
  tight: 'display-tight',
  default: '',
};

const families = {
  display: 'font-display',
  sans: 'font-sans',
};

/**
 * Heading — ενιαίο component για όλους τους τίτλους.
 *
 * Παραδείγματα:
 *   <Heading as="h1" size="xl" flavor="wonky">Active<em>Agro</em></Heading>
 *   <Heading as="h2" size="md" family="sans">Σύντομος τίτλος</Heading>
 */
export function Heading({
  as = 'h2',
  size = 'lg',
  flavor = 'default',
  family = 'display',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={cn(
        families[family],
        sizes[size],
        flavors[flavor],
        'text-balance font-black tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
