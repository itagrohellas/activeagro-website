import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * next-intl middleware.
 * - Διαβάζει το locale από το URL (π.χ. /el/products → 'el')
 * - Αν λείπει, redirect-άρει στο default locale (π.χ. / → /el)
 * - Σέβεται το Accept-Language header του browser για first visit
 */
export default createMiddleware(routing);

/**
 * Matcher: εφαρμόζουμε το locale routing μόνο σε frontend pages.
 *
 * Εξαιρούμε:
 *  - /admin               → Payload admin panel (όχι localized URL)
 *  - /api                 → Payload REST API & Next.js API routes
 *  - /_next               → Next.js internal assets
 *  - /_vercel             → Vercel internal
 *  - όλα τα static files (.svg, .png, .jpg, .ico, .pdf, κλπ)
 */
export const config = {
  matcher: ['/((?!admin|api|_next|_vercel|.*\\..*).*)'],
};
