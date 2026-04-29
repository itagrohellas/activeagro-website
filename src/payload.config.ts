import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users.ts';
import { Media } from './collections/Media.ts';
import { Categories } from './collections/Categories.ts';
import { Products } from './collections/Products.ts';
import { BlogPosts } from './collections/BlogPosts.ts';
import { Pages } from './collections/Pages.ts';
import { ContactSubmissions } from './collections/ContactSubmissions.ts';
import { SiteSettings } from './globals/SiteSettings.ts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Επιλογή database adapter βάσει του DATABASE_URI:
 *  - postgres:// ή postgresql://  → Postgres (production / Vercel + Neon)
 *  - οτιδήποτε άλλο (file:..)      → SQLite (local development)
 */
const databaseUri = process.env.DATABASE_URI || 'file:./activeagro.db';
const isPostgres = databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://');

const dbAdapter = isPostgres
  ? postgresAdapter({
      pool: { connectionString: databaseUri },
    })
  : sqliteAdapter({
      client: { url: databaseUri },
    });

/**
 * Storage plugins — προστίθενται μόνο όταν τα env vars είναι set.
 * Vercel Blob: αν είναι set το BLOB_READ_WRITE_TOKEN, τα uploads πάνε εκεί.
 * Αλλιώς, fallback σε local filesystem (dev).
 */
const storagePlugins =
  process.env.BLOB_READ_WRITE_TOKEN != null
    ? [
        vercelBlobStorage({
          enabled: true,
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
      ]
    : [];

/**
 * Payload CMS configuration
 *
 * - Admin panel: /admin
 * - REST API: /api/*
 * - GraphQL: /api/graphql
 * - Localization: Ελληνικά (default) + Αγγλικά
 *
 * Database: αυτόματη επιλογή SQLite (dev) ή Postgres (production)
 * Storage: αυτόματη επιλογή local filesystem (dev) ή Vercel Blob (production)
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: '— ActiveAgro CMS' },
    components: {},
  },

  collections: [Users, Media, Categories, Products, BlogPosts, Pages, ContactSubmissions],

  globals: [SiteSettings],

  localization: {
    locales: [
      { label: 'Ελληνικά', code: 'el' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'el',
    fallback: true,
  },

  editor: lexicalEditor(),

  db: dbAdapter,

  plugins: storagePlugins,

  sharp,

  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // CORS / CSRF
  cors:
    process.env.NODE_ENV === 'production'
      ? [process.env.NEXT_PUBLIC_SITE_URL || 'https://valuefert.com']
      : '*',
  csrf:
    process.env.NODE_ENV === 'production'
      ? [
          process.env.NEXT_PUBLIC_SITE_URL || 'https://valuefert.com',
          'https://valuefert.com',
          'https://www.valuefert.com',
        ]
      : [
          'http://localhost:3000',
          'https://*.ngrok-free.app',
          'https://*.ngrok.io',
          'https://*.trycloudflare.com',
          'https://*.loca.lt',
          'https://*.vercel.app',
        ],
});
