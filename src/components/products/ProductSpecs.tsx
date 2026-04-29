import { getTranslations } from 'next-intl/server';
import { CheckCircle2 } from 'lucide-react';

interface Micronutrient {
  name: string;
  percentage: number;
  chelated?: boolean | null;
}

interface ProductSpecsProps {
  npkLabel?: string | null;
  n?: number | null;
  p?: number | null;
  k?: number | null;
  micronutrients?: Micronutrient[] | null;
  notes?: string | null;
}

/**
 * ProductSpecs — composition table.
 * NPK σε big visual μορφή, ιχνοστοιχεία σε καθαρό πίνακα.
 */
export async function ProductSpecs({
  npkLabel,
  n,
  p,
  k,
  micronutrients,
  notes,
}: ProductSpecsProps) {
  const t = await getTranslations();
  const hasNpk = npkLabel || n != null || p != null || k != null;
  const hasMicros = micronutrients && micronutrients.length > 0;

  if (!hasNpk && !hasMicros && !notes) return null;

  return (
    <div className="rounded-4xl border border-brand-green/10 bg-white p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-brand-green sm:text-3xl">
        {t('products.detail.specsTitle')}
      </h2>

      {/* NPK big tiles */}
      {hasNpk && (
        <div className="mt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            {t('products.detail.npkLabel')}
            {npkLabel && <span className="ml-2 text-brand-ink/50">{npkLabel}</span>}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <NpkTile letter="N" value={n} label="Άζωτο" />
            <NpkTile letter="P" subscript="2O5" value={p} label="Φώσφορος" />
            <NpkTile letter="K" subscript="2O" value={k} label="Κάλιο" />
          </div>
        </div>
      )}

      {/* Micronutrients table */}
      {hasMicros && (
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            {t('products.detail.micronutrients')}
          </p>
          <div className="mt-3 overflow-hidden rounded-2xl border border-brand-green/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-cream">
                <tr>
                  <th className="px-4 py-3 font-medium text-brand-ink/70">
                    {t('products.detail.elementColumn')}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-brand-ink/70">
                    {t('products.detail.percentageColumn')}
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-brand-ink/70">
                    {t('products.detail.chelated')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {micronutrients.map((m, i) => (
                  <tr key={i} className="border-t border-brand-green/5 transition hover:bg-brand-cream/40">
                    <td className="px-4 py-3 font-mono font-semibold text-brand-green">{m.name}</td>
                    <td className="px-4 py-3 text-right font-mono tabular-nums text-brand-ink">
                      {m.percentage}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      {m.chelated ? (
                        <CheckCircle2 className="ml-auto size-4 text-brand-orange" />
                      ) : (
                        <span className="text-brand-ink/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Composition notes */}
      {notes && <p className="mt-6 text-sm text-brand-ink/65 italic">{notes}</p>}
    </div>
  );
}

function NpkTile({
  letter,
  subscript,
  value,
  label,
}: {
  letter: string;
  subscript?: string;
  value?: number | null;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-brand-green/15 bg-brand-cream/50 p-4 text-center">
      <p className="font-display text-sm font-bold text-brand-green/60">
        {letter}
        {subscript && <sub className="text-xs">{subscript}</sub>}
      </p>
      <p className="mt-2 font-display text-3xl font-black tabular-nums text-brand-green sm:text-4xl">
        {value != null ? `${value}%` : '—'}
      </p>
      <p className="mt-1 text-xs text-brand-ink/50">{label}</p>
    </div>
  );
}
