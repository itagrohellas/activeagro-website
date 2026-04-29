/**
 * Seed logic — γεμίζει το Payload με demo περιεχόμενο.
 *
 * Δημιουργεί (idempotent — δεν διπλοδημιουργεί):
 *  - Admin user (από SEED_ADMIN_EMAIL/PASSWORD env, ή default)
 *  - 4 κατηγορίες προϊόντων
 *  - 6 demo προϊόντα (3 featured)
 *  - 3 demo blog posts
 *  - Site settings με Greek defaults
 *
 * Καλείται από:
 *  - /api/seed route handler (όταν τρέχει εντός Next.js)
 */

import type { Payload } from 'payload';

// Lexical node helpers — ένα minimal richtext object
function plainRichText(text: string) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text,
              type: 'text',
              version: 1,
            },
          ],
        },
      ],
    },
  };
}

const CATEGORIES = [
  {
    name: 'Κρυσταλλικά Λιπάσματα',
    nameEn: 'Crystalline Fertilizers',
    slug: 'krystallika-lipasmata',
    description: 'Πλήρως υδατοδιαλυτά για στάγδην άρδευση και φυλλώματα.',
    descriptionEn: 'Fully water-soluble for drip irrigation and foliar feeding.',
    order: 1,
  },
  {
    name: 'Υδρολιπάσματα',
    nameEn: 'Liquid Fertilizers',
    slug: 'ydrolipasmata',
    description: 'Υγρές φόρμουλες υψηλής συγκέντρωσης.',
    descriptionEn: 'High-concentration liquid formulas.',
    order: 2,
  },
  {
    name: 'Βιοδιεγέρτες',
    nameEn: 'Biostimulants',
    slug: 'viodiegertes',
    description: 'Φυτικά εκχυλίσματα και αμινοξέα για ενίσχυση.',
    descriptionEn: 'Plant extracts and amino acids for enhancement.',
    order: 3,
  },
  {
    name: 'Ιχνοστοιχεία',
    nameEn: 'Micronutrients',
    slug: 'ichnostoixeia',
    description: 'Χηλικοποιημένες μορφές για άμεση απορρόφηση.',
    descriptionEn: 'Chelated forms for immediate uptake.',
    order: 4,
  },
];

const PRODUCTS = [
  {
    slug: 'activagro-20-20-20',
    categorySlug: 'krystallika-lipasmata',
    name: 'ActivAgro 20-20-20',
    nameEn: 'ActivAgro 20-20-20',
    tagline: 'Ισορροπημένο NPK για κάθε στάδιο',
    taglineEn: 'Balanced NPK for every stage',
    shortDescription: 'Πλήρως υδατοδιαλυτό λίπασμα NPK 20-20-20 με ιχνοστοιχεία EDTA.',
    shortDescriptionEn: 'Fully water-soluble NPK 20-20-20 fertilizer with EDTA micronutrients.',
    n: 20,
    p: 20,
    k: 20,
    form: 'crystalline' as const,
    featured: true,
  },
  {
    slug: 'activagro-12-48-8',
    categorySlug: 'krystallika-lipasmata',
    name: 'ActivAgro 12-48-8',
    nameEn: 'ActivAgro 12-48-8',
    tagline: 'Υψηλό φώσφορο για ριζοβολία',
    taglineEn: 'High phosphorus for rooting',
    shortDescription: 'Ιδανικό για το στάδιο της ριζοβολίας και της εγκατάστασης.',
    shortDescriptionEn: 'Ideal for the rooting and establishment stage.',
    n: 12,
    p: 48,
    k: 8,
    form: 'crystalline' as const,
    featured: true,
  },
  {
    slug: 'activagro-bio-amino',
    categorySlug: 'viodiegertes',
    name: 'ActivAgro Bio Amino',
    nameEn: 'ActivAgro Bio Amino',
    tagline: 'Αμινοξέα φυτικής προέλευσης',
    taglineEn: 'Plant-derived amino acids',
    shortDescription: 'Υγρός βιοδιεγέρτης πλούσιος σε ελεύθερα L-αμινοξέα.',
    shortDescriptionEn: 'Liquid biostimulant rich in free L-amino acids.',
    form: 'liquid' as const,
    featured: true,
  },
  {
    slug: 'activagro-iron-eddha',
    categorySlug: 'ichnostoixeia',
    name: 'ActivAgro Iron EDDHA',
    nameEn: 'ActivAgro Iron EDDHA',
    tagline: '6% σίδηρος χηλικοποιημένος EDDHA',
    taglineEn: '6% EDDHA-chelated iron',
    shortDescription: 'Σταθερό σε υψηλά pH, για καλλιέργειες με χλώρωση.',
    shortDescriptionEn: 'Stable at high pH, for chlorotic crops.',
    form: 'powder' as const,
    featured: false,
  },
  {
    slug: 'activagro-greenleaf',
    categorySlug: 'ydrolipasmata',
    name: 'ActivAgro GreenLeaf',
    nameEn: 'ActivAgro GreenLeaf',
    tagline: 'Φυλλικό λίπασμα ανάπτυξης',
    taglineEn: 'Foliar growth fertilizer',
    shortDescription: 'Υψηλής συγκέντρωσης υγρό λίπασμα για ψεκασμό φυλλώματος.',
    shortDescriptionEn: 'High-concentration liquid fertilizer for foliar spray.',
    n: 30,
    p: 10,
    k: 10,
    form: 'liquid' as const,
    featured: false,
  },
  {
    slug: 'activagro-fruitset',
    categorySlug: 'viodiegertes',
    name: 'ActivAgro FruitSet',
    nameEn: 'ActivAgro FruitSet',
    tagline: 'Καρπόδεση & ομοιόμορφη ωρίμανση',
    taglineEn: 'Fruit set & uniform ripening',
    shortDescription: 'Ειδική σύνθεση για τη φάση της άνθησης και καρπόδεσης.',
    shortDescriptionEn: 'Special formula for flowering and fruit-set stage.',
    form: 'liquid' as const,
    featured: false,
  },
];

