'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link2, Check } from 'lucide-react';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { cn } from '@/lib/utils';

interface SocialShareProps {
  url: string;
  title: string;
}

/**
 * SocialShare — εμφανίζει buttons για X, Facebook, LinkedIn + copy link.
 * Όλα ανοίγουν σε popup window εκτός από το copy που κάνει clipboard write.
 */
export function SocialShare({ url, title }: SocialShareProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      platform: 'x' as const,
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      platform: 'facebook' as const,
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      platform: 'linkedin' as const,
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select-and-prompt fallback could go here
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-brand-ink/50">
        {t('blog.detail.share')}
      </span>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('blog.detail.shareOn', { platform: link.label })}
            className="flex size-10 items-center justify-center rounded-full border border-brand-green/15 bg-white text-brand-green transition hover:-translate-y-0.5 hover:border-brand-orange hover:bg-brand-orange hover:text-white"
          >
            <SocialIcon platform={link.platform} className="size-4" />
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? t('blog.detail.copied') : t('blog.detail.copyLink')}
          className={cn(
            'flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition',
            copied
              ? 'border-brand-green bg-brand-green text-brand-cream'
              : 'border-brand-green/15 bg-white text-brand-green hover:border-brand-orange hover:bg-brand-orange hover:text-white',
          )}
        >
          {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
          {copied ? t('blog.detail.copied') : t('blog.detail.copyLink')}
        </button>
      </div>
    </div>
  );
}
