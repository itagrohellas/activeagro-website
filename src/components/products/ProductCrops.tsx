import { getTranslations } from 'next-intl/server';
import { Sprout, Droplets, Calendar } from 'lucide-react';

interface CropItem {
  name: string;
  dosage?: string | null;
  timing?: string | null;
}

interface ProductCropsProps {
  crops?: CropItem[] | null;
}

/**
 * ProductCrops — εφαρμογές ανά καλλιέργεια.
 * Κάθε καλλιέργεια εμφανίζεται ως κάρτα με icon, δοσολογία και χρόνο εφαρμογής.
 */
export async function ProductCrops({ crops }: ProductCropsProps) {
  const t = await getTranslations();
  if (!crops || crops.length === 0) return null;

  return (
    <div className="rounded-4xl border border-brand-green/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
        {t('products.detail.cropsTitle')}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {crops.map((crop, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-brand-green/10 bg-brand-cream/40 p-5 transition hover:border-brand-orange/40 hover:bg-white"
          >
            {/* Decorative sprout watermark */}
            <Sprout
              aria-hidden
              className="absolute -bottom-2 -right-2 size-20 text-brand-green/5 transition group-hover:text-brand-orange/15"
            />

            <div className="relative">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-brand-green">
                <Sprout className="size-5 text-brand-orange" />
                {crop.name}
              </h3>

              <dl className="mt-4 space-y-2 text-sm">
                {crop.dosage && (
                  <div className="flex items-baseline gap-2">
                    <dt className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-brand-ink/50">
                      <Droplets className="size-3" />
                      {t('products.detail.dosage')}
                    </dt>
                    <dd className="text-brand-ink">{crop.dosage}</dd>
                  </div>
                )}
                {crop.timing && (
                  <div className="flex items-baseline gap-2">
                    <dt className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-brand-ink/50">
                      <Calendar className="size-3" />
                      {t('products.detail.timing')}
                    </dt>
                    <dd className="text-brand-ink">{crop.timing}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
