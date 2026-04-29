import { cache } from 'react';
import type { Where } from 'payload';
import { getPayload } from './payload';
import type { Locale } from '@/i18n/routing';

/**
 * Typed query helpers για το Payload CMS.
 *
 * Όλα τα queries δέχονται locale και γυρνάνε δεδομένα στη σωστή γλώσσα.
 * Χρησιμοποιούν Promise.all για παράλληλο fetching όπου είναι δυνατό.
 *
 * Σημείωση: Πολλά functions έχουν try/catch γιατί στο dev (πριν το seed
 * data) η DB μπορεί να είναι άδεια ή τα tables μπορεί να μην έχουν δημιουργηθεί
 * ακόμα. Επιστρέφουμε empty arrays/null αντί να ρίχνουμε error.
 */

/**
 * getProducts — λίστα προϊόντων με optional filters.
 * Όλα τα filters είναι προαιρετικά. Χρησιμοποιείται από τη σελίδα /products.
 */
export async function getProducts(
  locale: Locale,
  filters: {
    category?: string; // category slug
    form?: string;
    q?: string; // search term
    limit?: number;
    page?: number;
  } = {},
) {
  try {
    const payload = await getPayload();

    // Compose `where` object dynamically. Παραλείπουμε άδεια filters.
    const conditions: Where[] = [];

    if (filters.category) {
      conditions.push({ 'category.slug': { equals: filters.category } });
    }
    if (filters.form) {
      conditions.push({ form: { equals: filters.form } });
    }
    if (filters.q) {
      // Case-insensitive search σε όνομα + tagline
      conditions.push({
        or: [
          { name: { like: filters.q } },
          { tagline: { like: filters.q } },
          { shortDescription: { like: filters.q } },
        ],
      });
    }

    const where: Where = conditions.length > 0 ? { and: conditions } : {};

    const result = await payload.find({
      collection: 'products',
      locale,
      where,
      limit: filters.limit ?? 24,
      page: filters.page ?? 1,
      sort: '-updatedAt',
      depth: 2,
    });
    return result;
  } catch {
    // Empty fallback ώστε η σελίδα να δουλεύει σε άδεια DB
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1, hasNextPage: false, hasPrevPage: false };
  }
}

export async function getFeaturedProducts(locale: Locale, limit = 6) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'products',
      locale,
      where: { featured: { equals: true } },
      limit,
      sort: '-updatedAt',
      depth: 2, // include media + category
    });
    return result.docs;
  } catch {
    return [];
  }
}

/**
 * getPosts — λίστα blog posts με pagination.
 */
export async function getPosts(locale: Locale, options: { page?: number; limit?: number } = {}) {
  try {
    const payload = await getPayload();
    return await payload.find({
      collection: 'blog-posts',
      locale,
      where: {},
      limit: options.limit ?? 12,
      page: options.page ?? 1,
      sort: '-publishedAt',
      depth: 2,
    });
  } catch {
    return {
      docs: [],
      totalDocs: 0,
      totalPages: 0,
      page: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

/**
 * getRelatedPosts — άλλα 3 posts (εκτός από το current).
 * Δεν φιλτράρουμε ανά tag/category — απλώς τα πιο πρόσφατα.
 */
export async function getRelatedPosts(excludeId: number | string, locale: Locale, limit = 3) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'blog-posts',
      locale,
      where: { id: { not_equals: excludeId } },
      limit,
      sort: '-publishedAt',
      depth: 2,
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getLatestPosts(locale: Locale, limit = 3) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'blog-posts',
      locale,
      where: {},
      limit,
      sort: '-publishedAt',
      depth: 2,
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getCategories(locale: Locale) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'categories',
      locale,
      sort: 'order',
      limit: 100,
      depth: 1,
    });
    return result.docs;
  } catch {
    return [];
  }
}

/**
 * getSiteSettings — cached με React cache(), έτσι ώστε σε ένα single request
 * (π.χ. Hero + Footer + ContactInfo + Header) να γίνεται ΜΟΝΟ ΜΙΑ DB query.
 *
 * Σε dev με 4 fetches ανά page → πέφτει σε 1. Mεγάλη βελτίωση latency.
 */
export const getSiteSettings = cache(async (locale: Locale) => {
  try {
    const payload = await getPayload();
    return await payload.findGlobal({
      slug: 'site-settings',
      locale,
      depth: 1,
    });
  } catch {
    return null;
  }
});

export async function getPageBySlug(slug: string, locale: Locale) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'pages',
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 3, // hero image + sections.* uploads
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * getRelatedProducts — βρίσκει 3 άλλα προϊόντα από την ίδια κατηγορία.
 * Εξαιρεί το current product μέσω του id.
 */
export async function getRelatedProducts(
  categoryId: number | string,
  excludeId: number | string,
  locale: Locale,
  limit = 3,
) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'products',
      locale,
      where: {
        and: [{ category: { equals: categoryId } }, { id: { not_equals: excludeId } }],
      },
      limit,
      sort: '-updatedAt',
      depth: 2,
    });
    return result.docs;
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string, locale: Locale) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'products',
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 3,
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

export async function getPostBySlug(slug: string, locale: Locale) {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: 'blog-posts',
      locale,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    return result.docs[0] ?? null;
  } catch {
    return null;
  }
}

/**
 * Helper για το URL μιας εικόνας από Payload media.
 * Αν δεν υπάρχει εικόνα, επιστρέφει null.
 */
export function getMediaUrl(media: unknown, size?: 'thumbnail' | 'card' | 'tablet' | 'desktop') {
  if (!media || typeof media !== 'object') return null;
  const m = media as { url?: string; sizes?: Record<string, { url?: string }> };
  if (size && m.sizes?.[size]?.url) return m.sizes[size].url ?? null;
  return m.url ?? null;
}
