import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { BlogCard } from '@/components/blog/BlogCard';
import { ContactCta } from '@/components/sections/ContactCta';
import { getPosts } from '@/lib/queries';
import { Newspaper } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('blog.hero.heading'),
    description: t('blog.hero.intro'),
  };
}

/**
 * Blog list page — Task 10.
 *
 * Layout:
 *  - Hero
 *  - Featured (πρώτο post σε μεγάλη κάρτα)
 *  - Grid (υπόλοιπα posts σε 3 columns)
 *  - Empty state αν δεν υπάρχουν posts
 */
export default async function BlogListPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, postsResult] = await Promise.all([getTranslations(), getPosts(locale, { limit: 13 })]);

  const posts = postsResult.docs;
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* HERO */}
      <Section spacing="md" className="relative overflow-hidden bg-grid-pattern pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[400px] w-[400px] animate-float-slow rounded-full bg-brand-orange/15 blur-3xl"
        />
        <Container className="relative">
          <FadeIn from="up">
            <Eyebrow variant="green" className="mb-6">
              {t('blog.hero.eyebrow')}
            </Eyebrow>
          </FadeIn>
          <Heading as="h1" size="xl" flavor="wonky" className="max-w-4xl text-brand-green">
            <FadeIn>{t('blog.hero.heading')}</FadeIn>
          </Heading>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-brand-ink/70 sm:text-xl">
              {t('blog.hero.intro')}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* CONTENT */}
      <Section spacing="md" tone="cream" className="pb-24">
        <Container>
          {posts.length > 0 ? (
            <div className="space-y-10">
              {/* Featured */}
              {featured && (
                <FadeIn>
                  <BlogCard
                    post={{
                      id: featured.id,
                      title: featured.title,
                      slug: featured.slug,
                      excerpt: featured.excerpt,
                      coverImage: featured.coverImage,
                      publishedAt: featured.publishedAt,
                    }}
                    locale={locale}
                    variant="featured"
                    readMoreLabel={t('common.readMore')}
                    priority
                  />
                </FadeIn>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <FadeIn key={post.id} delay={Math.min(i, 6) * 0.05}>
                      <BlogCard
                        post={{
                          id: post.id,
                          title: post.title,
                          slug: post.slug,
                          excerpt: post.excerpt,
                          coverImage: post.coverImage,
                          publishedAt: post.publishedAt,
                        }}
                        locale={locale}
                        readMoreLabel={t('common.readMore')}
                        className="h-full"
                      />
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <FadeIn>
              <div className="rounded-4xl border-2 border-dashed border-brand-green/20 bg-white/40 p-12 text-center">
                <Newspaper className="mx-auto size-12 text-brand-green/40" />
                <h3 className="mt-4 font-display text-2xl font-bold text-brand-green">
                  {t('blog.empty.title')}
                </h3>
                <p className="mt-2 text-brand-ink/60">{t('blog.empty.body')}</p>
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
