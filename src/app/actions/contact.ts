'use server';

import { headers } from 'next/headers';
import { getPayload } from '@/lib/payload';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message' | 'consent', string>>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * submitContactForm — server action που τρέχει όταν ο χρήστης πατήσει submit.
 *
 * Βήματα:
 *  1. Validation πεδίων (manual — τα ζητούμενα είναι λίγα, zod overkill)
 *  2. Honeypot check — αν συμπληρώθηκε από bot, σιωπηρά γυρνάμε success
 *  3. Insert στο ContactSubmissions collection
 *  4. (Προαιρετικά) Email μέσω SMTP αν έχει ρυθμιστεί
 *  5. Επιστροφή κατάστασης (success/error) στο form για UX feedback
 */
export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Honeypot — bot detection. Αν συμπληρώθηκε, σιωπηρά "success" χωρίς να αποθηκεύσουμε τίποτα.
  const honeypot = formData.get('company');
  if (honeypot) {
    return { status: 'success', message: 'silent' };
  }

  const data = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    subject: String(formData.get('subject') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    consent: formData.get('consent') === 'on',
    locale: String(formData.get('locale') ?? 'el'),
  };

  // 2. Validation
  const fieldErrors: ContactFormState['fieldErrors'] = {};
  if (!data.name) fieldErrors.name = 'required';
  if (!data.email) fieldErrors.email = 'required';
  else if (!EMAIL_REGEX.test(data.email)) fieldErrors.email = 'email';
  if (!data.subject) fieldErrors.subject = 'required';
  if (!data.message) fieldErrors.message = 'required';
  else if (data.message.length < 10) fieldErrors.message = 'minLength';
  if (!data.consent) fieldErrors.consent = 'consent';

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors };
  }

  // 3. Read user-agent for spam analysis later
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') ?? '';

  // 4. Insert in Payload
  try {
    const payload = await getPayload();
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        subject: data.subject,
        message: data.message,
        locale: data.locale,
        userAgent,
        handled: false,
      },
    });

    // 5. Send email if SMTP is configured (best-effort, don't fail submission if email fails)
    await sendNotificationEmail(data).catch((err) => {
      console.error('[contact] email send failed:', err);
    });

    return { status: 'success' };
  } catch (error) {
    console.error('[contact] submission failed:', error);
    return { status: 'error', message: 'server_error' };
  }
}

/**
 * sendNotificationEmail — προαιρετικό email notification.
 * Στέλνει μόνο αν τα SMTP env vars υπάρχουν. Αλλιώς σιωπηρά skip.
 *
 * Χρησιμοποιεί το Payload's built-in email αν έχει ρυθμιστεί,
 * ή απλώς logs (για τώρα — full SMTP integration στο Task 12).
 */
async function sendNotificationEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
}) {
  if (!process.env.SMTP_HOST || !process.env.CONTACT_TO_EMAIL) {
    // Δεν έχει ρυθμιστεί SMTP — απλώς log
    console.log('[contact] new submission (no SMTP configured):', {
      from: data.email,
      subject: data.subject,
    });
    return;
  }

  // SMTP integration με nodemailer — θα προστεθεί στο Task 12
  // Για τώρα, log only.
  console.log('[contact] would send email to', process.env.CONTACT_TO_EMAIL);
}
