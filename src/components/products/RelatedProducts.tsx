import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { ProductCard } from '@/components/products/ProductCard';
import { getRelatedProducts } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface RelatedProductsProps {
  categoryId: number | string;
  excludeId: number | string;
  locale: Locale;
}

export async function RelatedProducts({ categoryId, excludeId, locale }: RelatedProductsProps) {
  const [t, products] = await Promise.all([
    getTranslations(),
    getRelatedProducts(categoryId, excludeId, locale, 3),
  ]);

  if (products.length === 0) return null;

  return (
    <Section spacing="lg" tone="cream">
      <Container>
        <div className="mb-10">
          <FadeIn>
            <Eyebrow variant="orange" className="mb-4">
              {t('products.detail.relatedTitle')}
            </Eyebrow>
          </FadeIn>
          <Heading as="h2" size="md" flavor="soft" className="text-brand-green">
            <FadeIn>{t('products.detail.relatedTitle')}</FadeIn>
          </Heading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.08}>
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
                className="h-full"
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
