import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';

/**
 * ProductsHero — μικρότερο hero από το home, για να δοθεί χώρος στο grid.
 */
export async function ProductsHero() {
  const t = await getTranslations();

  return (
    <Section spacing="md" className="relative overflow-hidden bg-grid-pattern pt-32 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] animate-float-slow rounded-full bg-brand-orange/15 blur-3xl"
      />
      <Container className="relative">
        <FadeIn from="up">
          <Eyebrow variant="green" className="mb-6">
            {t('products.hero.eyebrow')}
          </Eyebrow>
        </FadeIn>
        <Heading as="h1" size="xl" flavor="wonky" className="max-w-4xl text-brand-green">
          <FadeIn>{t('products.hero.heading')}</FadeIn>
        </Heading>
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-brand-ink/70 sm:text-xl">
            {t('products.hero.intro')}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
