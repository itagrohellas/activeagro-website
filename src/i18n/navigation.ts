import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware Link, useRouter, redirect, getPathname.
 * Χρησιμοποίησε αυτά αντί για τα default του Next.js όταν θες
 * να διατηρήσεις το locale prefix αυτόματα.
 *
 * Παράδειγμα:
 *   import { Link } from '@/i18n/navigation';
 *   <Link href="/products">Προϊόντα</Link>
 *   // → /el/products αν είσαι σε el, /en/products αν είσαι σε en
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
