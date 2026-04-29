import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ProductsHero } from '@/components/sections/ProductsHero';
import { ProductsFilters } from '@/components/products/ProductsFilters';
import { ProductsGrid } from '@/components/products/ProductsGrid';
import { CropsMarquee } from '@/components/sections/CropsMarquee';
import { ContactCta } from '@/components/sections/ContactCta';
import { getCategories, getProducts } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    category?: string;
    form?: string;
    q?: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('nav.products'),
    description: t('products.hero.intro'),
  };
}

/**
 * Σελίδα Προϊόντων — Task 8.
 *
 * Server-side filtering μέσω URL search params.
 * Layout: sidebar φίλτρα (sticky σε desktop) + grid.
 */
export default async function ProductsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const filters = await searchParams;
  setRequestLocale(locale);

  // Παράλληλο fetching για max performance
  const [categories, productsResult] = await Promise.all([
    getCategories(locale),
    getProducts(locale, {
      category: filters.category,
      form: filters.form,
      q: filters.q,
      limit: 30,
    }),
  ]);

  const categoryOptions = categories.map((c) => ({ slug: c.slug, name: c.name }));

  return (
    <>
      <ProductsHero />

      <Section spacing="md" tone="cream" className="pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Filters sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-32">
                <ProductsFilters categories={categoryOptions} />
              </div>
            </aside>

            {/* Products grid */}
            <div className="lg:col-span-8 xl:col-span-9">
              <ProductsGrid
                products={productsResult.docs.map((p) => ({
                  id: p.id,
                  name: p.name,
                  slug: p.slug,
                  tagline: p.tagline,
                  shortDescription: p.shortDescription,
                  npkLabel: p.npkLabel,
                  form: p.form,
                  mainImage: p.mainImage,
                  category: p.category,
                }))}
                totalCount={productsResult.totalDocs}
              />
            </div>
          </div>
        </Container>
      </Section>

      <CropsMarquee />
      <ContactCta />
    </>
  );
}
