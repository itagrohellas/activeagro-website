import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { Magnetic } from '@/components/motion/MagneticButton';
import { Phone, Mail } from 'lucide-react';

/**
 * ContactCta — η τελευταία ενότητα της αρχικής, πριν το footer.
 * Πράσινο background, μεγάλη τυπογραφία, magnetic CTA, decorative orange dot.
 */
export async function ContactCta() {
  const t = await getTranslations();

  return (
    <Section spacing="lg" tone="green" className="relative overflow-hidden">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] animate-float-slow rounded-full bg-brand-orange/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[300px] w-[300px] animate-float rounded-full bg-brand-orange/20 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <Eyebrow variant="cream" className="mb-6">
              {t('contactCta.eyebrow')}
            </Eyebrow>
          </FadeIn>

          <Heading as="h2" size="xl" flavor="wonky" className="text-brand-cream">
            <FadeIn>{t('contactCta.heading')}</FadeIn>
          </Heading>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-xl text-brand-cream/80">
              {t('contactCta.body')}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={20}>
                <Button href="/contact" variant="primary" size="lg" withArrow>
                  {t('contactCta.cta')}
                </Button>
              </Magnetic>

              <a
                href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-brand-cream/80 transition hover:text-brand-cream"
              >
                <Phone className="size-4 text-brand-orange transition group-hover:scale-110" />
                <span className="font-mono text-sm">{t('footer.phone')}</span>
              </a>

              <a
                href={`mailto:${t('footer.email')}`}
                className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-brand-cream/80 transition hover:text-brand-cream"
              >
                <Mail className="size-4 text-brand-orange transition group-hover:scale-110" />
                <span className="font-mono text-sm">{t('footer.email')}</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
