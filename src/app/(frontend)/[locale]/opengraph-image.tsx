import { ImageResponse } from 'next/og';

/**
 * OG image generator για το root locale page.
 *
 * Δυναμικά παράγεται μια εικόνα 1200×630 με logo + tagline,
 * που χρησιμοποιείται για social previews (Facebook, X, LinkedIn).
 *
 * Available στο: /el/opengraph-image, /en/opengraph-image
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'linear-gradient(135deg, #04542B 0%, #00240F 100%)',
          color: '#FAF7F2',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top: small wordmark */}
        <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', display: 'flex' }}>
          <span style={{ color: '#FAF7F2' }}>Active</span>
          <span style={{ color: '#F48120' }}>Agro</span>
        </div>

        {/* Middle: big tagline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#FAF7F2',
            }}
          >
            Λιπάσματα
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#F48120',
              fontStyle: 'italic',
            }}
          >
            νέας γενιάς
          </div>
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: 'rgba(250, 247, 242, 0.7)',
          }}
        >
          <span>activeagro.com</span>
          <span>Από το 1995</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
