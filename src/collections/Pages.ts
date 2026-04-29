import type { CollectionConfig } from 'payload';

/**
 * Pages — γενικές σελίδες με ευέλικτο περιεχόμενο.
 *
 * Χρησιμοποιούμε "blocks" ώστε ο διαχειριστής να φτιάχνει σελίδες σαν puzzle:
 * επιλέγει ποια sections θέλει (hero, text, gallery, CTA, stats κτλ)
 * και τα τοποθετεί με τη σειρά που του ταιριάζει.
 *
 * Οι σελίδες με slug "home" και "about" χρησιμοποιούνται απευθείας από
 * τον frontend κώδικα — δες src/app/(frontend)/page.tsx και about/page.tsx.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { el: 'Σελίδα', en: 'Page' },
    plural: { el: 'Σελίδες', en: 'Pages' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: { el: 'Περιεχόμενο', en: 'Content' },
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      label: { el: 'Τίτλος', en: 'Title' },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: { el: 'Slug (URL)', en: 'Slug (URL)' },
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: {
          el: 'Π.χ. "home", "about". Οι σελίδες "home" και "about" είναι ειδικές.',
          en: 'e.g. "home", "about". The "home" and "about" pages are special.',
        },
      },
    },
    {
      name: 'hero',
      label: { el: 'Hero (κορυφαία ενότητα)', en: 'Hero section' },
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          label: { el: 'Eyebrow (μικρό label από πάνω)', en: 'Eyebrow' },
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: { el: 'Μεγάλος τίτλος', en: 'Heading' },
          type: 'text',
          localized: true,
        },
        {
          name: 'subheading',
          label: { el: 'Υπότιτλος', en: 'Subheading' },
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          label: { el: 'Εικόνα φόντου', en: 'Background image' },
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctas',
          label: { el: 'Κουμπιά (CTA)', en: 'CTAs' },
          type: 'array',
          maxRows: 2,
          fields: [
            { name: 'label', label: { el: 'Κείμενο', en: 'Label' }, type: 'text', localized: true, required: true },
            { name: 'href', label: { el: 'Σύνδεσμος', en: 'Link' }, type: 'text', required: true },
            {
              name: 'variant',
              label: { el: 'Στυλ', en: 'Style' },
              type: 'select',
              defaultValue: 'primary',
              options: [
                { label: { el: 'Πρωτεύον', en: 'Primary' }, value: 'primary' },
                { label: { el: 'Δευτερεύον', en: 'Secondary' }, value: 'secondary' },
                { label: { el: 'Διακριτικό', en: 'Ghost' }, value: 'ghost' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'sections',
      label: { el: 'Ενότητες', en: 'Sections' },
      type: 'blocks',
      labels: {
        singular: { el: 'Ενότητα', en: 'Section' },
        plural: { el: 'Ενότητες', en: 'Sections' },
      },
      blocks: [
        // Text + image
        {
          slug: 'textWithImage',
          labels: {
            singular: { el: 'Κείμενο + Εικόνα', en: 'Text + Image' },
            plural: { el: 'Κείμενο + Εικόνα', en: 'Text + Image' },
          },
          fields: [
            { name: 'heading', label: { el: 'Τίτλος', en: 'Heading' }, type: 'text', localized: true },
            { name: 'body', label: { el: 'Κείμενο', en: 'Body' }, type: 'richText', localized: true },
            { name: 'image', label: { el: 'Εικόνα', en: 'Image' }, type: 'upload', relationTo: 'media' },
            {
              name: 'imagePosition',
              label: { el: 'Θέση εικόνας', en: 'Image position' },
              type: 'select',
              defaultValue: 'right',
              options: [
                { label: { el: 'Δεξιά', en: 'Right' }, value: 'right' },
                { label: { el: 'Αριστερά', en: 'Left' }, value: 'left' },
              ],
            },
          ],
        },
        // Stats
        {
          slug: 'stats',
          labels: {
            singular: { el: 'Στατιστικά / KPIs', en: 'Stats / KPIs' },
            plural: { el: 'Στατιστικά', en: 'Stats' },
          },
          fields: [
            { name: 'heading', label: { el: 'Τίτλος', en: 'Heading' }, type: 'text', localized: true },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              maxRows: 6,
              fields: [
                { name: 'value', label: { el: 'Τιμή', en: 'Value' }, type: 'text', localized: true, required: true },
                { name: 'label', label: { el: 'Ετικέτα', en: 'Label' }, type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
        // Featured products
        {
          slug: 'featuredProducts',
          labels: {
            singular: { el: 'Προβεβλημένα προϊόντα', en: 'Featured products' },
            plural: { el: 'Προβεβλημένα προϊόντα', en: 'Featured products' },
          },
          fields: [
            { name: 'heading', label: { el: 'Τίτλος', en: 'Heading' }, type: 'text', localized: true },
            {
              name: 'products',
              label: { el: 'Προϊόντα', en: 'Products' },
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
            },
          ],
        },
        // Values / features grid
        {
          slug: 'features',
          labels: {
            singular: { el: 'Πλεονεκτήματα / Αξίες', en: 'Features / Values' },
            plural: { el: 'Πλεονεκτήματα', en: 'Features' },
          },
          fields: [
            { name: 'heading', label: { el: 'Τίτλος', en: 'Heading' }, type: 'text', localized: true },
            {
              name: 'items',
              type: 'array',
              minRows: 1,
              fields: [
                { name: 'icon', label: { el: 'Εικονίδιο (lucide name)', en: 'Icon (lucide name)' }, type: 'text' },
                { name: 'title', label: { el: 'Τίτλος', en: 'Title' }, type: 'text', localized: true, required: true },
                { name: 'body', label: { el: 'Κείμενο', en: 'Body' }, type: 'textarea', localized: true },
              ],
            },
          ],
        },
        // CTA banner
        {
          slug: 'cta',
          labels: { singular: { el: 'CTA', en: 'CTA' }, plural: { el: 'CTAs', en: 'CTAs' } },
          fields: [
            { name: 'heading', label: { el: 'Τίτλος', en: 'Heading' }, type: 'text', localized: true, required: true },
            { name: 'subheading', label: { el: 'Υπότιτλος', en: 'Subheading' }, type: 'textarea', localized: true },
            { name: 'buttonLabel', label: { el: 'Κείμενο κουμπιού', en: 'Button label' }, type: 'text', localized: true, required: true },
            { name: 'buttonHref', label: { el: 'Σύνδεσμος κουμπιού', en: 'Button link' }, type: 'text', required: true },
          ],
        },
        // Timeline (για το About)
        {
          slug: 'timeline',
          labels: {
            singular: { el: 'Χρονολόγιο', en: 'Timeline' },
            plural: { el: 'Χρονολόγια', en: 'Timelines' },
          },
          fields: [
            { name: 'heading', label: { el: 'Τίτλος', en: 'Heading' }, type: 'text', localized: true },
            {
              name: 'milestones',
              type: 'array',
              fields: [
                { name: 'year', label: { el: 'Έτος', en: 'Year' }, type: 'text', required: true },
                { name: 'title', label: { el: 'Τίτλος', en: 'Title' }, type: 'text', localized: true, required: true },
                { name: 'description', label: { el: 'Περιγραφή', en: 'Description' }, type: 'textarea', localized: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', label: { el: 'Meta τίτλος', en: 'Meta title' }, type: 'text', localized: true },
        { name: 'description', label: { el: 'Meta περιγραφή', en: 'Meta description' }, type: 'textarea', localized: true },
      ],
    },
  ],
};