const POSTS = [
  {
    slug: 'fthinoporini-lipansi-elias',
    title: 'Φθινοπωρινή λίπανση ελιάς: τι, πότε, πώς',
    titleEn: 'Autumn olive fertilization: what, when, how',
    excerpt: 'Πρακτικός οδηγός για τη φθινοπωρινή λίπανση της ελιάς, με δοσολογίες ανά ηλικία δέντρου.',
    excerptEn: 'Practical guide to autumn olive fertilization, with dosages per tree age.',
    body: 'Η σωστή φθινοπωρινή λίπανση είναι η βάση για μια καλή σοδειά την επόμενη χρονιά. Στόχος είναι να αποθηκευτούν θρεπτικά για το ξεκίνημα της άνοιξης.',
    bodyEn: 'Proper autumn fertilization is the foundation for a good harvest the following year. The goal is to store nutrients for the spring start.',
  },
  {
    slug: 'biodiegertes-amineksea-ti-prosferoun',
    title: 'Βιοδιεγέρτες αμινοξέων: τι προσφέρουν στην καλλιέργεια;',
    titleEn: 'Amino-acid biostimulants: what do they offer crops?',
    excerpt: 'Τα ελεύθερα L-αμινοξέα δρουν σαν "καύσιμο" στις στιγμές stress της καλλιέργειας.',
    excerptEn: 'Free L-amino acids act as "fuel" during plant stress moments.',
    body: 'Όταν η καλλιέργεια αντιμετωπίζει stress (καύσωνα, ψύχος, ασθένεια), η βιοσύνθεση αμινοξέων επιβαρύνει τον φυτικό μεταβολισμό. Ένας βιοδιεγέρτης παρακάμπτει το πρόβλημα.',
    bodyEn: 'When crops face stress (heat, cold, disease), amino acid biosynthesis burdens metabolism. A biostimulant bypasses the issue.',
  },
  {
    slug: 'syndromi-mikron-stoiheion-yperkalio-ki-magnisio',
    title: 'Συνδρομή ιχνοστοιχείων: όταν η έλλειψη δεν φαίνεται με γυμνό μάτι',
    titleEn: 'Micronutrient supplementation: when deficiency isn’t visible',
    excerpt: 'Πώς αναγνωρίζουμε υφέρπουσες ελλείψεις ιχνοστοιχείων μέσω εδαφολογικής & φυλλοδιαγνωστικής.',
    excerptEn: 'How to spot subclinical micronutrient deficiencies via soil & leaf analysis.',
    body: 'Πολλές ελλείψεις ιχνοστοιχείων δεν εμφανίζουν εμφανή συμπτώματα, αλλά μειώνουν την παραγωγικότητα. Η ανάλυση είναι ο μοναδικός σίγουρος δρόμος.',
    bodyEn: 'Many micronutrient deficiencies show no visible symptoms but reduce yield. Analysis is the only sure path.',
  },
];

export interface SeedResult {
  log: string[];
  errors: string[];
  adminEmail: string;
  adminPassword: string;
}

