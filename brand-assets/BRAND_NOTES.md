# ActiveAgro — Brand Assets

## Logo
- `active-agro-logo-2026.pdf` — Original PDF από τον πελάτη
- `active-agro-logo.png` — PNG export (1934×792, 300dpi) για χρήση στο web

## Επίσημη Παλέτα Χρωμάτων

| Role | HEX | RGB | CSS class |
|------|-----|-----|-----------|
| Primary Green | `#04542B` | `4, 84, 43` | `bg-brand-green` / `text-brand-green` |
| Accent Orange | `#F48120` | `244, 129, 32` | `bg-brand-orange` / `text-brand-orange` |
| Cream | `#FAF7F2` | — | `bg-brand-cream` (ζεστό off-white) |
| Sky | `#E8F0F4` | — | `bg-brand-sky` (ψυχρό off-white) |
| Earth | `#3D2914` | — | `bg-brand-earth` (βαθύ καφέ) |
| Ink | `#0A0E0B` | — | `text-brand-ink` (βασικό κείμενο) |

## Tonal Scale

Κάθε brand color έχει 50–900 shades για flexibility (π.χ. `bg-brand-green-100`, `text-brand-orange-700`).

## Status
- [x] Logo received (PDF)
- [x] PNG version extracted (διαφανές + light variant για dark backgrounds)
- [x] Επίσημη παλέτα ενσωματωμένη
- [ ] SVG logo (προαιρετικό — για ακόμα καλύτερα scalable rendering)

## Notes
- Όλα τα brand colors βρίσκονται στο `tailwind.config.ts` ως single source of truth
- Σε αλλαγή παλέτας, ενημερώνετε ΜΟΝΟ το `tailwind.config.ts` και ενημερώνεται όλο το site
