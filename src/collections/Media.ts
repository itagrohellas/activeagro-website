import type { CollectionConfig } from 'payload';

/**
 * Media — όλα τα uploads (εικόνες προϊόντων, blog covers, datasheets PDF).
 * Με image sizes ώστε να σερβίρουμε responsive variants.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { el: 'Αρχείο', en: 'Media' },
    plural: { el: 'Αρχεία', en: 'Media' },
  },
  admin: {
    group: { el: 'Περιεχόμενο', en: 'Content' },
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 576, position: 'centre' },
      { name: 'tablet', width: 1024 },
      { name: 'desktop', width: 1920 },
    ],
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
  },
  fields: [
    {
      name: 'alt',
      label: { el: 'Εναλλακτικό κείμενο (alt)', en: 'Alt text' },
      type: 'text',
      localized: true,
      admin: {
        description: {
          el: 'Σύντομη περιγραφή για accessibility & SEO',
          en: 'Short description for accessibility & SEO',
        },
      },
    },
    {
      name: 'caption',
      label: { el: 'Λεζάντα', en: 'Caption' },
      type: 'text',
      localized: true,
    },
  ],
};
