'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GalleryImage {
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
  productName: string;
}

/**
 * ProductGallery — interactive image switcher.
 * Κύρια εικόνα μεγάλη + thumbnails δεξιά (desktop) ή κάτω (mobile).
 * Click στο thumbnail → cross-fade στη μεγάλη εικόνα.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback αν δεν υπάρχει εικόνα
  if (images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-cream">
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-9xl font-black text-brand-green/15">AA</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:gap-5">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-cream lg:order-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].alt || productName}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-brand-green/90 px-3 py-1 font-mono text-xs font-medium text-brand-cream backdrop-blur">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Image ${i + 1}`}
              aria-pressed={i === activeIndex}
              className={cn(
                'relative size-20 shrink-0 overflow-hidden rounded-2xl transition lg:size-24',
                i === activeIndex
                  ? 'ring-2 ring-brand-orange ring-offset-2 ring-offset-brand-cream'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || productName}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
