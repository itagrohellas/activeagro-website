'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';

interface Milestone {
  year: string;
  title: string;
  body: string;
}

/**
 * Timeline — διαδραστικό χρονολόγιο με scroll-driven animation.
 *
 * Καθώς γίνεται scroll, μια κάθετη γραμμή «γεμίζει» από πάνω προς τα κάτω,
 * και κάθε milestone ξεκλειδώνεται όταν φτάσει στο σημείο του.
 *
 * Layout: alternating left/right σε desktop (zigzag), single column σε mobile.
 */
export function Timeline() {
  const t = useTranslations();
  const milestones = t.raw('about.timeline.milestones') as Milestone[];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 30%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Section spacing="lg" tone="white">
      <Container>
        {/* Header */}
        <div className="mb-16 text-center">
          <Eyebrow variant="green" className="mb-6">
            {t('about.timeline.eyebrow')}
          </Eyebrow>
          <Heading as="h2" size="lg" flavor="wonky" className="mx-auto max-w-3xl text-brand-green">
            {t('about.timeline.heading')}
          </Heading>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mx-auto max-w-5xl">
          {/* Static background line */}
          <div
            aria-hidden
            className="absolute left-6 top-0 h-full w-0.5 bg-brand-green/10 lg:left-1/2 lg:-translate-x-1/2"
          />
          {/* Animated progress line */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-0.5 origin-top bg-gradient-to-b from-brand-orange to-brand-green lg:left-1/2 lg:-translate-x-1/2"
          />

          {/* Milestones */}
          <ul className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={milestone.year} className="relative">
                  <MilestoneRow milestone={milestone} index={i} isLeft={isLeft} />
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

interface MilestoneRowProps {
  milestone: Milestone;
  index: number;
  isLeft: boolean;
}

function MilestoneRow({ milestone, isLeft }: MilestoneRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 50%'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [isLeft ? -30 : 30, 0]);

  return (
    <div ref={ref} className="relative flex gap-6 pb-12 lg:gap-0 lg:pb-24">
      {/* Mobile: dot on left.  Desktop: in middle. */}
      <div className="absolute left-6 top-3 z-10 lg:left-1/2 lg:-translate-x-1/2">
        <span className="block size-3.5 rounded-full bg-brand-orange ring-4 ring-brand-cream" />
      </div>

      {/* Mobile spacer (gives room for the dot) */}
      <div className="w-12 shrink-0 lg:hidden" />

      {/* Content */}
      <motion.div
        style={{ opacity, x }}
        className={`w-full lg:w-[calc(50%-3rem)] ${
          isLeft ? 'lg:mr-auto lg:pr-12 lg:text-right' : 'lg:ml-auto lg:pl-12'
        }`}
      >
        <p className="font-display text-display-md font-extrabold leading-none tracking-tight text-brand-orange display-tight">
          {milestone.year}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold text-brand-green sm:text-3xl">
          {milestone.title}
        </h3>
        <p className="mt-3 max-w-md text-brand-ink/70 lg:max-w-none">{milestone.body}</p>
      </motion.div>
    </div>
  );
}
