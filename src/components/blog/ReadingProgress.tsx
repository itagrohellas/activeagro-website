'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ReadingProgress — λεπτή πορτοκαλί γραμμή στην κορυφή που γεμίζει
 * όσο ο χρήστης διαβάζει το άρθρο. Spring smoothing για ήπια κίνηση.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-brand-orange to-brand-green"
      aria-hidden
    />
  );
}
