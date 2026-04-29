import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { Sparkles, Sprout, Leaf, Beaker } from 'lucide-react';

const FEATURES = [
  { icon: Beaker, key: 'scientific' as const },
  { icon: Leaf, key: 'ecological' as const },
  { icon: Sprout, key: 'everyCrop' as const },
  { icon: Sparkles, key: 'support' as const },
];

/**
 * ValueProps — 4 διαφοροποιητικά πλεονεκτήματα της εταιρίας.
 * Glass cards με icon + τίτλο + κείμενο, hover lift effect.
 */
export async function ValueProps() {
  const t = await getTranslations();

  return (
    <Section spacing="lg" tone="cream">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <FadeIn>
              <Eyebrow variant="orange" className="mb-6">
                {t('features.eyebrow')}
              </Eyebrow>
            </FadeIn>
            <Heading as="h2" size="lg" flavor="soft" className="text-brand-green">
              <FadeIn>{t('features.heading')}</FadeIn>
            </Heading>
            <FadeIn delay={0.2}>
              <p className="mt-6 text-lg text-brand-ink/70">{t('features.body')}</p>
            </FadeIn>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {FEATURES.map((feature, i) => (
              <FadeIn key={feature.key} delay={i * 0.1}>
                <div className="glass-card group h-full p-6 transition hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-xl">
                  <feature.icon className="size-8 text-brand-orange transition group-hover:scale-110 group-hover:rotate-[-6deg]" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-brand-green">
                    {t(`features.items.${feature.key}.title`)}
                  </h3>
                  <p className="mt-2 text-brand-ink/65">
                    {t(`features.items.${feature.key}.body`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
