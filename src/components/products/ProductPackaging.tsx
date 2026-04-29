import { getTranslations } from 'next-intl/server';
import { Package } from 'lucide-react';

interface PackagingItem {
  size: number;
  unit: string;
  sku?: string | null;
}

interface ProductPackagingProps {
  packaging?: PackagingItem[] | null;
}

/**
 * ProductPackaging — διαθέσιμες συσκευασίες σε grid από chips.
 */
export async function ProductPackaging({ packaging }: ProductPackagingProps) {
  const t = await getTranslations();
  if (!packaging || packaging.length === 0) return null;

  return (
    <div className="rounded-4xl border border-brand-green/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
        {t('products.detail.packagingTitle')}
      </h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {packaging.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-2xl border border-brand-green/10 bg-brand-cream/40 p-4 transition hover:border-brand-orange/40 hover:bg-white"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
              <Package className="size-5" />
            </div>
            <div>
              <p className="font-display text-lg font-bold tabular-nums text-brand-green">
                {p.size} {p.unit}
              </p>
              {p.sku && (
                <p className="font-mono text-xs text-brand-ink/50">
                  {t('products.detail.skuLabel')}: {p.sku}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
