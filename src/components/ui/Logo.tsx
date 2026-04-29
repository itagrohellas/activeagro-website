import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** "full" — ολόκληρο το logo. "mark" — μόνο το AA σημάδι. */
  variant?: 'full' | 'mark';
  /** "dark" — original colors (πράσινο/πορτοκαλί), για light backgrounds.
   *  "light" — λευκό αντί για πράσινο, για dark backgrounds. */
  tone?: 'dark' | 'light';
  /** Width σε pixels του πραγματικού asset. */
  width?: number;
  className?: string;
  /** Αν δοθεί, γίνεται Link. Default: "/" */
  href?: string | false;
  priority?: boolean;
}

/**
 * Logo — ενιαίο σημείο εισαγωγής του ActiveAgro logo.
 * Διαφανές background, optimized μέσω next/image.
 */
export function Logo({
  variant = 'full',
  tone = 'dark',
  width = 200,
  className,
  href = '/',
  priority = false,
}: LogoProps) {
  const src =
    variant === 'mark' ? '/icon.png' : tone === 'light' ? '/logo-light.png' : '/logo.png';
  const aspectRatio = variant === 'full' ? 1934 / 792 : 1;
  const height = Math.round(width / aspectRatio);

  const img = (
    <Image
      src={src}
      alt="ActiveAgro"
      width={width}
      height={height}
      priority={priority}
      className={cn('h-auto select-none', className)}
    />
  );

  if (href === false) return img;

  return (
    <Link href={href} aria-label="ActiveAgro — Αρχική σελίδα" className="inline-flex items-center">
      {img}
    </Link>
  );
}
