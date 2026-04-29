import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { getLatestPosts, getMediaUrl } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface NewsTeaserProps {
  locale: Locale;
}

/**
 * NewsTeaser — εμφανίζει 3 πρόσφατα άρθρα. Αν δεν υπάρχουν, η ενότητα κρύβεται.
 */
export async function NewsTeaser({ locale }: NewsTeaserProps) {
  const [t, posts] = await Promise.all([getTranslations(), getLatestPosts(locale, 3)]);

  // Αν δεν υπάρχουν άρθρα, κρύβουμε την ενότητα εντελώς
  if (posts.length === 0) return null;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Section spacing="lg" tone="sky">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <FadeIn>
              <Eyebrow variant="orange" className="mb-4">
                {t('news.eyebrow')}
              </Eyebrow>
            </FadeIn>
            <Heading as="h2" size="lg" flavor="soft" className="text-brand-green">
              <FadeIn>{t('news.heading')}</FadeIn>
            </Heading>
          </div>

          <FadeIn>
            <Button href="/blog" variant="ghost" size="md" withArrow>
              {t('news.viewAll')}
            </Button>
          </FadeIn>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const imageUrl = getMediaUrl(post.coverImage, 'card');
            const publishedAt = post.publishedAt ? new Date(post.publishedAt) : null;
            return (
              <FadeIn key={post.id} delay={i * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-brand-green/10">
                        <span className="font-display text-5xl font-black text-brand-green/20">
                          AA
                        </span>
                      </div>
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
                      {t('common.readMore')}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