export async function runSeed(payload: Payload): Promise<SeedResult> {
  const log: string[] = [];
  const errors: string[] = [];
  const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@activeagro.com';
  const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin12345';

  // Admin user
  try {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: ADMIN_EMAIL } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          name: 'Διαχειριστής',
          role: 'admin',
        },
      });
      log.push(`✓ Admin user created: ${ADMIN_EMAIL}`);
    } else {
      log.push(`· Admin user exists: ${ADMIN_EMAIL}`);
    }
  } catch (err) {
    errors.push(`Admin user: ${err instanceof Error ? err.message : String(err)}`);
  }

  // Categories
  const categoryMap: Record<string, number | string> = {};
  for (const cat of CATEGORIES) {
    try {
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: cat.slug } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        categoryMap[cat.slug] = existing.docs[0].id;
        log.push(`· Category exists: ${cat.name}`);
        continue;
      }
      const created = await payload.create({
        collection: 'categories',
        locale: 'el',
        data: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          order: cat.order,
        },
      });
      await payload.update({
        collection: 'categories',
        id: created.id,
        locale: 'en',
        data: { name: cat.nameEn, description: cat.descriptionEn },
      });
      categoryMap[cat.slug] = created.id;
      log.push(`✓ Category: ${cat.name}`);
    } catch (err) {
      errors.push(`Category ${cat.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Products
  for (const prod of PRODUCTS) {
    try {
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: prod.slug } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        log.push(`· Product exists: ${prod.name}`);
        continue;
      }
      const categoryId = categoryMap[prod.categorySlug];
      if (!categoryId) {
        errors.push(`Skip ${prod.name}: category ${prod.categorySlug} not found`);
        continue;
      }
      const created = await payload.create({
        collection: 'products',
        locale: 'el',
        data: {
          name: prod.name,
          slug: prod.slug,
          category: categoryId,
          tagline: prod.tagline,
          shortDescription: prod.shortDescription,
          description: plainRichText(prod.shortDescription),
          n: prod.n,
          p: prod.p,
          k: prod.k,
          form: prod.form,
          featured: prod.featured,
        },
      });
      await payload.update({
        collection: 'products',
        id: created.id,
        locale: 'en',
        data: {
          name: prod.nameEn,
          tagline: prod.taglineEn,
          shortDescription: prod.shortDescriptionEn,
          description: plainRichText(prod.shortDescriptionEn),
        },
      });
      log.push(`✓ Product: ${prod.name}`);
    } catch (err) {
      errors.push(`Product ${prod.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Blog posts
  for (const post of POSTS) {
    try {
      const existing = await payload.find({
        collection: 'blog-posts',
        where: { slug: { equals: post.slug } },
        limit: 1,
      });
      if (existing.docs.length > 0) {
        log.push(`· Post exists: ${post.title}`);
        continue;
      }
      const created = await payload.create({
        collection: 'blog-posts',
        locale: 'el',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: plainRichText(post.body),
          publishedAt: new Date().toISOString(),
        },
      });
      await payload.update({
        collection: 'blog-posts',
        id: created.id,
        locale: 'en',
        data: {
          title: post.titleEn,
          excerpt: post.excerptEn,
          content: plainRichText(post.bodyEn),
        },
      });
      log.push(`✓ Blog post: ${post.title}`);
    } catch (err) {
      errors.push(`Post ${post.title}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Site settings
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'el',
      data: {
        companyName: 'ActiveAgro Α.Ε.',
        tagline: 'Λιπάσματα & αγροτικά εφόδια',
        description: 'Από το 1995 στηρίζουμε τον Έλληνα παραγωγό με προϊόντα και τεχνογνωσία.',
        address: '15ο χλμ Π.Ε.Ο. Θεσσαλονίκης-Βέροιας, Θεσσαλονίκη 57011',
        phone: '+30 231 601 0410',
        email: 'info@activeagro.com',
        businessHours: [
          { days: 'Δευτέρα — Παρασκευή', hours: '09:00 — 17:00' },
          { days: 'Σάββατο — Κυριακή', hours: 'Κλειστά' },
        ],
        mapEmbedUrl:
          'https://maps.google.com/maps?q=15%CE%BF+%CF%87%CE%BB%CE%BC+%CE%A0.%CE%95.%CE%9F.+%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7%CF%82-%CE%92%CE%AD%CF%81%CE%BF%CE%B9%CE%B1%CF%82&t=&z=14&ie=UTF8&iwloc=&output=embed',
      },
    });
    await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'en',
      data: {
        tagline: 'Fertilizers & farming supplies',
        description: 'Since 1995 we have stood by Greek growers with products and expertise.',
        address: '15th km Old National Rd Thessaloniki–Veria, Thessaloniki 57011, Greece',
        // businessHours left to inherit from el locale (days/hours are no longer localized)
      },
    });
    log.push('✓ SiteSettings updated');
  } catch (err) {
    errors.push(`SiteSettings: ${err instanceof Error ? err.message : String(err)}`);
  }

  return { log, errors, adminEmail: ADMIN_EMAIL, adminPassword: ADMIN_PASSWORD };
}
