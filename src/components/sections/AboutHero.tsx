import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { RevealText } from '@/components/motion/RevealText';

/**
 * AboutHero — μεγάλο editorial hero για τη σελίδα της εταιρίας.
 * Λιγότερο «marketing» από το home hero, περισσότερο storytelling.
 */
export async function AboutHero() {
  const t = await getTranslations();

  return (
    <Section spacing="xl" className="relative overflow-hidden bg-grid-pattern pt-32 sm:pt-40">
      {/* Decorative shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[20%] h-[400px] w-[400px] animate-float rounded-full bg-brand-orange/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-[500px] w-[500px] animate-float-slow rounded-full bg-brand-green/15 blur-3xl"
      />

      {/* Decorative SVG line */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[60%] w-1/2 opacity-[0.07]"
        viewBox="0 0 600 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 0 400 Q 150 200, 300 400 T 600 400"
          stroke="currentColor"
          strokeWidth="80"
          className="text-brand-green"
        />
      </svg>

      <Container className="relative">
        <FadeIn from="up">
          <Eyebrow variant="orange" className="mb-8">
            {t('about.hero.eyebrow')}
          </Eyebrow>
        </FadeIn>

        <Heading as="h1" size="2xl" flavor="wonky" className="text-brand-green">
          <RevealText text={t('about.hero.headlineLine1')} as="span" className="block" />
          <RevealText
            text={t('about.hero.headlineLine2')}
            as="span"
            delay={0.15}
            className="block italic text-brand-orange"
          />
        </Heading>

        <FadeIn delay={0.4} from="up">
          <p className="mt-12 max-w-3xl text-pretty text-xl leading-relaxed text-brand-ink/70 sm:text-2xl">
            {t('about.hero.intro')}
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
