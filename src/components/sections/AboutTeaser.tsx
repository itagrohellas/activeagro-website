import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';

/**
 * AboutTeaser — short intro με split layout.
 * Αριστερά: μεγάλο decorative number + τίτλος + κείμενο
 * Δεξιά: graphical placeholder (ένα γραφιστικό block με patterns).
 *
 * Όταν στο Task 12 ο πελάτης ανεβάσει εικόνα στο SiteSettings ή στη "About" page,
 * την αντικαθιστούμε με την πραγματική.
 */
export async function AboutTeaser() {
  const t = await getTranslations();

  return (
    <Section spacing="lg" tone="white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-7">
            <FadeIn>
              <Eyebrow variant="green" className="mb-6">
                {t('aboutTeaser.eyebrow')}
              </Eyebrow>
            </FadeIn>
            <Heading as="h2" size="lg" flavor="wonky" className="text-brand-green">
              <FadeIn>{t('aboutTeaser.heading')}</FadeIn>
            </Heading>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-brand-ink/70">
                {t('aboutTeaser.body')}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-10">
                <Button href="/about" variant="secondary" withArrow>
                  {t('aboutTeaser.cta')}
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Graphic placeholder */}
          <div className="lg:col-span-5">
            <FadeIn from="right">
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl bg-brand-green">
                {/* Repeating decorative pattern */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 25% 25%, rgba(244,129,32,0.6) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(244,129,32,0.4) 0%, transparent 50%)',
                  }}
                />
                {/* Decorative SVG */}
                <svg
                  className="absolute inset-0 size-full"
                  viewBox="0 0 400 500"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <circle cx="100" cy="100" r="80" fill="rgba(244,129,32,0.15)" />
                  <circle cx="320" cy="380" r="120" fill="rgba(244,129,32,0.1)" />
                  <circle cx="200" cy="250" r="40" fill="rgba(255,255,255,0.05)" />
                </svg>

                {/* "Since 1995" badge */}
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <p className="font-mono text-xs uppercase tracking-widest text-brand-cream/60">
                    Est. 1995
                  </p>
                  <p className="mt-2 font-display text-display-md font-extrabold leading-none text-brand-cream display-tight">
                    30
                    <span className="font-display text-2xl text-brand-orange">+</span>
                  </p>
                  <p className="mt-2 text-brand-cream/80">
                    χρόνια στην υπηρεσία του Έλληνα παραγωγού
                  </p>
                </div>

                {/* Floating leaf accent */}
                <div className="absolute right-8 top-8 animate-float">
                  <svg className="size-20 text-brand-orange" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3c.5.12 1 .23 1.5.23 7 0 11.45-3.6 13.83-9.07-.18-.5-.27-1.07-.43-1.6C20.18 6.36 17 8 17 8z" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
