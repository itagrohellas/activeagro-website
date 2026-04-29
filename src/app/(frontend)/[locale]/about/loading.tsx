import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

/**
 * Loading skeleton για /about.
 * Εμφανίζεται instant την ώρα που compileτεται/φετσάρεται η σελίδα.
 */
export default function AboutLoading() {
  return (
    <Section spacing="xl" className="pt-32 sm:pt-40">
      <Container>
        <div className="animate-pulse">
          {/* Eyebrow */}
          <div className="mb-6 h-7 w-32 rounded-full bg-brand-orange/15" />
          {/* Big heading lines */}
          <div className="space-y-4">
            <div className="h-16 w-2/3 rounded-lg bg-brand-green/15 sm:h-20" />
            <div className="h-16 w-1/2 rounded-lg bg-brand-orange/15 sm:h-20" />
          </div>
          {/* Intro paragraph */}
          <div className="mt-12 space-y-3">
            <div className="h-5 w-full max-w-3xl rounded bg-brand-ink/10" />
            <div className="h-5 w-full max-w-2xl rounded bg-brand-ink/10" />
            <div className="h-5 w-2/3 max-w-xl rounded bg-brand-ink/10" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
