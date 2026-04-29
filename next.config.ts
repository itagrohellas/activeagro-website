import type { NextConfig } from 'next';
import path from 'path';
import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl plugin — δέχεται το path στο request config
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Αποφεύγει το warning "multiple lockfiles" από άλλο package-lock.json στο user home.
  outputFileTracingRoot: path.resolve(__dirname),

  images: {
    remotePatterns: [
      // Επιτρέπουμε εικόνες που σερβίρει το ίδιο το Payload από /api/media
      { protocol: 'http', hostname: 'localhost' },
      // Tunnel domains (για να δουλεύει το next/image μέσω ngrok/Cloudflare)
      { protocol: 'https', hostname: '**.ngrok-free.app' },
      { protocol: 'https', hostname: '**.ngrok.io' },
      { protocol: 'https', hostname: '**.trycloudflare.com' },
      { protocol: 'https', hostname: '**.loca.lt' },
    ],
  },

  // Επιτρέπει σε external host headers (tunnel URLs) να φτάσουν στο Next.js dev
  // Διαφορετικά το Next μπορεί να μπλοκάρει με "Invalid Host header"
  allowedDevOrigins: [
    'localhost',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.trycloudflare.com',
    '*.loca.lt',
  ],

  experimental: {
    // typedRoutes: true,
    // Tree-shake των heavy libs ώστε να μη φορτώνουμε όλο το package
    optimizePackageImports: ['lucide-react', 'framer-motion', 'lenis'],
  },
};

// Wrap με next-intl ΠΡΩΤΑ (εσωτερικό), μετά Payload (εξωτερικό).
export default withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
});
