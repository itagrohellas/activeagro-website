import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { CropsMarquee } from '@/components/sections/CropsMarquee';
import { ValueProps } from '@/components/sections/ValueProps';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { NewsTeaser } from '@/components/sections/NewsTeaser';
import { ContactCta } from '@/components/sections/ContactCta';
import type { Locale } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Αρχική σελίδα — Task 6.
 *
 * Σύνθεση από modular sections:
 *   1. Hero            — μεγάλη τυπογραφία + CTA
 *   2. Stats           — 4 trust indicators
 *   3. CropsMarquee    — ονόματα καλλιεργειών σε scroll
 *   4. ValueProps      — 4 USPs (γιατί εμάς)
 *   5. FeaturedProducts — προϊόντα από CMS (graceful empty state)
 *   6. AboutTeaser     — η ιστορία της εταιρίας σε σύντομη μορφή
 *   7. NewsTeaser      — 3 πρόσφατα άρθρα από CMS (κρύβεται αν άδειο)
 *   8. ContactCta      — final push για επικοινωνία
 *
 * Static rendering: pre-rendered ανά locale, με stale data revalidate (Next default).
 */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <CropsMarquee />
      <ValueProps />
      <FeaturedProducts locale={locale} />
      <AboutTeaser />
      <NewsTeaser locale={locale} />
      <ContactCta />
    </>
  );
}
