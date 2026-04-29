import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';
import { RevealText } from '@/components/motion/RevealText';
import { Magnetic } from '@/components/motion/MagneticButton';
import { ArrowDown } from 'lucide-react';
import { getSiteSettings, getMediaUrl } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

/**
 * Hero — η κορυφαία ενότητα της αρχικής.
 *
 * Editorial layout: μεγάλη τυπογραφία, scroll-triggered word reveal,
 * μαγνητικό CTA, parallax-style decorative blobs.
 *
 * Background: Αν ο διαχειριστής έχει ανεβάσει `heroImage` στο SiteSettings,
 * χρησιμοποιείται αυτή με dark overlay για αναγνωσιμότητα. Αλλιώς δείχνει
 * τα default decorative blobs.
 */
export async function Hero() {
  const locale = (await getLocale()) as Locale;
  const [t, settings] = await Promise.all([getTranslations(), getSiteSettings(locale)]);
  const heroImageUrl = getMediaUrl((settings as { heroImage?: unknown })?.heroImage, 'desktop');

  return (
    <Section
      spacing="xl"
      className="relative overflow-hidden bg-grid-pattern pt-32 sm:pt-40"
    >
      {/* Background image (αν υπάρχει) */}
      {heroImageUrl && (
        <>
          <Image
            src={heroImageUrl}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient overlay για αναγνωσιμότητα: από αριστερά cream→διάφανο, από κάτω σκούρο→διάφανο */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-brand-cream/95 via-brand-cream/70 to-brand-cream/30"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-brand-cream/60 via-transparent to-transparent"
          />
        </>
      )}

      {/* Decorative blobs (πιο διακριτικά αν υπάρχει image) */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -left-40 top-20 h-[600px] w-[600px] animate-float rounded-full bg-brand-green/15 blur-3xl ${heroImageUrl ? 'opacity-40' : ''}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-40 bottom-10 h-[600px] w-[600px] animate-float-slow rounded-full bg-brand-orange/20 blur-3xl ${heroImageUrl ? 'opacity-40' : ''}`}
      />

      <Container className="relative">
        <div className="max-w-5xl">
          <FadeIn from="up">
            <Eyebrow variant="orange" className="mb-8">
              {t('hero.eyebrow')}
            </Eyebrow>
          </FadeIn>

          <Heading as="h1" size="2xl" flavor="wonky" className="text-brand-green">
            <RevealText text={t('hero.headlineLine1')} as="span" className="block" />
            <RevealText
              text={t('hero.headlineLine2')}
              as="span"
              delay={0.15}
              className="block text-brand-orange"
            />
          </Heading>

          <FadeIn delay={0.4} from="up">
            <p className="mt-8 max-w-2xl text-pretty text-xl text-brand-ink/80 sm:text-2xl">
              {t('hero.subheading')}
            </p>
          </FadeIn>

          <FadeIn delay={0.6} from="up">
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Magnetic strength={15}>
                <Button variant="primary" size="lg" withArrow href="/products">
                  {t('hero.ctaPrimary')}
                </Button>
              </Magnetic>
              <Button variant="ghost" size="lg" href="/about">
                {t('hero.ctaSecondary')}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={1} from="up" className="mt-24">
            <a
              href="#stats"
              className="group inline-flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-brand-green/70 transition hover:text-brand-green"
            >
              {t('hero.scroll')}
              <span className="flex size-10 items-center justify-center rounded-full border border-brand-green/30 bg-white/40 backdrop-blur transition group-hover:bg-brand-green group-hover:text-brand-cream">
                <ArrowDown className="size-4 animate-bounce-soft" />
              </span>
            </a>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
