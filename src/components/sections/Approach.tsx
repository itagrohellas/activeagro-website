import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';

interface ApproachStep {
  step: string;
  title: string;
  body: string;
}

/**
 * Approach — η μεθοδολογία της εταιρίας σε 4 βήματα.
 * Layout: αριστερά τίτλος, δεξιά τα 4 βήματα ως χρονολογική λίστα.
 */
export async function Approach() {
  const t = await getTranslations();
  const steps = t.raw('about.approach.steps') as ApproachStep[];

  return (
    <Section spacing="lg" tone="sky">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <Eyebrow variant="orange" className="mb-6">
                  {t('about.approach.eyebrow')}
                </Eyebrow>
              </FadeIn>
              <Heading as="h2" size="lg" flavor="soft" className="text-brand-green">
                <FadeIn>{t('about.approach.heading')}</FadeIn>
              </Heading>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol className="space-y-8">
              {steps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 0.1}>
                  <li className="group relative grid grid-cols-[auto_1fr] gap-6 rounded-3xl border border-brand-green/10 bg-white p-6 transition hover:border-brand-orange/30 hover:shadow-lg sm:gap-8 sm:p-8">
                    {/* Step number */}
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-brand-green text-brand-cream sm:size-20">
                      <span className="font-mono text-xl font-bold tabular-nums sm:text-2xl">
                        {step.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-brand-ink/70">{step.body}</p>
                    </div>

                    {/* Decorative connector line (desktop) */}
                    {i < steps.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute -bottom-4 left-12 h-4 w-0.5 bg-brand-green/20 sm:left-14"
                      />
                    )}
                  </li>
                </FadeIn>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
