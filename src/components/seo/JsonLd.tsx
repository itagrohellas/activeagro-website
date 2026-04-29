/**
 * JsonLd — render structured data σε <script type="application/ld+json">.
 *
 * Helpers builders για Organization, Product, Article, BreadcrumbList.
 * Η χρήση τους στις σελίδες ενισχύει το SEO (rich snippets στο Google,
 * knowledge panel, κτλ.).
 */

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ActiveAgro Α.Ε.',
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: 'Εταιρία εμπορίας λιπασμάτων και αγροτικών εφοδίων.',
    foundingDate: '1995',
    sameAs: [
      'https://www.facebook.com/',
      'https://www.instagram.com/',
      'https://www.linkedin.com/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      areaServed: 'GR',
      availableLanguage: ['el', 'en'],
    },
  };
}

interface ProductLdInput {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  slug: string;
  locale: string;
  category?: string | null;
}

export function productLd({ name, description, imageUrl, slug, locale, category }: ProductLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description ?? undefined,
    image: imageUrl ? [imageUrl] : undefined,
    brand: { '@type': 'Brand', name: 'ActiveAgro' },
    category: category ?? undefined,
    url: `${BASE}/${locale}/products/${slug}`,
  };
}

interface ArticleLdInput {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  slug: string;
  locale: string;
  publishedAt?: string | null;
  authorName?: string | null;
}

export function articleLd({
  title,
  description,
  imageUrl,
  slug,
  locale,
  publishedAt,
  authorName,
}: ArticleLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description ?? undefined,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: publishedAt ?? undefined,
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@type': 'Organization', name: 'ActiveAgro' },
    publisher: {
      '@type': 'Organization',
      name: 'ActiveAgro',
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: `${BASE}/${locale}/blog/${slug}`,
  };
}
