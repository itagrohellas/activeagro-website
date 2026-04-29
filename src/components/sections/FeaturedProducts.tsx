import { getTranslations } from 'next-intl/server';
import NextLink from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface FeaturedProductsProps {
  locale: Locale;
}

/**
 * FeaturedProducts — fetch-άρει τα featured products από το Payload και τα δείχνει σε grid.
 *
 * Empty state: αν δεν υπάρχουν featured προϊόντα ακόμα (π.χ. fresh install),
 * δείχνουμε ένα ωραίο placeholder messaging αντί να κρύβουμε εντελώς το section.
 */
export async function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const [t, products] = await Promise.all([getTranslations(), getFeaturedProducts(locale, 6)]);

  return (
    <Section id="products" spacing="lg" tone="cream">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <FadeIn>
              <Eyebrow variant="orange" className="mb-4">
                {t('featured.eyebrow')}
              </Eyebrow>
            </FadeIn>
            <Heading as="h2" size="lg" flavor="soft" className="text-brand-green">
              <FadeIn>{t('featured.heading')}</FadeIn>
            </Heading>
          </div>

          <FadeIn>
            <Button href="/products" variant="ghost" size="md" withArrow>
              {t('featured.viewAll')}
            </Button>
          </FadeIn>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <FadeIn key={product.id} delay={i * 0.05}>
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    tagline: product.tagline,
                    shortDescription: product.shortDescription,
                    npkLabel: product.npkLabel,
                    form: product.form,
                    mainImage: product.mainImage,
                    category: product.category,
                  }}
                  priority={i < 3}
                  className="h-full"
                />
              </FadeIn>
            ))}
          </div>
        ) : (
          // Empty state — εμφανίζεται αν δεν υπάρχουν featured προϊόντα ακόμα
          <FadeIn>
            <div className="rounded-4xl border-2 border-dashed border-brand-green/20 bg-white/40 p-12 text-center">
              <p className="font-display text-2xl font-medium text-brand-green/70">
                {t('featured.empty')}
              </p>
              <p className="mt-3 text-sm text-brand-ink/50">
                Ο διαχειριστής μπορεί να προσθέσει προϊόντα από το{' '}
                <NextLink href="/admin" className="font-medium text-brand-orange underline">
                  CMS
                </NextLink>{' '}
                και να τα μαρκάρει ως «Προβεβλημένα».
              </p>
            </div>
          </FadeIn>
        )}
      </Container>
    </Section>
  );
}
