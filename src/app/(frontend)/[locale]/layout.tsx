import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd, organizationLd } from '@/components/seo/JsonLd';
import { routing } from '@/i18n/routing';

/**
 * Body font — Inter Variable.
 * Μοντέρνο geometric sans, διαβάζεται άνετα σε κάθε μέγεθος, πλήρης ελληνική υποστήριξη.
 */
const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * Display font — Manrope Variable.
 * Μοντέρνο geometric sans με προσωπικότητα — friendly, slightly bouncy,
 * πλήρης ελληνική υποστήριξη. Ιδανικό για headings σε δίγλωσσο site.
 */
const manrope = Manrope({
  subsets: ['latin', 'greek'],
  variable: '--font-display',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

/**
 * Mono font — για technical χαρακτηριστικά (NPK, SKU, τιμές).
 * Δεν χρειάζεται greek subset (μόνο αριθμοί/labels εμφανίζονται mono).
 */
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ActiveAgro Α.Ε. — Λιπάσματα & Αγροτικά Εφόδια',
    template: '%s | ActiveAgro',
  },
  description:
    'Η ActiveAgro Α.Ε. εμπορεύεται λιπάσματα υψηλής ποιότητας για κάθε καλλιέργεια. Ολοκληρωμένες λύσεις θρέψης φυτών.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

/**
 * Static generation: pre-build μία version ανά locale.
 * Σε production αυτό δίνει μηδενικό overhead.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function FrontendLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Validate locale — αν κάποιος δοκιμάσει /xx redirect 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Ενεργοποιεί static rendering για το server-side i18n
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${manrope.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">
        {/* Skip-to-content για keyboard navigation (a11y) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-green focus:px-4 focus:py-2 focus:text-brand-cream"
        >
          Skip to content
        </a>

        <JsonLd data={organizationLd()} />

        <NextIntlClientProvider>
          <SmoothScrollProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
