import type { MetadataRoute } from 'next';
import { getPayload } from '@/lib/payload';
import { routing } from '@/i18n/routing';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Δυναμικό sitemap.xml.
 *
 * Συμπεριλαμβάνει:
 *   - Όλες τις στατικές σελίδες (home, about, products, blog, contact)
 *   - Κάθε locale (el, en) ως ξεχωριστό URL
 *   - Όλα τα προϊόντα και άρθρα από το CMS
 *   - alternates.languages για σωστό SEO multi-language signaling
 *
 * Available στο: /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ['', '/about', '/products', '/blog', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages × locales
  for (const path of staticPages) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE}/${l}${path}`]),
          ),
        },
      });
    }
  }

  // Dynamic content — products & blog posts
  try {
    const payload = await getPayload();

    const [products, posts] = await Promise.all([
      payload.find({ collection: 'products', limit: 500, depth: 0 }),
      payload.find({ collection: 'blog-posts', limit: 500, depth: 0 }),
    ]);

    for (const product of products.docs) {
      for (const locale of routing.locales) {
        entries.push({
          url: `${BASE}/${locale}/products/${product.slug}`,
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [l, `${BASE}/${l}/products/${product.slug}`]),
            ),
          },
        });
      }
    }

    for (const post of posts.docs) {
      for (const locale of routing.locales) {
        entries.push({
          url: `${BASE}/${locale}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: 'yearly',
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [l, `${BASE}/${l}/blog/${post.slug}`]),
            ),
          },
        });
      }
    }
  } catch {
    // DB not available — επιστρέφουμε μόνο static pages
  }

  return entries;
}
