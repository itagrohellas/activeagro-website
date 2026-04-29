import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  /** Ταχύτητα: αργό = 60s, μεσαίο = 30s (default), γρήγορο = 15s */
  speed?: 'slow' | 'medium' | 'fast';
  /** Reverse direction */
  reverse?: boolean;
  className?: string;
}

const speeds = {
  slow: 'animate-[marquee_60s_linear_infinite]',
  medium: 'animate-marquee',
  fast: 'animate-marquee-fast',
};

/**
 * Marquee — ατέλειωτο scrolling banner.
 * Διπλασιάζει το περιεχόμενο ώστε να μην υπάρχει gap.
 *
 * Χρήσιμο για: list καλλιεργειών, brand keywords, partners.
 */
export function Marquee({ children, speed = 'medium', reverse = false, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent_0,black_5%,black_95%,transparent_100%)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-12 pr-12',
          speeds[speed],
          reverse && '[animation-direction:reverse]',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
