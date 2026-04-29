import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FadeIn } from '@/components/motion/FadeIn';

interface StatItem {
  value: string;
  label: string;
}

/**
 * Stats — trust-indicators row με μεγάλους αριθμούς.
 * Layout: 4 columns σε desktop, 2x2 σε tablet, stacked σε mobile.
 */
export async function Stats() {
  const t = await getTranslations();
  const items = t.raw('stats.items') as StatItem[];

  return (
    <Section id="stats" spacing="md" tone="white" className="border-y border-brand-green/10">
      <Container>
        <FadeIn>
          <Eyebrow variant="orange" className="mb-10">
            {t('stats.eyebrow')}
          </Eyebrow>
        </FadeIn>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {items.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="group relative">
                <p className="font-display text-display-md font-extrabold leading-none text-brand-green tabular-nums sm:text-display-lg display-tight">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm uppercase tracking-wider text-brand-ink/60 sm:text-base">
                  {stat.label}
                </p>
                {/* Underline */}
                <span className="mt-4 block h-1 w-12 rounded-full bg-brand-orange transition-all duration-500 group-hover:w-24" />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
