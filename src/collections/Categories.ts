import type { CollectionConfig } from 'payload';

/**
 * Categories — κατηγορίες προϊόντων (π.χ. «Κρυσταλλικά Λιπάσματα»,
 * «Υδρολιπάσματα», «Βιοδιεγέρτες», «Εδαφοβελτιωτικά»).
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { el: 'Κατηγορία', en: 'Category' },
    plural: { el: 'Κατηγορίες', en: 'Categories' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
    group: { el: 'Προϊόντα', en: 'Products' },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: { el: 'Όνομα', en: 'Name' },
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
          el: 'Φιλικό προς URL αναγνωριστικό. Π.χ. "krystallika-lipasmata"',
          en: 'URL-friendly identifier, e.g. "crystalline-fertilizers"',
        },
      },
    },
    {
      name: 'description',
      label: { el: 'Σύντομη περιγραφή', en: 'Short description' },
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      label: { el: 'Εικόνα κατηγορίας', en: 'Category image' },
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: { el: 'Σειρά εμφάνισης', en: 'Display order' },
      type: 'number',
      defaultValue: 0,
      admin: {
        description: {
          el: 'Μικρότερος αριθμός = εμφανίζεται πρώτο',
          en: 'Lower number appears first',
        },
      },
    },
  ],
};
