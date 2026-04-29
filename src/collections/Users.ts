import type { CollectionConfig } from 'payload';

/**
 * Users — όσοι μπορούν να συνδεθούν στο /admin.
 * Ξεκινάμε με 2 ρόλους: admin (όλα) και editor (μόνο περιεχόμενο).
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { el: 'Χρήστης', en: 'User' },
    plural: { el: 'Χρήστες', en: 'Users' },
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: { el: 'Σύστημα', en: 'System' },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: { el: 'Όνομα', en: 'Name' },
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: { el: 'Ρόλος', en: 'Role' },
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: { el: 'Διαχειριστής', en: 'Administrator' }, value: 'admin' },
        { label: { el: 'Συντάκτης', en: 'Editor' }, value: 'editor' },
      ],
    },
  ],
};
