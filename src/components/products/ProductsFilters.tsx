'use client';

import { useEffect, useState, useTransition, useCallback, useRef } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryOption {
  slug: string;
  name: string;
}

interface ProductsFiltersProps {
  categories: CategoryOption[];
}

const FORMS = ['granular', 'powder', 'liquid', 'crystalline', 'other'] as const;

/**
 * ProductsFilters — client component που ενημερώνει το URL search params
 * για κάθε αλλαγή φίλτρου.
 *
 * Ο πατρικός server component (ProductsPage) διαβάζει τα searchParams και
 * κάνει re-fetch με τα νέα filters. Αυτό μας δίνει:
 *  - shareable URLs ("/products?category=xyz")
 *  - back/forward συμβατότητα
 *  - SEO-friendly (server-rendered)
 *
 * Search field: debounced με 350ms ώστε να μην κάνει query σε κάθε keystroke.
 */
export function ProductsFilters({ categories }: ProductsFiltersProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get('category') ?? '';
  const currentForm = searchParams.get('form') ?? '';
  const currentSearch = searchParams.get('q') ?? '';

  // Local state για search input — debounced
  const [searchValue, setSearchValue] = useState(currentSearch);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local state όταν αλλάζει το URL από αλλού (π.χ. reset)
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const qs = params.toString();
      startTransition(() => {
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  // Debounced search update
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateParams({ q: value });
    }, 350);
  };

  const hasActiveFilters = currentCategory || currentForm || currentSearch;

  const handleReset = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearchValue('');
    updateParams({ category: null, form: null, q: null });
  };

  return (
    <div
      className={cn(
        'rounded-3xl border border-brand-green/10 bg-white p-5 shadow-sm transition-opacity sm:p-6',
        isPending && 'opacity-70',
      )}
    >
      {/* Header row */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-brand-green">
          {t('products.filters.title')}
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-medium text-brand-orange transition hover:bg-brand-orange hover:text-white"
          >
            <X className="size-3" />
            {t('products.filters.reset')}
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label
          htmlFor="product-search"
          className="mb-2 block font-mono text-xs font-medium uppercase tracking-widest text-brand-ink/50"
        >
          {t('products.filters.search')}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand-ink/40" />
          <input
            id="product-search"
            type="search"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('products.filters.searchPlaceholder')}
            className="w-full rounded-full border border-brand-green/15 bg-brand-cream/60 py-2.5 pl-10 pr-4 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
          />
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <FilterGroup label={t('products.filters.category')}>
          <FilterChip
            label={t('products.filters.allCategories')}
            active={!currentCategory}
            onClick={() => updateParams({ category: null })}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat.slug}
              label={cat.name}
              active={currentCategory === cat.slug}
              onClick={() => updateParams({ category: cat.slug })}
            />
          ))}
        </FilterGroup>
      )}

      {/* Form */}
      <FilterGroup label={t('products.filters.form')}>
        <FilterChip
          label={t('products.filters.allForms')}
          active={!currentForm}
          onClick={() => updateParams({ form: null })}
        />
        {FORMS.map((form) => (
          <FilterChip
            key={form}
            label={t(`products.form.${form}`)}
            active={currentForm === form}
            onClick={() => updateParams({ form })}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-brand-ink/50">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full px-3 py-1.5 text-sm font-medium transition',
        active
          ? 'bg-brand-green text-brand-cream shadow-sm'
          : 'bg-brand-cream/60 text-brand-ink/70 hover:bg-brand-cream hover:text-brand-green',
      )}
    >
      {label}
    </button>
  );
}
