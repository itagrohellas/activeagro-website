'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', key: 'home' as const },
  { href: '/about', key: 'about' as const },
  { href: '/products', key: 'products' as const },
  { href: '/blog', key: 'blog' as const },
  { href: '/contact', key: 'contact' as const },
];

/**
 * Header — sticky με scroll-aware συμπεριφορά:
 *  - Πάνω-πάνω: μεγάλο, διαφανές
 *  - Μετά το scroll: συμπιέζεται, αποκτά λευκό background + shadow
 *  - Scroll προς τα κάτω: κρύβεται. Scroll προς τα πάνω: εμφανίζεται.
 *
 * Mobile: hamburger button που ανοίγει full-screen overlay menu.
 */
export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 32);
    // Hide όταν κάνεις scroll-down μετά το hero, εμφάνιση όταν κάνεις scroll-up
    if (latest > 200 && latest > previous) setHidden(true);
    else setHidden(false);
  });

  // Κλείσε το mobile menu αν αλλάξει η σελίδα
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll όταν είναι ανοιχτό το mobile menu
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] as const }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled ? 'py-2' : 'py-4 sm:py-6',
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'flex items-center justify-between gap-4 rounded-full transition-all duration-300',
              scrolled
                ? 'border border-brand-green/10 bg-white/80 px-3 py-2 shadow-[0_8px_30px_rgba(4,84,43,0.08)] backdrop-blur-xl sm:px-4'
                : 'px-2 py-2',
            )}
          >
            {/* Logo */}
            <Link href="/" aria-label="ActiveAgro" className="flex items-center">
              <Logo
                width={scrolled ? 130 : 160}
                href={false}
                className="transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    className={cn(
                      'group relative px-4 py-2 text-sm font-medium transition',
                      isActive ? 'text-brand-green' : 'text-brand-ink/70 hover:text-brand-green',
                    )}
                  >
                    <span className="relative">
                      {t(`nav.${link.key}`)}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-brand-orange transition-all duration-300',
                          isActive ? 'w-full' : 'w-0 group-hover:w-full',
                        )}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side: locale switcher + CTA + mobile menu trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <LocaleSwitcher />

              <div className="hidden lg:block">
                <Button href="/contact" variant="primary" size="sm" withArrow>
                  {t('header.contactCta')}
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t('nav.menu')}
                className="flex size-11 items-center justify-center rounded-full border border-brand-green/15 bg-white/60 backdrop-blur transition hover:border-brand-green hover:bg-brand-green hover:text-brand-cream lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
