import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { AboutHero } from '@/components/sections/AboutHero';
import { Manifesto } from '@/components/sections/Manifesto';
import { Stats } from '@/components/sections/Stats';
import { Values } from '@/components/sections/Values';
import { Approach } from '@/components/sections/Approach';
import { ContactCta } from '@/components/sections/ContactCta';
import type { Locale } from '@/i18n/routing';

// Lazy-load του Timeline — μεγάλο component με Framer Motion scroll listeners.
// Χτίζεται μόνο όταν ο χρήστης κάνει scroll μέχρι εκεί.
const Timeline = dynamic(() =>
  import('@/components/sections/Timeline').then((m) => ({ default: m.Timeline })),
);

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

/**
 * Generate dynamic metadata για SEO.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('nav.about'),
    description: t('about.hero.intro'),
  };
}

/**
 * Σελίδα «Η Εταιρία» — Task 7.
 *
 * Σύνθεση:
 *   1. AboutHero    — μεγάλο editorial intro
 *   2. Manifesto    — το αφήγημα της εταιρίας με pull-quote
 *   3. Stats        — οι αριθμοί (επανάληψη από αρχική, αλλά ταιριάζει)
 *   4. Values       — 6 αξίες σε bento grid
 *   5. Timeline     — διαδραστικό χρονολόγιο 1995→2026
 *   6. Approach     — 4-βήματα μεθοδολογία
 *   7. ContactCta   — final push
 */
export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <Manifesto />
      <Stats />
      <Values />
      <Timeline />
      <Approach />
      <ContactCta />
    </>
  );
}
