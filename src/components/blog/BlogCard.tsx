import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getMediaUrl } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface BlogCardProps {
  post: {
    id: number | string;
    title: string;
    slug: string;
    excerpt?: string | null;
    coverImage?: unknown;
    publishedAt?: string | null;
  };
  locale: Locale;
  /** Featured = μεγάλη κάρτα 2:1 για το πρώτο post */
  variant?: 'default' | 'featured';
  readMoreLabel: string;
  className?: string;
  priority?: boolean;
}

/**
 * BlogCard — reusable card για άρθρα.
 * Δύο variants: default (3 grid) και featured (full-width).
 */
export function BlogCard({
  post,
  locale,
  variant = 'default',
  readMoreLabel,
  className,
  priority = false,
}: BlogCardProps) {
  const imageUrl = getMediaUrl(post.coverImage, variant === 'featured' ? 'desktop' : 'card');
  const publishedAt = post.publishedAt ? new Date(post.publishedAt) : null;
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (variant === 'featured') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group relative grid overflow-hidden rounded-4xl bg-white transition hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-2',
          className,
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream lg:aspect-auto">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <Placeholder />
          )}
        </div>

        <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
          {publishedAt && (
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
              {dateFormatter.format(publishedAt)}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold leading-tight text-brand-green transition group-hover:text-brand-orange sm:text-4xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="line-clamp-3 text-brand-ink/65 sm:text-lg">{post.excerpt}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand-green">
            {readMoreLabel}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl bg-white transition hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Placeholder />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {publishedAt && (
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            {dateFormatter.format(publishedAt)}
          </p>
        )}
        <h3 className="font-display text-xl font-bold leading-tight text-brand-green transition group-hover:text-brand-orange">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="line-clamp-3 text-sm text-brand-ink/65">{post.excerpt}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-brand-green">
          {readMoreLabel}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

function Placeholder() {
  return (
    <div className="flex h-full items-center justify-center bg-brand-green/10">
      <span className="font-display text-5xl font-black text-brand-green/20">AA</span>
    </div>
  );
}
