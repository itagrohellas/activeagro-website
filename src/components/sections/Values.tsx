import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { Microscope, MapPin, ShieldCheck, Leaf, GraduationCap, HeartHandshake } from 'lucide-react';

const ICONS = [Microscope, MapPin, ShieldCheck, Leaf, GraduationCap, HeartHandshake];

interface ValueItem {
  title: string;
  body: string;
}

/**
 * Values — 6 αξίες σε bento-style asymmetric grid.
 * Η δεύτερη και πέμπτη κάρτα έχουν διαφορετικό style (πράσινο fill)
 * για να σπάσει η μονοτονία.
 */
export async function Values() {
  const t = await getTranslations();
  const items = t.raw('about.values.items') as ValueItem[];

  return (
    <Section spacing="lg" tone="cream">
      <Container>
        <div className="mb-16 max-w-2xl">
          <FadeIn>
            <Eyebrow variant="orange" className="mb-6">
              {t('about.values.eyebrow')}
            </Eyebrow>
          </FadeIn>
          <Heading as="h2" size="lg" flavor="soft" className="text-brand-green">
            <FadeIn>{t('about.values.heading')}</FadeIn>
          </Heading>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((value, i) => {
            const Icon = ICONS[i] ?? Microscope;
            const isHighlight = i === 1 || i === 4; // 2η και 5η κάρτα = highlight
            return (
              <FadeIn key={value.title} delay={i * 0.08}>
                <article
                  className={
                    isHighlight
                      ? 'group relative h-full overflow-hidden rounded-3xl bg-brand-green p-8 text-brand-cream transition hover:-translate-y-1'
                      : 'group relative h-full overflow-hidden rounded-3xl bg-white p-8 text-brand-ink shadow-sm transition hover:-translate-y-1 hover:shadow-xl'
                  }
                >
                  {/* Decorative number watermark */}
                  <span
                    aria-hidden
                    className={
                      isHighlight
                        ? 'absolute -bottom-6 -right-2 font-display text-9xl font-black text-brand-cream/10'
                        : 'absolute -bottom-6 -right-2 font-display text-9xl font-black text-brand-green/5'
                    }
                  >
                    0{i + 1}
                  </span>

                  {/* Icon with rounded square background */}
                  <div
                    className={
                      isHighlight
                        ? 'mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-brand-orange/20 text-brand-orange'
                        : 'mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange'
                    }
                  >
                    <Icon className="size-6" />
                  </div>

                  <h3
                    className={
                      isHighlight
                        ? 'font-display text-2xl font-bold text-brand-cream'
                        : 'font-display text-2xl font-bold text-brand-green'
                    }
                  >
                    {value.title}
                  </h3>
                  <p
                    className={
                      isHighlight
                        ? 'mt-3 text-brand-cream/80'
                        : 'mt-3 text-brand-ink/65'
                    }
                  >
                    {value.body}
                  </p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
