import { NextResponse } from 'next/server';
import { getPayload } from '@/lib/payload';
import { runSeed } from '@/seed/seedData';

/**
 * POST /api/seed
 *
 * Τρέχει το seed inside Next.js context (αποφεύγει τα bugs που έχει το Payload's
 * loadEnv όταν τρέχει εκτός Next.js).
 *
 * Auth: Bearer token από Authorization header ή ?token= query param.
 * Έγκυρο token = process.env.SEED_TOKEN. Σε dev (development), αν δεν έχει
 * οριστεί SEED_TOKEN, επιτρέπεται χωρίς auth.
 *
 * Χρήση: άνοιξε στο browser http://localhost:3000/api/seed (GET → instructions)
 *        ή POST: curl -X POST http://localhost:3000/api/seed
 */
export async function POST(request: Request) {
  // Auth check
  const url = new URL(request.url);
  const queryToken = url.searchParams.get('token');
  const headerToken = request.headers.get('authorization')?.replace(/^Bearer\s+/, '');
  const providedToken = queryToken || headerToken;

  const expectedToken = process.env.SEED_TOKEN;
  const isDev = process.env.NODE_ENV !== 'production';

  if (expectedToken && providedToken !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!expectedToken && !isDev) {
    return NextResponse.json(
      { error: 'SEED_TOKEN must be set in production' },
      { status: 401 },
    );
  }

  try {
    const payload = await getPayload();
    const result = await runSeed(payload);

    return NextResponse.json({
      ok: true,
      log: result.log,
      errors: result.errors,
      admin: {
        email: result.adminEmail,
        password: result.adminPassword,
      },
    });
  } catch (err) {
    console.error('[seed] failed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to run the seed',
    usage: 'curl -X POST http://localhost:3000/api/seed',
    note: 'In production, set SEED_TOKEN env var and add ?token=... or Authorization: Bearer header',
  });
}
