import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseProps, Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> {
  href?: never;
}
interface ButtonAsLink extends BaseProps, Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> {
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  // Πορτοκαλί solid — main CTA
  primary:
    'bg-brand-orange text-white shadow-[0_8px_30px_rgb(244,129,32,0.25)] hover:bg-brand-orange-500 hover:shadow-[0_12px_40px_rgb(244,129,32,0.35)]',
  // Πράσινο outline / solid alt
  secondary:
    'bg-brand-green text-brand-cream shadow-[0_8px_30px_rgb(4,84,43,0.2)] hover:bg-brand-green-700 hover:shadow-[0_12px_40px_rgb(4,84,43,0.3)]',
  // Διαφανές με border — για secondary actions
  ghost:
    'bg-transparent text-brand-green border-2 border-brand-green/20 hover:border-brand-green hover:bg-brand-green hover:text-brand-cream',
  // Σε σκούρο background
  inverse:
    'bg-brand-cream text-brand-green hover:bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Button — variant-based με auto-detection link vs button.
 *
 * Παραδείγματα:
 *   <Button variant="primary" size="lg" withArrow>Δείτε τα προϊόντα</Button>
 *   <Button href="/contact" variant="ghost">Επικοινωνία</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/30',
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowUpRight className="size-[1.1em] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      )}
    </>
  );

  if ('href' in props && props.href) {
    return (
      <Link {...(props as ButtonAsLink)} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button {...(props as ButtonAsButton)} className={classes}>
      {content}
    </button>
  );
}
