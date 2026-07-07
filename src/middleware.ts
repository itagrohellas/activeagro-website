import { NextResponse, type NextRequest } from 'next/server';

/**
 * ΠΡΟΣΩΡΙΝΗ ΣΥΝΤΗΡΗΣΗ
 * ---------------------------------------------------------------
 * Το middleware αυτό αντικαθιστά προσωρινά όλο το public frontend
 * με μια στατική σελίδα "Έρχεται σύντομα" (ValueFert), ενώ γίνεται
 * συντήρηση στο κυρίως site.
 *
 * Για επαναφορά στο κανονικό site:
 *   git checkout pre-maintenance-backup -- src/middleware.ts
 *   git commit -m "Επαναφορά site μετά τη συντήρηση"
 *   git push origin main
 *
 * (Το branch "pre-maintenance-backup" έχει ολόκληρο το snapshot
 * του site πριν από αυτή την αλλαγή.)
 * ---------------------------------------------------------------
 */

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="el">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ValueFert — Έρχεται σύντομα</title>
<meta name="description" content="ValueFert — Προηγμένη θρέψη φυτών. Η νέα μας σελίδα έρχεται σύντομα.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600&family=Instrument+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --green-deep: #0C2E22;
    --green-mid:  #14402F;
    --leaf:       #8FD14F;
    --ivory:      #EFEAD8;
    --ivory-dim:  rgba(239, 234, 216, 0.62);
    --soil:       #3E2F23;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body { height: 100%; }

  body {
    font-family: "Instrument Sans", system-ui, sans-serif;
    background: radial-gradient(120% 140% at 50% 120%, var(--green-mid) 0%, var(--green-deep) 55%, #081F17 100%);
    color: var(--ivory);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem 1.5rem;
    text-align: center;
  }

  .sprout {
    width: 72px;
    height: 96px;
    margin-bottom: 2.2rem;
  }

  .sprout path {
    fill: none;
    stroke: var(--leaf);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .sprout .stem   { stroke-dasharray: 90;  stroke-dashoffset: 90;  animation: grow 1.1s ease-out forwards 0.2s; }
  .sprout .leaf-l { stroke-dasharray: 70;  stroke-dashoffset: 70;  animation: grow 0.9s ease-out forwards 1.0s; }
  .sprout .leaf-r { stroke-dasharray: 70;  stroke-dashoffset: 70;  animation: grow 0.9s ease-out forwards 1.3s; }

  @keyframes grow { to { stroke-dashoffset: 0; } }

  .eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--leaf);
    margin-bottom: 1.1rem;
    font-weight: 500;
  }

  h1 {
    font-family: "Fraunces", serif;
    font-weight: 300;
    font-size: clamp(2.6rem, 7vw, 4.6rem);
    letter-spacing: -0.01em;
    line-height: 1.05;
  }

  h1 strong {
    font-weight: 600;
    color: var(--leaf);
    font-style: normal;
  }

  .tagline {
    max-width: 34rem;
    margin: 1.4rem auto 0;
    font-size: clamp(1rem, 2.4vw, 1.15rem);
    line-height: 1.65;
    color: var(--ivory-dim);
  }

  .divider {
    width: 56px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--leaf), transparent);
    margin: 2.4rem auto;
    opacity: 0.7;
  }

  .contact {
    font-size: 0.95rem;
    color: var(--ivory-dim);
  }

  .contact a {
    color: var(--ivory);
    text-decoration: none;
    border-bottom: 1px solid var(--leaf);
    padding-bottom: 1px;
    transition: color 0.2s ease;
  }

  .contact a:hover,
  .contact a:focus-visible {
    color: var(--leaf);
    outline: none;
  }

  .contact a:focus-visible {
    outline: 2px solid var(--leaf);
    outline-offset: 3px;
    border-bottom-color: transparent;
  }

  footer {
    position: fixed;
    bottom: 1.4rem;
    left: 0;
    right: 0;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    color: rgba(239, 234, 216, 0.35);
  }

  @media (prefers-reduced-motion: reduce) {
    .sprout .stem, .sprout .leaf-l, .sprout .leaf-r {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
</style>
</head>
<body>

  <svg class="sprout" viewBox="0 0 72 96" aria-hidden="true">
    <path class="stem"   d="M36 92 C36 70 36 52 36 34"/>
    <path class="leaf-l" d="M36 52 C24 48 12 38 10 22 C26 24 36 36 36 52"/>
    <path class="leaf-r" d="M36 40 C48 36 60 26 62 10 C46 12 36 24 36 40"/>
  </svg>

  <p class="eyebrow">Θρέψη φυτών · Λιπάσματα</p>

  <h1>Value<strong>Fert</strong></h1>

  <p class="tagline">
    Η νέα μας σελίδα καλλιεργείται αυτή τη στιγμή.
    Σύντομα κοντά σας με ολοκληρωμένες λύσεις θρέψης για κάθε καλλιέργεια.
  </p>

  <div class="divider"></div>

  <p class="contact">
    Για πληροφορίες: <a href="mailto:info@valuefert.gr">info@valuefert.gr</a>
  </p>

  <footer>© 2026 ValueFert. Με επιφύλαξη παντός δικαιώματος.</footer>

</body>
</html>
`;

export default function middleware(_request: NextRequest) {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

/**
 * Matcher: εφαρμόζεται σε όλες τις public σελίδες.
 * Εξαιρούμε /admin και /api ώστε το Payload CMS admin panel
 * να παραμείνει προσβάσιμο κατά τη διάρκεια της συντήρησης.
 */
export const config = {
  matcher: ['/((?!admin|api|_next|_vercel|.*\\..*).*)'],
};
