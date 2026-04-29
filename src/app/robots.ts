import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * robots.txt — διαθέσιμο στο /robots.txt.
 *
 * Επιτρέπει όλους τους bots σε όλο το site,
 * εξαιρώντας μόνο το admin panel και τα API routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/_next'],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
