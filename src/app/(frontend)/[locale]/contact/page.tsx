import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { FadeIn } from '@/components/motion/FadeIn';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactForm } from '@/components/contact/ContactForm';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('nav.contact'),
    description: t('contact.hero.intro'),
  };
}

/**
 * Contact page — Task 11.
 *
 * Layout:
 *  - Hero
 *  - Split: ContactInfo αριστερά (από SiteSettings) + ContactForm δεξιά
 */
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      {/* HERO */}
      <Section spacing="md" className="relative overflow-hidden bg-grid-pattern pt-32 sm:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[400px] w-[400px] animate-float-slow rounded-full bg-brand-orange/15 blur-3xl"
        />
        <Container className="relative">
          <FadeIn from="up">
            <Eyebrow variant="green" className="mb-6">
              {t('contact.hero.eyebrow')}
            </Eyebrow>
          </FadeIn>
          <Heading as="h1" size="xl" flavor="wonky" className="max-w-4xl text-brand-green">
            <FadeIn>{t('contact.hero.heading')}</FadeIn>
          </Heading>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-pretty text-lg text-brand-ink/70 sm:text-xl">
              {t('contact.hero.intro')}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* CONTENT */}
      <Section spacing="lg" tone="cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Contact info */}
            <div className="lg:col-span-5">
              <FadeIn>
                <ContactInfo locale={locale} />
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <div className="rounded-4xl border border-brand-green/10 bg-white p-6 shadow-sm sm:p-10">
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
