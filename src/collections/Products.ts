import type { CollectionConfig } from 'payload';

/**
 * Products — λιπάσματα της ActiveAgro με πλήρη τεχνικά χαρακτηριστικά.
 *
 * Δομή tabs στο admin:
 *   1. Γενικά      — όνομα, slug, κατηγορία, σύντομη περιγραφή, μορφή
 *   2. Σύνθεση    — NPK, ιχνοστοιχεία (μέσω array)
 *   3. Συσκευασίες
 *   4. Εφαρμογή   — καλλιέργειες + οδηγίες χρήσης
 *   5. Media      — εικόνες, datasheet PDF
 *   6. SEO        — meta title/description
 */
export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: { el: 'Προϊόν', en: 'Product' },
    plural: { el: 'Προϊόντα', en: 'Products' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'form', 'updatedAt'],
    group: { el: 'Προϊόντα', en: 'Products' },
  },
  access: {
    read: () => true,
  },
  // Δεν χρησιμοποιούμε drafts — κάθε save εμφανίζεται άμεσα στο site.
  // Αν θες draft workflow αργότερα, πρόσθεσε: versions: { drafts: true }
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─────────────── ΓΕΝΙΚΑ ───────────────
        {
          label: { el: 'Γενικά', en: 'General' },
          fields: [
            {
              name: 'name',
              label: { el: 'Όνομα προϊόντος', en: 'Product name' },
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
              name: 'category',
              label: { el: 'Κατηγορία', en: 'Category' },
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
            {
              name: 'tagline',
              label: { el: 'Tagline (σύντομος υπότιτλος)', en: 'Tagline' },
              type: 'text',
              localized: true,
              admin: { description: { el: 'Π.χ. "Υδατοδιαλυτό λίπασμα NPK"', en: 'e.g. "Water-soluble NPK fertilizer"' } },
            },
            {
              name: 'shortDescription',
              label: { el: 'Σύντομη περιγραφή', en: 'Short description' },
              type: 'textarea',
              localized: true,
              admin: { description: { el: 'Εμφανίζεται στις κάρτες λίστας προϊόντων', en: 'Shown on product cards' } },
            },
            {
              name: 'description',
              label: { el: 'Πλήρης περιγραφή', en: 'Full description' },
              type: 'richText',
              localized: true,
            },
            {
              name: 'form',
              label: { el: 'Μορφή', en: 'Form' },
              type: 'select',
              options: [
                { label: { el: 'Κόκκοι', en: 'Granular' }, value: 'granular' },
                { label: { el: 'Σκόνη', en: 'Powder' }, value: 'powder' },
                { label: { el: 'Υγρό', en: 'Liquid' }, value: 'liquid' },
                { label: { el: 'Κρυσταλλικό', en: 'Crystalline' }, value: 'crystalline' },
                { label: { el: 'Άλλο', en: 'Other' }, value: 'other' },
              ],
            },
            {
              name: 'featured',
              label: { el: 'Προβεβλημένο', en: 'Featured' },
              type: 'checkbox',
              defaultValue: false,
              admin: { description: { el: 'Εμφανίζεται στην αρχική σελίδα', en: 'Shown on homepage' } },
            },
          ],
        },

        // ─────────────── ΣΥΝΘΕΣΗ ───────────────
        {
          label: { el: 'Σύνθεση', en: 'Composition' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'n', label: { el: 'Άζωτο (N) %', en: 'Nitrogen (N) %' }, type: 'number', admin: { width: '33%' } },
                { name: 'p', label: { el: 'Φώσφορος (P₂O₅) %', en: 'Phosphorus (P₂O₅) %' }, type: 'number', admin: { width: '33%' } },
                { name: 'k', label: { el: 'Κάλιο (K₂O) %', en: 'Potassium (K₂O) %' }, type: 'number', admin: { width: '34%' } },
              ],
            },
            {
              name: 'npkLabel',
              label: { el: 'Ετικέτα NPK (auto)', en: 'NPK label (auto)' },
              type: 'text',
              admin: {
                readOnly: true,
                description: { el: 'Συμπληρώνεται αυτόματα π.χ. "20-20-20"', en: 'Auto-filled e.g. "20-20-20"' },
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    const { n, p, k } = siblingData as { n?: number; p?: number; k?: number };
                    if (n != null || p != null || k != null) {
                      return `${n ?? 0}-${p ?? 0}-${k ?? 0}`;
                    }
                    return undefined;
                  },
                ],
              },
            },
            {
              name: 'micronutrients',
              label: { el: 'Ιχνοστοιχεία', en: 'Micronutrients' },
              type: 'array',
              labels: {
                singular: { el: 'Ιχνοστοιχείο', en: 'Micronutrient' },
                plural: { el: 'Ιχνοστοιχεία', en: 'Micronutrients' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      label: { el: 'Στοιχείο', en: 'Element' },
                      type: 'text',
                      required: true,
                      admin: { width: '40%', description: { el: 'Π.χ. Fe, Mn, Zn, B, Cu, Mo', en: 'e.g. Fe, Mn, Zn, B, Cu, Mo' } },
                    },
                    {
                      name: 'percentage',
                      label: { el: 'Περιεκτικότητα %', en: 'Percentage %' },
                      type: 'number',
                      required: true,
                      admin: { width: '30%' },
                    },
                    {
                      name: 'chelated',
                      label: { el: 'Χηλικοποιημένο (EDTA/EDDHA)', en: 'Chelated (EDTA/EDDHA)' },
                      type: 'checkbox',
                      admin: { width: '30%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'compositionNotes',
              label: { el: 'Σημειώσεις σύνθεσης', en: 'Composition notes' },
              type: 'textarea',
              localized: true,
            },
          ],
        },

        // ─────────────── ΣΥΣΚΕΥΑΣΙΕΣ ───────────────
        {
          label: { el: 'Συσκευασίες', en: 'Packaging' },
          fields: [
            {
              name: 'packaging',
              label: { el: 'Διαθέσιμες συσκευασίες', en: 'Available packaging' },
              type: 'array',
              labels: {
                singular: { el: 'Συσκευασία', en: 'Pack' },
                plural: { el: 'Συσκευασίες', en: 'Packs' },
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'size',
                      label: { el: 'Μέγεθος', en: 'Size' },
                      type: 'number',
                      required: true,
                      admin: { width: '40%' },
                    },
                    {
                      name: 'unit',
                      label: { el: 'Μονάδα', en: 'Unit' },
                      type: 'select',
                      required: true,
                      defaultValue: 'kg',
                      options: [
                        { label: 'kg', value: 'kg' },
                        { label: 'g', value: 'g' },
                        { label: 'lt', value: 'lt' },
                        { label: 'ml', value: 'ml' },
                        { label: 'tn', value: 'tn' },
                      ],
                      admin: { width: '30%' },
                    },
                    {
                      name: 'sku',
                      label: { el: 'Κωδικός (SKU)', en: 'SKU' },
                      type: 'text',
                      admin: { width: '30%' },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─────────────── ΕΦΑΡΜΟΓΗ ───────────────
        {
          label: { el: 'Εφαρμογή', en: 'Application' },
          fields: [
            {
              name: 'crops',
              label: { el: 'Καλλιέργειες', en: 'Crops' },
              type: 'array',
              labels: {
                singular: { el: 'Καλλιέργεια', en: 'Crop' },
                plural: { el: 'Καλλιέργειες', en: 'Crops' },
              },
              fields: [
                {
                  name: 'name',
                  label: { el: 'Όνομα καλλιέργειας', en: 'Crop name' },
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: { description: { el: 'Π.χ. Ελιά, Αμπέλι, Πορτοκαλιά', en: 'e.g. Olive, Vine, Orange' } },
                },
                {
                  name: 'dosage',
                  label: { el: 'Δοσολογία', en: 'Dosage' },
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'timing',
                  label: { el: 'Χρόνος εφαρμογής', en: 'Timing' },
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'usageInstructions',
              label: { el: 'Οδηγίες χρήσης', en: 'Usage instructions' },
              type: 'richText',
              localized: true,
            },
            {
              name: 'precautions',
              label: { el: 'Προφυλάξεις', en: 'Precautions' },
              type: 'textarea',
              localized: true,
            },
          ],
        },

        // ─────────────── MEDIA ───────────────
        {
          label: { el: 'Φωτό & PDF', en: 'Media & PDF' },
          fields: [
            {
              name: 'mainImage',
              label: { el: 'Κύρια εικόνα', en: 'Main image' },
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Συνιστάται. Αν λείπει, εμφανίζεται placeholder με τα αρχικά "AA".',
              },
            },
            {
              name: 'gallery',
              label: { el: 'Επιπλέον φωτογραφίες', en: 'Additional images' },
              type: 'array',
              labels: {
                singular: { el: 'Φωτογραφία', en: 'Image' },
                plural: { el: 'Φωτογραφίες', en: 'Images' },
              },
              fields: [
                {
                  name: 'image',
                  label: { el: 'Εικόνα', en: 'Image' },
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'datasheet',
              label: { el: 'Τεχνικό φυλλάδιο (PDF)', en: 'Datasheet (PDF)' },
              type: 'upload',
              relationTo: 'media',
              filterOptions: { mimeType: { contains: 'pdf' } },
            },
          ],
        },

        // ─────────────── SEO ───────────────
        {
          label: 'SEO',
          fields: [
            {
              name: 'meta',
              type: 'group',
              label: false,
              fields: [
                { name: 'title', label: { el: 'Meta τίτλος', en: 'Meta title' }, type: 'text', localized: true },
                {
                  name: 'description',
                  label: { el: 'Meta περιγραφή', en: 'Meta description' },
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
