import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * Global loading skeleton — εμφανίζεται όταν αλλάζει σελίδα.
 * Έχει το ίδιο γενικό shape με τις σελίδες ώστε να μη φαίνεται απότομη η μετάβαση.
 */
export default function Loading() {
  return (
    <Section spacing="md" className="pt-32 sm:pt-40">
      <Container>
        <div className="animate-pulse">
          {/* Eyebrow */}
          <div className="mb-6 h-7 w-40 rounded-full bg-brand-green/10" />

          {/* Heading */}
          <div className="space-y-3">
            <div className="h-12 w-3/4 rounded-lg bg-brand-green/15 sm:h-16" />
            <div className="h-12 w-1/2 rounded-lg bg-brand-green/10 sm:h-16" />
          </div>

          {/* Body */}
          <div className="mt-8 space-y-2">
            <div className="h-5 w-full max-w-2xl rounded bg-brand-ink/5" />
            <div className="h-5 w-full max-w-xl rounded bg-brand-ink/5" />
          </div>

          {/* Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4 rounded-3xl bg-white p-6">
                <div className="aspect-[16/10] rounded-2xl bg-brand-cream" />
                <div className="h-4 w-1/3 rounded bg-brand-orange/20" />
                <div className="h-6 w-3/4 rounded bg-brand-green/15" />
                <div className="h-4 w-full rounded bg-brand-ink/5" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
