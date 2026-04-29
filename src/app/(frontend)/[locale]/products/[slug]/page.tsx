import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/motion/MagneticButton';
import { FadeIn } from '@/components/motion/FadeIn';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductSpecs } from '@/components/products/ProductSpecs';
import { ProductPackaging } from '@/components/products/ProductPackaging';
import { ProductCrops } from '@/components/products/ProductCrops';
import { ProductRichText } from '@/components/products/ProductRichText';
import { RelatedProducts } from '@/components/products/RelatedProducts';
import { ContactCta } from '@/components/sections/ContactCta';
import { JsonLd, productLd } from '@/components/seo/JsonLd';
import { getProductBySlug, getMediaUrl } from '@/lib/queries';
import { ArrowLeft, Download, MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) return { title: 'Product not found' };

  const meta = (product as { meta?: { title?: string; description?: string } }).meta ?? {};
  return {
    title: meta.title || product.name,
    description: meta.description || product.tagline || product.shortDescription || undefined,
    openGraph: {
      title: meta.title || product.name,
      description: meta.description || product.tagline || undefined,
      images: getMediaUrl(product.mainImage, 'desktop')
        ? [getMediaUrl(product.mainImage, 'desktop')!]
        : undefined,
    },
  };
}

/**
 * Σελίδα προϊόντος — Task 9.
 *
 * Δομή:
 *  1. Hero  — gallery + product info & CTAs
 *  2. Specs — NPK + ιχνοστοιχεία
 *  3. Packaging
 *  4. Crops & Applications
 *  5. Usage instructions (rich text)
 *  6. Precautions (text)
 *  7. RelatedProducts (από ίδια κατηγορία)
 *  8. ContactCta
 */
