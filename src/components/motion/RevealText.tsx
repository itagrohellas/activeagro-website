'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealTextProps {
  text: string;
  /** Καθυστέρηση πριν την έναρξη ολόκληρου του animation. */
  delay?: number;
  /** Πόσο διαφέρει η καθυστέρηση κάθε λέξης (stagger). */
  stagger?: number;
  className?: string;
  /** Element type — h1, h2, span, κτλ. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

/**
 * RevealText — staggered word-by-word reveal.
 * Κάθε λέξη μπαίνει σε δικό της reveal mask από κάτω προς τα πάνω.
 *
 * Πολύ ωραίο για hero headlines — δίνει επαγγελματικό editorial feel.
 *
 * Παράδειγμα:
 *   <RevealText text="Λιπάσματα νέας γενιάς" as="h1" className="text-display-xl" />
 */
export function RevealText({
  text,
  delay = 0,
  stagger = 0.06,
  className,
  as: Tag = 'span',
}: RevealTextProps) {
  const words = text.split(' ');
  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      className={cn('inline', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="reveal-mask">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%' },
            }}
            transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] as const }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
