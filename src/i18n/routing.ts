import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing definition — single source of truth για όλο το app.
 *
 * - Locales: ελληνικά (default), αγγλικά
 * - URL prefix: 'always' σημαίνει ότι το /el ή /en θα εμφανίζεται πάντα
 *   (π.χ. το root URL '/' redirect-άρει σε '/el'). Αυτό είναι SEO-friendly.
 *
 * Σημαντικό: Τα locale codes εδώ ταιριάζουν με τα locale codes στο
 * Payload CMS (src/payload.config.ts), ώστε όταν fetch-άρουμε δεδομένα
 * περνάμε απευθείας το `locale` ως argument.
 */
export const routing = defineRouting({
  locales: ['el', 'en'],
  defaultLocale: 'el',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
