import type { Config } from 'tailwindcss';

/**
 * ActiveAgro Tailwind config
 *
 * Brand colors extracted directly from the official 2026 logo PDF.
 * Όταν φτάσει η επίσημη παλέτα από τον πελάτη, αλλάζουμε ΜΟΝΟ τις τιμές
 * `brand.green.DEFAULT` και `brand.orange.DEFAULT` και ενημερώνεται όλο το site.
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Επίσημο πράσινο ActiveAgro (#04542B)
          green: {
            DEFAULT: '#04542B',
            50: '#E6F0EA',
            100: '#BFDCC8',
            200: '#85B998',
            300: '#4A9568',
            400: '#1A7242',
            500: '#04542B',
            600: '#044626',
            700: '#03351E',
            800: '#022417',
            900: '#01130D',
          },
          // Επίσημο πορτοκαλί ActiveAgro (#F48120)
          orange: {
            DEFAULT: '#F48120',
            50: '#FEF2E7',
            100: '#FCDCBA',
            200: '#F9B673',
            300: '#F6943E',
            400: '#F58A2C',
            500: '#F48120',
            600: '#D87016',
            700: '#A85610',
            800: '#763C0B',
            900: '#452306',
          },
          ink: '#0A0E0B',
          cream: '#FAF7F2',
          earth: '#3D2914', // ζεστό σκούρο για copy
          sky: '#E8F0F4', // ψυχρό off-white για sections
        },
      },
      fontFamily: {
        // Συνδεδεμένες με next/font CSS variables
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display sizes με tighter line-height
        'display-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'display-lg': ['5rem', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-xl': ['7rem', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-2xl': ['9rem', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
        screens: {
          '2xl': '1440px',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        // Soft floating για decorative elements
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        // Marquee scrolling
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Subtle bounce for icons
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        // Reveal mask animation
        'reveal-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        // Subtle gradient shift
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-fast': 'marquee 15s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M40 0H0V40' fill='none' stroke='%2304542B' stroke-opacity='0.06'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
