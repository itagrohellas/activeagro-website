'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Καθυστέρηση πριν την έναρξη του animation (sec). */
  delay?: number;
  /** Από πού «μπαίνει»: up = από κάτω, down = από πάνω, etc. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Πόσο μετακινείται κατά την είσοδο (px). */
  distance?: number;
  /** Διάρκεια animation (sec). */
  duration?: number;
}

const directions = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: 30, y: 0 },
  right: { x: -30, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * FadeIn — wrapper που κάνει fade + slide reveal όταν το element έρθει στο viewport.
 *
 * Παράδειγμα:
 *   <FadeIn delay={0.1} from="up">
 *     <Heading>...</Heading>
 *   </FadeIn>
 */
export function FadeIn({
  children,
  delay = 0,
  from = 'up',
  distance = 30,
  duration = 0.7,
  ...props
}: FadeInProps) {
  const dir = directions[from];
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: dir.x ? (dir.x / 30) * distance : 0,
        y: dir.y ? (dir.y / 30) * distance : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