export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug, locale);
  if (!product) notFound();

  const t = await getTranslations();

  // Build gallery images array
  const galleryImages: { url: string; alt: string }[] = [];
  const mainImageUrl = getMediaUrl(product.mainImage, 'desktop');
  if (mainImageUrl) {
    galleryImages.push({
      url: mainImageUrl,
      alt:
        ((product.mainImage as { alt?: string })?.alt as string | undefined) ?? product.name,
    });
  }
  const gallery = (product as { gallery?: Array<{ image?: unknown }> }).gallery;
  if (gallery) {
    for (const item of gallery) {
      const url = getMediaUrl(item.image, 'desktop');
      if (url) {
        galleryImages.push({
          url,
          alt: ((item.image as { alt?: string })?.alt as string | undefined) ?? product.name,
        });
      }
    }
  }

  const datasheet = product.datasheet as { url?: string; filename?: string } | undefined;
  const datasheetUrl = datasheet?.url;

  const categoryId =
    product.category && typeof product.category === 'object' && 'id' in product.category
      ? (product.category as { id: number | string }).id
      : null;
  const categoryName =
    product.category && typeof product.category === 'object' && 'name' in product.category
      ? (product.category as { name: string }).name
      : null;
  const categorySlug =
    product.category && typeof product.category === 'object' && 'slug' in product.category
      ? (product.category as { slug: string }).slug
      : null;

  return (
    <>
      <JsonLd
        data={productLd({
          name: product.name,
          description: product.tagline ?? product.shortDescription,
          imageUrl: getMediaUrl(product.mainImage, 'desktop'),
          slug: product.slug,
          locale,
          category: categoryName,
        })}
      />

      {/* ━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━ */}
      <Section spacing="md" tone="cream" className="relative pt-32 sm:pt-40">
        <Container>
          {/* Breadcrumb / Back link */}
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand-ink/60 transition hover:text-brand-green"
          >
            <ArrowLeft className="size-4 transition group-hover:-translate-x-1" />
            {t('products.detail.backToProducts')}
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <FadeIn>
                <ProductGallery images={galleryImages} productName={product.name} />
              </FadeIn>
            </div>

            {/* Info column */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                {categoryName && categorySlug && (
                  <Link
                    href={`/products?category=${categorySlug}`}
                    className="inline-block font-mono text-xs font-medium uppercase tracking-widest text-brand-orange transition hover:underline"
                  >
                    {categoryName}
                  </Link>
                )}

                <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight text-brand-green sm:text-5xl">
                  {product.name}
                </h1>

                {product.tagline && (
                  <p className="mt-4 text-xl text-brand-ink/65">{product.tagline}</p>
                )}

                {/* Quick badges */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.npkLabel && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green text-brand-cream px-3 py-1.5 font-mono text-xs font-bold tracking-wider">
                      NPK · {product.npkLabel}
                    </span>
                  )}
                  {product.form && (
                    <span className="inline-flex items-center rounded-full bg-brand-orange/10 text-brand-orange px-3 py-1.5 text-xs font-medium">
                      {t(`products.form.${product.form}` as 'products.form.granular')}
                    </span>
                  )}
                </div>

                {product.shortDescription && (
                  <p className="mt-6 text-base text-brand-ink/75">{product.shortDescription}</p>
                )}

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic strength={12}>
                    <Button href="/contact" variant="primary" withArrow>
                      <MessageCircle className="size-4" />
                      {t('products.detail.askExpert')}
                    </Button>
                  </Magnetic>
                  {datasheetUrl && (
                    <a
                      href={datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 rounded-full border-2 border-brand-green/15 bg-white px-5 py-3 text-sm font-medium text-brand-green transition hover:border-brand-green hover:bg-brand-green hover:text-brand-cream"
                    >
                      <Download className="size-4" />
                      {t('products.detail.downloadDatasheet')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ━━━━━━━━━━━━━━━ DETAILS ━━━━━━━━━━━━━━━ */}
      <Section spacing="md" tone="cream">
        <Container>
          <div className="space-y-6">
            <FadeIn>
              <ProductSpecs
                npkLabel={product.npkLabel}
                n={product.n}
                p={product.p}
                k={product.k}
                micronutrients={product.micronutrients}
                notes={product.compositionNotes}
              />
            </FadeIn>

            <FadeIn>
              <ProductPackaging packaging={product.packaging} />
            </FadeIn>

            <FadeIn>
              <ProductCrops crops={product.crops} />
            </FadeIn>

            {/* Description (rich text) */}
            {product.description && (
              <FadeIn>
                <div className="rounded-4xl border border-brand-green/10 bg-white p-6 sm:p-8">
                  <h2 className="mb-4 font-display text-2xl font-bold text-brand-green sm:text-3xl">
                    {t('common.readMore')}
                  </h2>
                  <ProductRichText data={product.description} />
                </div>
              </FadeIn>
            )}

            {/* Usage instructions (rich text) */}
            {product.usageInstructions && (
              <FadeIn>
                <div className="rounded-4xl border border-brand-green/10 bg-white p-6 sm:p-8">
                  <h2 className="mb-4 font-display text-2xl font-bold text-brand-green sm:text-3xl">
                    {t('products.detail.usageTitle')}
                  </h2>
                  <ProductRichText data={product.usageInstructions} />
                </div>
              </FadeIn>
            )}

            {/* Precautions */}
            {product.precautions && (
              <FadeIn>
                <div className="rounded-4xl border-l-4 border-l-brand-orange border-y border-r border-brand-green/10 bg-brand-orange/5 p-6 sm:p-8">
                  <h2 className="font-display text-xl font-bold text-brand-orange">
                    {t('products.detail.precautionsTitle')}
                  </h2>
                  <p className="mt-3 text-brand-ink/80">{product.precautions}</p>
                </div>
              </FadeIn>
            )}
          </div>
        </Container>
      </Section>

      {/* ━━━━━━━━━━━━━━━ RELATED ━━━━━━━━━━━━━━━ */}
      {categoryId && (
        <RelatedProducts categoryId={categoryId} excludeId={product.id} locale={locale} />
      )}

      <ContactCta />
    </>
  );
}
