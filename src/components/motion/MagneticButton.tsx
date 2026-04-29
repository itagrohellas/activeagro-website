'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  /** Πόσο "κολλάει" στο cursor. Μεγαλύτερο = πιο έντονο. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic — wrapper που τραβάει το child προς το cursor όταν το mouse πλησιάζει.
 * Χρήσιμο για CTA buttons, social icons, ή logo.
 *
 * Έχει spring physics για soft feel — όχι hard-snap.
 */
export function Magnetic({ children, strength = 25, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const x = useSpring(useTransform(mouseX, (v) => v * strength), springConfig);
  const y = useSpring(useTransform(mouseY, (v) => v * strength), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
