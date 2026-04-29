import { getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/products/ProductCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { PackageX } from 'lucide-react';

interface Product {
  id: number | string;
  name: string;
  slug: string;
  tagline?: string | null;
  shortDescription?: string | null;
  npkLabel?: string | null;
  form?: string | null;
  mainImage?: unknown;
  category?: unknown;
}

interface ProductsGridProps {
  products: Product[];
  totalCount: number;
}

/**
 * ProductsGrid — εμφανίζει είτε grid προϊόντων είτε empty state.
 * Δείχνει επίσης το count των αποτελεσμάτων στην κορυφή.
 */
export async function ProductsGrid({ products, totalCount }: ProductsGridProps) {
  const t = await getTranslations();

  return (
    <div>
      {/* Result count */}
      <p className="mb-6 font-mono text-sm text-brand-ink/60">
        {t('products.filters.results', { count: totalCount })}
      </p>

      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={Math.min(i, 8) * 0.05} from="up">
              <ProductCard product={product} priority={i < 3} className="h-full" />
            </FadeIn>
          ))}
        </div>
      ) : (
        <FadeIn>
          <div className="rounded-4xl border-2 border-dashed border-brand-green/20 bg-white/40 p-12 text-center">
            <PackageX className="mx-auto size-12 text-brand-green/40" />
            <h3 className="mt-4 font-display text-2xl font-bold text-brand-green">
              {t('products.empty.title')}
            </h3>
            <p className="mt-2 text-brand-ink/60">{t('products.empty.body')}</p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
