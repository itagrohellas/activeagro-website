import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';
import { Phone, Mail, MapPin, Sprout } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/motion/Marquee';
import { SocialIcon, type SocialPlatform } from '@/components/ui/SocialIcon';

const NAV_LINKS = [
  { href: '/', key: 'home' as const },
  { href: '/about', key: 'about' as const },
  { href: '/products', key: 'products' as const },
  { href: '/blog', key: 'blog' as const },
  { href: '/contact', key: 'contact' as const },
];

const LEGAL_LINKS = [
  { href: '/privacy', key: 'privacy' as const },
  { href: '/terms', key: 'terms' as const },
  { href: '/cookies', key: 'cookies' as const },
];

const SOCIAL_LINKS: { href: string; platform: SocialPlatform; label: string }[] = [
  { href: 'https://facebook.com/', platform: 'facebook', label: 'Facebook' },
  { href: 'https://instagram.com/', platform: 'instagram', label: 'Instagram' },
  { href: 'https://linkedin.com/', platform: 'linkedin', label: 'LinkedIn' },
  { href: 'https://youtube.com/', platform: 'youtube', label: 'YouTube' },
];

/**
 * Footer — multi-section footer με tagline marquee, brand block,
 * navigation, legal, και contact info.
 *
 * Σημ.: Στο Task 12 τα στοιχεία επικοινωνίας θα τραβιούνται από το
 * Payload SiteSettings global, αντί από static translations.
 */
export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-green text-brand-cream">
      {/* Tagline marquee */}
      <div className="border-b border-brand-cream/10 py-8">
        <Marquee speed="slow">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-6 font-display text-display-md font-black italic text-brand-cream/15"
            >
              {t('footer.tagline')}
              <Sprout className="size-8 text-brand-orange/60" />
            </span>
          ))}
        </Marquee>
      </div>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Logo variant="full" tone="light" width={170} href="/" />
            <p className="mt-6 max-w-sm text-balance text-brand-cream/70">
              {t('footer.description')}
            </p>

            {/* Social */}
            <div className="mt-8 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-brand-cream/15 bg-white/5 transition hover:-translate-y-0.5 hover:border-brand-orange hover:bg-brand-orange hover:text-brand-cream"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-brand-cream/80 transition hover:text-brand-cream"
                  >
                    <span className="relative">
                      {t(`nav.${link.key}`)}
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-brand-orange transition-all group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-brand-cream/80 transition hover:text-brand-cream"
                  >
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-3 text-sm text-brand-cream/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange" />
                <span>{t('footer.address')}</span>
              </li>
              <li>
                <a
                  href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
                  className="flex items-center gap-2 transition hover:text-brand-cream"
                >
                  <Phone className="size-4 text-brand-orange" />
                  {t('footer.phone')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="flex items-center gap-2 transition hover:text-brand-cream"
                >
                  <Mail className="size-4 text-brand-orange" />
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-cream/10 pt-8 text-sm text-brand-cream/50 sm:flex-row">
          <p>
            © {year} ActiveAgro Α.Ε. — {t('footer.rights')}
          </p>
          <p className="font-mono text-xs">
            {/* /admin είναι το Payload panel — όχι localized route, χρησιμοποιούμε regular Next Link */}
            <NextLink
              href="/admin"
              className="opacity-60 transition hover:text-brand-orange hover:opacity-100"
            >
              CMS
            </NextLink>
          </p>
        </div>
      </Container>
    </footer>
  );
}
