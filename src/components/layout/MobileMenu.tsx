'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/ui/Logo';
import { LocaleSwitcher } from '@/components/ui/LocaleSwitcher';
import { Button } from '@/components/ui/Button';
import { X, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  onClose: () => void;
}

const NAV_LINKS = [
  { href: '/', key: 'home' as const },
  { href: '/about', key: 'about' as const },
  { href: '/products', key: 'products' as const },
  { href: '/blog', key: 'blog' as const },
  { href: '/contact', key: 'contact' as const },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, when: 'beforeChildren' },
  },
  exit: { opacity: 0, transition: { duration: 0.25, when: 'afterChildren' } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

/**
 * MobileMenu — full-screen overlay για mobile navigation.
 * Τρέχει stagger animation στα links + CTA + contact info.
 */
export function MobileMenu({ onClose }: MobileMenuProps) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col bg-brand-green text-brand-cream"
    >
      {/* Top bar — logo + close */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <Logo variant="full" tone="light" width={140} href="/" />
        <div className="flex items-center gap-3">
          <LocaleSwitcher variant="light" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.close')}
            className="flex size-11 items-center justify-center rounded-full border border-brand-cream/20 bg-white/5 transition hover:border-brand-orange hover:bg-brand-orange"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <motion.div
        variants={containerVariants}
        className="flex flex-1 flex-col justify-between gap-12 px-6 py-8 sm:px-10"
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <motion.div key={link.key} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-baseline gap-4 py-3 font-display text-5xl font-extrabold tracking-tight transition sm:text-6xl',
                    isActive ? 'text-brand-orange' : 'text-brand-cream hover:text-brand-orange',
                  )}
                >
                  <span className="font-mono text-sm font-medium tabular-nums opacity-60">
                    0{i + 1}
                  </span>
                  <span className="relative">
                    {t(`nav.${link.key}`)}
                    <span className="absolute -bottom-1 left-0 h-1 w-0 rounded-full bg-brand-orange transition-all duration-500 group-hover:w-full" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer block: CTA + contact info */}
        <motion.div variants={itemVariants} className="space-y-6 border-t border-brand-cream/15 pt-6">
          <Button href="/contact" variant="primary" size="lg" withArrow className="w-full sm:w-auto">
            {t('header.contactCta')}
          </Button>

          <div className="grid gap-3 text-sm text-brand-cream/70 sm:grid-cols-3">
            <a
              href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
              className="flex items-center gap-2 transition hover:text-brand-cream"
            >
              <Phone className="size-4 text-brand-orange" />
              {t('footer.phone')}
            </a>
            <a
              href={`mailto:${t('footer.email')}`}
              className="flex items-center gap-2 transition hover:text-brand-cream"
            >
              <Mail className="size-4 text-brand-orange" />
              {t('footer.email')}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-brand-orange" />
              <span className="line-clamp-2">{t('footer.address')}</span>
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
