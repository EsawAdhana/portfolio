'use client';

import Image from 'next/image';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProjectImageCarouselProps = {
  images: string[];
  /** Used in alt text, e.g. "Stanford Root screenshot 1 of 5" */
  label: string;
};

export function ProjectImageCarousel({ images, label }: ProjectImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const n = images.length;

  const go = useCallback(
    (delta: -1 | 1) => {
      setIndex((i) => (i + delta + n) % n);
    },
    [n]
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
    },
    [go]
  );

  if (n === 0) return null;

  const current = images[index];

  return (
    <div
      className="border border-[color:var(--border)] bg-[color:var(--surface-alt)] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} screenshots. Use arrow keys or buttons to change image.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="relative aspect-[16/10] w-full min-h-[200px] max-h-[min(62vh,440px)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={current}
              alt={`${label} screenshot ${index + 1} of ${n}`}
              fill
              className="object-contain object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, min(1100px, 85vw)"
              unoptimized
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--border-subtle)] px-3 py-2.5">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-[color:var(--border)] text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)]"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Screenshot index">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Screenshot ${i + 1} of ${n}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index
                  ? 'bg-[color:var(--accent)]'
                  : 'bg-[color:var(--border-subtle)] hover:bg-[color:var(--muted)]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-[color:var(--border)] text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--foreground)] hover:text-[color:var(--background)]"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
