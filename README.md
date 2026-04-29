# ActiveAgro — Εταιρικό Website

Επίσημο website της **ActiveAgro Α.Ε.** — εταιρίας εμπορίας λιπασμάτων.

Χτισμένο με **Next.js 15** (App Router, TypeScript, Tailwind CSS), **Payload CMS 3** για διαχείριση περιεχομένου, **next-intl** για δίγλωσση υποστήριξη (Ελληνικά / Αγγλικά).

---

## Τεχνικό stack

| Layer | Tech |
| --- | --- |
| Frontend | Next.js 15, React 19, TypeScript 5.7 |
| Styling | Tailwind CSS 3.4, custom design system (Manrope + Inter) |
| Animations | Framer Motion 12, Lenis (smooth scroll) |
| CMS | Payload CMS 3.84, SQLite (dev), upgradeable σε PostgreSQL |
| i18n | next-intl 4 (Ελληνικά + Αγγλικά) |
| Email | (στο Task 11+ θα προστεθεί SMTP integration) |

---

## Γρήγορη εκκίνηση (πρώτη φορά)

```bash
# 1. Εγκατάσταση dependencies
npm install

# 2. Ρύθμιση environment
cp .env.example .env.local
# Επεξεργαστείτε το .env.local και βάλτε ένα τυχαίο PAYLOAD_SECRET:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 3. Generate Payload import map (πρώτη φορά μόνο)
npm run payload:generate-importmap

# 4. Seed δεδομένων (admin user, demo προϊόντα/άρθρα/categories)
npm run seed

# 5. Εκκίνηση dev server
npm run dev
```

Το site τρέχει στο **http://localhost:3000**.
Το admin panel στο **http://localhost:3000/admin**
(default credentials: `admin@activeagro.com` / `admin12345` — αλλάξτε ΑΜΕΣΩΣ).

---

## Διαθέσιμα scripts

| Script | Περιγραφή |
| --- | --- |
| `npm run dev` | Dev server με Turbopack (γρήγορο HMR) |
| `npm run dev:webpack` | Dev με Webpack (αν παρουσιαστεί ασυμβατότητα Turbopack) |
| `npm run build` | Production build |
| `npm start` | Τρέχει το production build |
| `npm run lint` | ESLint έλεγχος |
| `npm run format` | Auto-format όλου του κώδικα με Prettier |
| `npm run type-check` | TypeScript έλεγχος χωρίς build |
| `npm run seed` | Γεμίζει το CMS με demo data (idempotent) |
| `npm run payload:generate-types` | Παράγει types από το Payload schema |
| `npm run payload:generate-importmap` | Refresh του Payload admin import map |

---

## Δομή project

```
.
├── brand-assets/          # Logo, brand notes
├── public/                # Στατικά (logo, favicon, OG image)
├── messages/              # i18n translations (el.json, en.json)
├── src/
│   ├── app/
│   │   ├── (frontend)/[locale]/   # Όλες οι frontend σελίδες
│   │   │   ├── page.tsx           # Αρχική
│   │   │   ├── about/             # Η Εταιρία
│   │   │   ├── products/          # Λίστα + detail
│   │   │   ├── blog/              # Λίστα + detail
│   │   │   └── contact/           # Επικοινωνία
│   │   ├── (payload)/             # Admin panel + API
│   │   ├── actions/               # Server actions (form submissions)
│   │   ├── sitemap.ts             # /sitemap.xml
│   │   └── robots.ts              # /robots.txt
│   ├── collections/        # Payload collections (Products, BlogPosts, ...)
│   ├── globals/            # Payload globals (SiteSettings)
│   ├── components/         # Reusable UI / sections / motion
│   ├── i18n/               # next-intl config
│   ├── lib/                # Helpers (payload, queries, utils)
│   ├── seed/               # Seed script
│   ├── middleware.ts       # i18n routing middleware
│   └── payload.config.ts   # Payload CMS configuration
├── tailwind.config.ts      # Brand colors + design tokens
└── next.config.ts          # Next.js + Payload plugin
```

---

## Brand colors

Από το επίσημο logo (PDF 2026):
- **Πράσινο**: `#04542B` → `bg-brand-green`, `text-brand-green`
- **Πορτοκαλί**: `#F48120` → `bg-brand-orange`, `text-brand-orange`

Όταν φτάσει η επίσημη παλέτα, αλλάζετε **μόνο** το `tailwind.config.ts`.

---

## 📝 Οδηγός για τον διαχειριστή (CMS)

### Σύνδεση στο CMS

Πηγαίνετε στο **`http://localhost:3000/admin`** (ή `https://yourdomain.com/admin` σε production).

### Διαθέσιμα Collections

Στο αριστερό μενού του admin θα βρείτε:

#### 🌱 Προϊόντα (Προϊόντα → Προϊόντα)

Κάθε προϊόν έχει 6 tabs:
1. **Γενικά** — όνομα, slug (URL), κατηγορία, tagline, σύντομη/πλήρης περιγραφή, μορφή (κόκκοι/υγρό/κτλ), checkbox "Προβεβλημένο" για να εμφανίζεται στην αρχική
2. **Σύνθεση** — N, P, K (αυτόματο NPK label), ιχνοστοιχεία (Fe, Mn, Zn, B, Cu, Mo)
3. **Συσκευασίες** — μέγεθος + μονάδα + SKU (πολλαπλές)
4. **Εφαρμογή** — καλλιέργειες (όνομα, δοσολογία, χρόνος εφαρμογής), οδηγίες χρήσης, προφυλάξεις
5. **Φωτό & PDF** — κύρια εικόνα, gallery, datasheet PDF
6. **SEO** — meta title, meta description

