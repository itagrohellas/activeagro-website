import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine clsx + tailwind-merge.
 * - clsx: composable conditional classes
 * - tailwind-merge: λύνει conflicts (π.χ. "px-2 px-4" → "px-4")
 *
 * Παράδειγμα:
 *   cn('p-4 bg-brand-green', isActive && 'bg-brand-orange', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
