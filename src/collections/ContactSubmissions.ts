import type { CollectionConfig } from 'payload';

/**
 * ContactSubmissions — αποθηκεύει τα μηνύματα της φόρμας επικοινωνίας.
 *
 * Read-only για editors (τα δημιουργεί το server action, όχι ο admin).
 * Υπάρχει το πεδίο "handled" για να μαρκάρει ο admin τα μηνύματα που έχει
 * απαντήσει.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { el: 'Μήνυμα', en: 'Submission' },
    plural: { el: 'Μηνύματα Επικοινωνίας', en: 'Contact Submissions' },
  },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'name', 'email', 'handled', 'createdAt'],
    group: { el: 'Σύστημα', en: 'System' },
    listSearchableFields: ['name', 'email', 'subject', 'message'],
  },
  access: {
    // Όλοι οι authenticated users μπορούν να βλέπουν
    read: ({ req }) => Boolean(req.user),
    // Submissions δημιουργούνται μέσω server action — κανείς δεν τα φτιάχνει χειροκίνητα
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: { el: 'Όνομα', en: 'Name' },
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          label: { el: 'Τηλέφωνο', en: 'Phone' },
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'subject',
          label: { el: 'Θέμα', en: 'Subject' },
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'message',
      label: { el: 'Μήνυμα', en: 'Message' },
      type: 'textarea',
      required: true,
    },
    {
      name: 'locale',
      label: { el: 'Γλώσσα', en: 'Locale' },
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'userAgent',
      label: 'User Agent',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'handled',
      label: { el: 'Έχει απαντηθεί', en: 'Handled' },
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      label: { el: 'Εσωτερικές σημειώσεις', en: 'Internal notes' },
      type: 'textarea',
      admin: {
        description: 'Σημειώσεις που βλέπουν μόνο οι διαχειριστές',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
};
