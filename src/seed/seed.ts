/**
 * ΑΥΤΟ ΤΟ ΑΡΧΕΙΟ ΕΧΕΙ ΑΠΟΣΥΡΘΕΙ.
 *
 * Η seed logic μεταφέρθηκε σε ./seedData.ts ως reusable function,
 * και εκτελείται μέσω Next.js API route στο /api/seed
 * (αντί για standalone tsx script που έβρισκε σε bug του Payload's loadEnv).
 *
 * Νέος τρόπος:
 *   1. Ξεκίνα τον dev server: npm run dev
 *   2. Σε νέο terminal: npm run seed
 *   (ή απλά POST στο http://localhost:3000/api/seed)
 */
export {};
