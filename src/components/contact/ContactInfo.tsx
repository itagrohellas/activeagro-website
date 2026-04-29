import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { getSiteSettings } from '@/lib/queries';
import type { Locale } from '@/i18n/routing';

interface ContactInfoProps {
  locale: Locale;
}

interface BusinessHour {
  days: string;
  hours: string;
}

/**
 * ContactInfo — εμφανίζει τα στοιχεία επικοινωνίας από το SiteSettings global,
 * με fallback σε translations αν δεν έχει ρυθμιστεί ακόμα από τον admin.
 */
export async function ContactInfo({ locale }: ContactInfoProps) {
  const [t, settings] = await Promise.all([getTranslations(), getSiteSettings(locale)]);

  // Fallbacks από translations αν δεν υπάρχει SiteSettings
  const address = settings?.address ?? t('footer.address');
  const phone = settings?.phone ?? t('footer.phone');
  const email = settings?.email ?? t('footer.email');
  const businessHours = (settings?.businessHours as BusinessHour[] | null) ?? null;
  const mapEmbedUrl = settings?.mapEmbedUrl as string | undefined;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
        {t('contact.info.title')}
      </h2>

      <ul className="space-y-5">
        {address && (
          <InfoRow
            icon={MapPin}
            label={t('contact.info.address')}
            value={address}
          />
        )}
        {phone && (
          <InfoRow
            icon={Phone}
            label={t('contact.info.phone')}
            value={phone}
            href={`tel:${phone.replace(/\s/g, '')}`}
          />
        )}
        {email && (
          <InfoRow
            icon={Mail}
            label={t('contact.info.email')}
            value={email}
            href={`mailto:${email}`}
          />
        )}
        {businessHours && businessHours.length > 0 && (
          <li>
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                <Clock className="size-5" />
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-ink/50">
                  {t('contact.info.hours')}
                </p>
                <ul className="mt-2 space-y-1">
                  {businessHours.map((bh, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-brand-ink/80">{bh.days}</span>
                      <span className="font-mono tabular-nums text-brand-green">{bh.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        )}
      </ul>

      {/* Google Maps embed */}
      {mapEmbedUrl && (
        <div className="overflow-hidden rounded-3xl border border-brand-green/15 shadow-sm">
          <iframe
            src={mapEmbedUrl}
            title="Map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full"
          />
        </div>
      )}
    </div>
  );
}

interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}

function InfoRow({ icon: Icon, label, value, href }: InfoRowProps) {
  const content = (
    <>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange transition group-hover:bg-brand-orange group-hover:text-white">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-ink/50">
          {label}
        </p>
        <p className="mt-1 text-brand-ink">{value}</p>
      </div>
    </>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-start gap-4">
          {content}
        </a>
      ) : (
        <div className="flex items-start gap-4">{content}</div>
      )}
    </li>
  );
}
