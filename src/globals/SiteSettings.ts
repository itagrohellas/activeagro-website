import type { GlobalConfig } from 'payload';

/**
 * SiteSettings — global ρυθμίσεις site (μία εγγραφή).
 * Στοιχεία επικοινωνίας, social, navigation labels, footer.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { el: 'Ρυθμίσεις Site', en: 'Site Settings' },
  admin: {
    group: { el: 'Σύστημα', en: 'System' },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─────────────── ΣΤΟΙΧΕΙΑ ΕΤΑΙΡΙΑΣ ───────────────
        {
          label: { el: 'Στοιχεία Εταιρίας', en: 'Company Info' },
          fields: [
            {
              name: 'companyName',
              label: { el: 'Επωνυμία', en: 'Company name' },
              type: 'text',
              defaultValue: 'ActiveAgro Α.Ε.',
            },
            {
              name: 'tagline',
              label: { el: 'Slogan / Tagline', en: 'Slogan / Tagline' },
              type: 'text',
              localized: true,
            },
            {
              name: 'description',
              label: { el: 'Σύντομη περιγραφή εταιρίας', en: 'Company short description' },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'heroImage',
              label: { el: 'Εικόνα φόντου Hero (αρχική)', en: 'Hero background image (homepage)' },
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Προαιρετική εικόνα φόντου για την αρχική σελίδα (π.χ. χωράφι βαμβακιού). Συνιστάται 1920×1080 ή μεγαλύτερη.',
              },
            },
          ],
        },

        // ─────────────── ΕΠΙΚΟΙΝΩΝΙΑ ───────────────
        {
          label: { el: 'Επικοινωνία', en: 'Contact' },
          fields: [
            { name: 'address', label: { el: 'Διεύθυνση', en: 'Address' }, type: 'textarea', localized: true },
            { name: 'phone', label: { el: 'Τηλέφωνο', en: 'Phone' }, type: 'text' },
            { name: 'fax', label: 'Fax', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            {
              name: 'businessHours',
              label: { el: 'Ώρες λειτουργίας', en: 'Business hours' },
              type: 'array',
              fields: [
                {
                  name: 'days',
                  label: { el: 'Ημέρες', en: 'Days' },
                  type: 'text',
                  required: true,
                  // Όχι localized — ίδιες τιμές σε όλες τις γλώσσες (αποφεύγουμε
                  // edge case όπου τα array items χάνουν τη σύνδεσή τους ανά locale).
                },
                { name: 'hours', label: { el: 'Ώρες', en: 'Hours' }, type: 'text', required: true },
              ],
            },
            {
              name: 'mapEmbedUrl',
              label: { el: 'Google Maps Embed URL', en: 'Google Maps Embed URL' },
              type: 'text',
              admin: { description: { el: 'Από Google Maps → Share → Embed → src URL', en: 'From Google Maps Share/Embed' } },
            },
          ],
        },

        // ─────────────── SOCIAL ───────────────
        {
          label: { el: 'Social Media', en: 'Social Media' },
          fields: [
            {
              name: 'social',
              type: 'array',
              labels: {
                singular: { el: 'Δίκτυο', en: 'Network' },
                plural: { el: 'Δίκτυα', en: 'Networks' },
              },
              fields: [
                {
                  name: 'platform',
                  label: { el: 'Πλατφόρμα', en: 'Platform' },
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'X / Twitter', value: 'x' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                },
                { name: 'url', label: 'URL', type: 'text', required: true },
              ],
            },
          ],
        },

        // ─────────────── FOOTER ───────────────
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              label: { el: 'Κείμενο footer', en: 'Footer text' },
              type: 'textarea',
              localized: true,
            },
            {
              name: 'footerLinks',
              label: { el: 'Footer links', en: 'Footer links' },
              type: 'array',
              fields: [
                { name: 'label', label: { el: 'Κείμενο', en: 'Label' }, type: 'text', localized: true, required: true },
                { name: 'href', label: { el: 'Σύνδεσμος', en: 'Link' }, type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
