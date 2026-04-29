import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getMediaUrl } from '@/lib/queries';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number | string;
    name: string;
    slug: string;
    tagline?: string | null;
    shortDescription?: string | null;
    npkLabel?: string | null;
    form?: string | null;
    mainImage?: unknown;
    category?: unknown;
  };
  className?: string;
  priority?: boolean;
}

const FORM_LABELS: Record<string, string> = {
  granular: 'Κόκκοι',
  powder: 'Σκόνη',
  liquid: 'Υγρό',
  crystalline: 'Κρυσταλλικό',
  other: '—',
};

/**
 * ProductCard — αναδιπλώνει ένα προϊόν σε editorial-style κάρτα.
 * Hover effect: μεγάλη εικόνα ξεσκαρτάρεται, ολόκληρη η κάρτα ανυψώνεται.
 *
 * Τα labels είναι Greek-only για τώρα. Στο Task 12 θα τα κάνουμε i18n.
 */
export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const imageUrl = getMediaUrl(product.mainImage, 'card');
  const categoryName =
    product.category && typeof product.category === 'object' && 'name' in product.category
      ? String((product.category as { name: string }).name)
      : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group/card relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500',
        'hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-green/10',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-6xl font-black text-brand-green/15">AA</span>
          </div>
        )}

        {/* Floating badge: NPK */}
        {product.npkLabel && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-brand-green/95 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-brand-cream backdrop-blur">
            NPK · {product.npkLabel}
          </div>
        )}

        {/* Form chip */}
        {product.form && FORM_LABELS[product.form] && (
          <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-brand-ink backdrop-blur">
            {FORM_LABELS[product.form]}
          </div>
        )}

        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-brand-orange text-white opacity-0 shadow-lg transition-all duration-500 group-hover/card:opacity-100 group-hover/card:translate-y-0 translate-y-2">
          <ArrowUpRight className="size-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-6">
        {categoryName && (
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-orange">
            {categoryName}
          </p>
        )}
        <h3 className="font-display text-2xl font-bold text-brand-green transition group-hover/card:text-brand-orange">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-sm text-brand-ink/65">{product.tagline}</p>
        )}
        {product.shortDescription && !product.tagline && (
          <p className="line-clamp-2 text-sm text-brand-ink/65">{product.shortDescription}</p>
        )}
      </div>
    </Link>
  );
}
