import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { Marquee } from '@/components/motion/Marquee';
import { Sprout } from 'lucide-react';

/**
 * CropsMarquee — ατέλειωτο banner με τα ονόματα καλλιεργειών
 * που εξυπηρετεί η εταιρία.
 */
export async function CropsMarquee() {
  const t = await getTranslations();
  const crops = t.raw('marquee.crops') as string[];

  return (
    <Section spacing="sm" tone="green" className="overflow-hidden">
      <Marquee speed="medium">
        {crops.map((crop) => (
          <span
            key={crop}
            className="inline-flex items-center gap-6 font-display text-display-md font-black italic text-brand-cream/80"
          >
            {crop}
            <Sprout className="size-10 text-brand-orange" />
          </span>
        ))}
      </Marquee>
    </Section>
  );
}
