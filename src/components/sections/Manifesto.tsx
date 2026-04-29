import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { Quote } from 'lucide-react';

/**
 * Manifesto — long-form editorial section.
 * Layout: αριστερά μεγάλος τίτλος + eyebrow, δεξιά τα paragraphs.
 * Ανάμεσα στα paragraphs μπαίνει ένα pull-quote με decorative quote mark.
 */
export async function Manifesto() {
  const t = await getTranslations();
  const paragraphs = t.raw('about.manifesto.paragraphs') as string[];

  return (
    <Section spacing="lg" tone="white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Sticky title column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <Eyebrow variant="green" className="mb-6">
                  {t('about.manifesto.eyebrow')}
                </Eyebrow>
              </FadeIn>
              <Heading as="h2" size="lg" flavor="wonky" className="text-brand-green">
                <FadeIn>{t('about.manifesto.heading')}</FadeIn>
              </Heading>
            </div>
          </div>

          {/* Body paragraphs */}
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-relaxed text-brand-ink/75">
              {paragraphs.map((paragraph, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <p className="text-pretty">{paragraph}</p>
                </FadeIn>
              ))}
            </div>

            {/* Pull-quote */}
            <FadeIn delay={0.5}>
              <div className="relative mt-12 rounded-3xl border border-brand-green/15 bg-brand-cream p-8 sm:p-10">
                <Quote
                  aria-hidden
                  className="absolute -left-4 -top-4 size-16 text-brand-orange"
                  fill="currentColor"
                />
                <p className="text-balance font-display text-2xl font-semibold leading-snug text-brand-green sm:text-3xl">
                  {t('about.manifesto.highlight')}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