**Σημαντικό**: Δίπλα από κάθε πεδίο που επισημαίνεται, υπάρχει **toggle EL/EN** στην κορυφή. Πατήστε το για να γράψετε στην άλλη γλώσσα.

#### 📰 Blog / Νέα

Τίτλος, slug, excerpt, cover image, content (rich text editor με headings, λίστες, blockquotes), tags, ημερομηνία δημοσίευσης, συντάκτης, SEO.

#### 🗂️ Κατηγορίες προϊόντων

Όνομα, slug, σύντομη περιγραφή, εικόνα, σειρά εμφάνισης (μικρότερος αριθμός = πρώτο).

#### 📁 Αρχεία

Κάθε φορά που ανεβάζετε εικόνα ή PDF (από το product / blog / κτλ), αυτή αποθηκεύεται εδώ.
**Συμβουλή**: γράψτε πάντα **alt text** στις εικόνες — βοηθά SEO και accessibility.

#### 📨 Μηνύματα Επικοινωνίας

Όλα τα μηνύματα της φόρμας του site εμφανίζονται εδώ. Μάρκαρε «Έχει απαντηθεί» όταν τα διεκπεραιώσετε.

#### ⚙️ Ρυθμίσεις Site (Global)

Στοιχεία επικοινωνίας, ώρες λειτουργίας, social links, footer text, Google Maps embed URL.
**Επηρεάζει**: Footer, Contact page, structured data SEO.

### Συχνές εργασίες

#### Πώς προσθέτω νέο προϊόν;

1. Κάντε click στο "Προϊόντα → Προϊόντα → Create New".
2. Στο tab "Γενικά": γράψτε όνομα + slug (URL-friendly, π.χ. "activagro-20-20-20"), επιλέξτε κατηγορία.
3. Στα υπόλοιπα tabs: συμπληρώστε όσα στοιχεία θέλετε (όλα προαιρετικά εκτός του ονόματος και της κατηγορίας).
4. Στο tab "Φωτό & PDF": ανεβάστε κύρια εικόνα.
5. Πατήστε **Save**. Το προϊόν εμφανίζεται αμέσως στο `/products`.
6. Για να εμφανιστεί στην αρχική: tab Γενικά → checkbox "Προβεβλημένο".
7. Για να γράψετε σε αγγλικά: αλλάξτε το toggle EL → EN στην κορυφή και ξαναγράψτε όσα είναι localized.

#### Πώς αλλάζω κείμενα της αρχικής/about;

Τα static κείμενα (hero headline, manifesto, values κτλ) βρίσκονται στα `messages/el.json` και `messages/en.json`. Για να τα αλλάξετε, χρειάζεται να επεξεργαστείτε αυτά τα αρχεία στον κώδικα.
*Σε επόμενη φάση μπορούμε να τα μεταφέρουμε στο Payload "Pages" collection ώστε να τα αλλάζετε από το CMS.*

#### Πώς αλλάζω στοιχεία επικοινωνίας στο footer;

Admin → Σύστημα → **Ρυθμίσεις Site** → Tabs «Στοιχεία», «Επικοινωνία», «Social Media», «Footer».

---

## 🚀 Deployment

Το project τρέχει σε οποιοδήποτε Node.js hosting. Ενδεικτικές επιλογές:

| Πάροχος | Όφελος |
| --- | --- |
| **Vercel** + **Railway/Render** | Vercel για το Next.js (rapid deploy), Railway/Render για PostgreSQL & uploads |
| **VPS** (Hetzner, DigitalOcean) | Full control. PM2 + nginx + Postgres |
| **Docker** | Container-based, εύκολη μεταφορά |

Για production χρειάζεται:
1. Αλλαγή SQLite → PostgreSQL (`@payloadcms/db-postgres`)
2. Αλλαγή local file storage → S3-compatible (Cloudflare R2 / DigitalOcean Spaces)
3. SMTP credentials για email αποστολή (φόρμα επικοινωνίας)
4. SSL/HTTPS (Vercel/Cloudflare αυτόματα)

---

## Roadmap

- [x] **Task 1** · Project scaffolding & βασικό setup
- [x] **Task 2** · Payload CMS & μοντέλα δεδομένων
- [x] **Task 3** · Design system & branding
- [x] **Task 4** · Δίγλωσση υποστήριξη (GR/EN)
- [x] **Task 5** · Header / Footer / Mobile menu
- [x] **Task 6** · Αρχική σελίδα
- [x] **Task 7** · Σελίδα «Η Εταιρία»
- [x] **Task 8** · Λίστα προϊόντων με φίλτρα
- [x] **Task 9** · Σελίδα προϊόντος
- [x] **Task 10** · Blog / News
- [x] **Task 11** · Επικοινωνία + Φόρμα
- [x] **Task 12** · Admin polish + Seed data
- [x] **Task 13** · SEO + sitemap + Accessibility
- [x] **Task 14** · Τελικό verification + Οδηγός λειτουργίας

## Επόμενα βήματα (post-MVP)

- [ ] Ενσωμάτωση πραγματικών SMTP credentials (Resend/Mailgun) για email αποστολή
- [ ] Migration σε PostgreSQL για production
- [ ] Cloud storage για media (S3/R2/Spaces)
- [ ] Custom Payload admin branding (logo + colors)
- [ ] Newsletter signup
- [ ] Multi-step product configurator
- [ ] E-shop functionality (αν χρειαστεί)
- [ ] Live preview για Pages

---

## Απαιτήσεις συστήματος

- Node.js **≥ 20** (συνιστάται 22)
- npm **≥ 10**

## Άδεια

Ιδιοκτησία ActiveAgro Α.Ε.
