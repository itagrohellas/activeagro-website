import type { CollectionConfig } from 'payload';

/**
 * BlogPosts — άρθρα/νέα της εταιρίας
 * (συμβουλές καλλιέργειας, νέα προϊόντα, εκδηλώσεις).
 */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: { el: 'Άρθρο', en: 'Post' },
    plural: { el: 'Άρθρα / Νέα', en: 'Blog / News' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'updatedAt'],
    group: { el: 'Περιεχόμενο', en: 'Content' },
  },
  access: {
    read: () => true,
  },
  // Δεν χρησιμοποιούμε drafts — κάθε save εμφανίζεται άμεσα στο site.
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
    },
    {
      name: 'excerpt',
      label: { el: 'Σύντομη περίληψη', en: 'Excerpt' },
      type: 'textarea',
      localized: true,
      admin: { description: { el: 'Εμφανίζεται στις κάρτες λίστας', en: 'Shown on listing cards' } },
    },
    {
      name: 'coverImage',
      label: { el: 'Εικόνα εξωφύλλου', en: 'Cover image' },
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Συνιστάται. Αν λείπει, εμφανίζεται placeholder.',
      },
    },
    {
      name: 'content',
      label: { el: 'Περιεχόμενο', en: 'Content' },
      type: 'richText',
      localized: true,
      required: true,
    },
    {
      name: 'tags',
      label: { el: 'Ετικέτες', en: 'Tags' },
      type: 'array',
      labels: {
        singular: { el: 'Ετικέτα', en: 'Tag' },
        plural: { el: 'Ετικέτες', en: 'Tags' },
      },
      fields: [
        {
          name: 'tag',
          label: { el: 'Ετικέτα', en: 'Tag' },
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'publishedAt',
      label: { el: 'Ημ/νία δημοσίευσης', en: 'Published at' },
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      label: { el: 'Συντάκτης', en: 'Author' },
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
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
