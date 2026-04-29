'use client';

import { useActionState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm, type ContactFormState } from '@/app/actions/contact';
import { Magnetic } from '@/components/motion/MagneticButton';
import { cn } from '@/lib/utils';

/**
 * ContactForm — client form με progressive enhancement.
 *
 * Χρησιμοποιεί useActionState (React 19) για πλήρη integration
 * με το server action. Δουλεύει και χωρίς JavaScript (pure HTML form post).
 *
 * Features:
 *  - Validation feedback ανά πεδίο
 *  - Loading state στο button (spinner)
 *  - Success state αντικαθιστά τη φόρμα
 *  - Error banner στην κορυφή
 *  - Honeypot field (κρυμμένο, για spam)
 */
export function ContactForm() {
  const t = useTranslations('contact.form');
  const locale = useLocale();

  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { status: 'idle' },
  );

  // Success state — εμφανίζουμε thank-you αντί για φόρμα
  if (state.status === 'success') {
    return (
      <div className="rounded-4xl border border-brand-green/15 bg-white p-8 text-center sm:p-12">
        <div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-green text-brand-cream">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-6 font-display text-3xl font-bold text-brand-green">
          {t('successTitle')}
        </h3>
        <p className="mt-3 text-brand-ink/70">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — bots συμπληρώνουν όλα τα fields, ανθρώπινα μάτια το παραβλέπουν */}
      <div aria-hidden className="absolute left-[-10000px]">
        <label>
          Company (δεν συμπληρώνεται):
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
        {t('title')}
      </h2>
      <p className="-mt-3 text-sm text-brand-ink/60">{t('subtitle')}</p>

      {/* Error banner */}
      {state.status === 'error' && state.message === 'server_error' && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <div>
            <p className="font-semibold">{t('errorTitle')}</p>
            <p className="mt-1 text-red-700">{t('errorBody')}</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="name"
          label={t('name')}
          placeholder={t('namePlaceholder')}
          required
          error={state.fieldErrors?.name && t(`errors.${state.fieldErrors.name}` as 'errors.required')}
        />
        <Field
          name="email"
          label={t('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          required
          error={state.fieldErrors?.email && t(`errors.${state.fieldErrors.email}` as 'errors.required')}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="phone"
          label={t('phone')}
          type="tel"
          placeholder={t('phonePlaceholder')}
        />
        <Field
          name="subject"
          label={t('subject')}
          placeholder={t('subjectPlaceholder')}
          required
          error={state.fieldErrors?.subject && t(`errors.${state.fieldErrors.subject}` as 'errors.required')}
        />
      </div>

      <Field
        name="message"
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        required
        textarea
        error={state.fieldErrors?.message && t(`errors.${state.fieldErrors.message}` as 'errors.required')}
      />

      {/* Consent */}
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 size-4 rounded border-brand-green/30 text-brand-orange focus:ring-2 focus:ring-brand-orange/30"
        />
        <span className="flex-1 text-brand-ink/70">{t('consent')}</span>
      </label>
      {state.fieldErrors?.consent && (
        <p className="-mt-3 text-xs text-red-600">{t(`errors.${state.fieldErrors.consent}` as 'errors.required')}</p>
      )}

      {/* Submit */}
      <Magnetic strength={10}>
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            'group inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-base font-medium tracking-tight text-white shadow-[0_8px_30px_rgb(244,129,32,0.25)] transition-all duration-300',
            'hover:-translate-y-0.5 hover:bg-brand-orange-500 hover:shadow-[0_12px_40px_rgb(244,129,32,0.35)]',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/30',
            'disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0',
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            <>
              <Send className="size-4" />
              {t('submit')}
            </>
          )}
        </button>
      </Magnetic>
    </form>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  error?: string;
}

function Field({ name, label, type = 'text', placeholder, required, textarea, error }: FieldProps) {
  const id = `cf-${name}`;
  const className = cn(
    'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-brand-ink/40 transition focus:outline-none focus:ring-2',
    error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
      : 'border-brand-green/15 focus:border-brand-orange focus:ring-brand-orange/20',
  );
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-widest text-brand-ink/50"
      >
        {label}
        {required && <span className="ml-1 text-brand-orange">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={cn(className, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={className}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
