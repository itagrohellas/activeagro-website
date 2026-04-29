import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { BlogCard } from '@/components/blog/BlogCard';
import { ProductRichText } from '@/components/products/ProductRichText';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { SocialShare } from '@/components/blog/SocialShare';
import { JsonLd, articleLd } from '@/components/seo/JsonLd';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getMediaUrl } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) return { title: 'Post not found' };

  const meta = (post as { meta?: { title?: string; description?: string } }).meta ?? {};
  return {
    title: meta.title || post.title,
    description: meta.description || post.excerpt || undefined,
    openGraph: {
      title: meta.title || post.title,
      description: meta.description || post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      images: getMediaUrl(post.coverImage, 'desktop')
        ? [getMediaUrl(post.coverImage, 'desktop')!]
        : undefined,
    },
  };
}

/**
 * Blog post detail — Task 10.
 *
 * Δομή:
 *  - ReadingProgress (top sticky bar)
 *  - Hero με eyebrow date, big title, excerpt, cover image
 *  - Rich-text content
 *  - Tags + Social share
 *  - Related posts
 */
export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const [t, related] = await Promise.all([
    getTranslations(),
    getRelatedPosts(post.id, locale, 3),
  ]);

  const coverUrl = getMediaUrl(post.coverImage, 'desktop');
  const publishedAt = post.publishedAt ? new Date(post.publishedAt) : null;
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Calculate approx reading time (200 words/minute)
  const wordCount = JSON.stringify(post.content ?? {}).split(/\s+/).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  // Author info
  const author = post.author as { name?: string } | null;

  // Tags
  const tags = (post.tags as Array<{ tag: string }> | null) ?? [];

  // Build full URL for social share
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const fullUrl = `${baseUrl}/${locale}/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={articleLd({
          title: post.title,
          description: post.excerpt,
          imageUrl: coverUrl,
          slug: post.slug,
          locale,
          publishedAt: post.publishedAt,
          authorName: author?.name,
        })}
      />

      <ReadingProgress />

      {/* HERO */}
      <Section spacing="sm" tone="cream" className="pt-32 sm:pt-40">
        <Container size="md">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand-ink/60 transition hover:text-brand-green"
          >
            <ArrowLeft className="size-4 transition group-hover:-translate-x-1" />
            {t('blog.detail.backToBlog')}
          </Link>

          <div className="mt-8">
            {publishedAt && (
              <Eyebrow variant="orange" withDot={false} className="mb-6">
                {dateFormatter.format(publishedAt)} · {t('blog.detail.minRead', { min: readingMinutes })}
              </Eyebrow>
            )}
            <Heading as="h1" size="xl" flavor="wonky" className="text-balance text-brand-green">
              {post.title}
            </Heading>
            {post.excerpt && (
              <p className="mt-6 text-pretty text-xl leading-relaxed text-brand-ink/70 sm:text-2xl">
                {post.excerpt}
              </p>
            )}
            {author?.name && (
              <p className="mt-6 text-sm text-brand-ink/60">
                {t('blog.detail.byAuthor')}{' '}
                <span className="font-medium text-brand-green">{author.name}</span>
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* COVER */}
      {coverUrl && (
        <Section spacing="sm" tone="cream">
          <Container size="lg">
            <FadeIn>
              <div className="relative aspect-[16/9] overflow-hidden rounded-4xl bg-brand-green/5">
                <Image
                  src={coverUrl}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </Container>
        </Section>
      )}

      {/* CONTENT */}
      <Section spacing="md" tone="cream">
        <Container size="md">
          <article>
            <ProductRichText data={post.content} className="text-lg" />
          </article>

          {/* Tags + Share */}
          <div className="mt-16 flex flex-col gap-6 border-t border-brand-green/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-ink/50">
                  {t('blog.detail.tagsLabel')}
                </span>
                {tags.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            )}

            <SocialShare url={fullUrl} title={post.title} />
          </div>
        </Container>
      </Section>

      {/* RELATED */}
      {related.length > 0 && (
        <Section spacing="lg" tone="white">
          <Container>
            <div className="mb-10">
              <Eyebrow variant="green" className="mb-4">
                {t('blog.detail.relatedTitle')}
              </Eyebrow>
              <Heading as="h2" size="md" flavor="soft" className="text-brand-green">
                {t('blog.detail.relatedTitle')}
              </Heading>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <FadeIn key={p.id} delay={i * 0.08}>
                  <BlogCard
                    post={{
                      id: p.id,
                      title: p.title,
                      slug: p.slug,
                      excerpt: p.excerpt,
                      coverImage: p.coverImage,
                      publishedAt: p.publishedAt,
                    }}
                    locale={locale}
                    readMoreLabel={t('common.readMore')}
                    className="h-full"
                  />
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
