"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import { ImageLightbox } from "@/components/site/image-lightbox";

type Screenshot = { src: string; alt: string };

export function ScreenshotCarousel({ screenshots }: { screenshots: Screenshot[] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setVisibleCount(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const maxIndex = Math.max(0, screenshots.length - visibleCount);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex]
  );

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const offset = -(index * (100 / visibleCount));

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${offset}%)` }}
        >
          {screenshots.map((shot, i) => (
            <div
              key={shot.src}
              className="w-full shrink-0 px-1.5 lg:w-1/3"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                className="relative block aspect-[9/19.5] w-full cursor-pointer overflow-hidden rounded-xl border border-border-default"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {index > 0 && (
        <button
          onClick={prev}
          aria-label="Previous screenshots"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border-default bg-surface text-muted transition-colors hover:text-ochre"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}
      {index < maxIndex && (
        <button
          onClick={next}
          aria-label="Next screenshots"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border-default bg-surface text-muted transition-colors hover:text-ochre"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to screenshot group ${i + 1}`}
            className={`h-1.5 cursor-pointer rounded-full transition-all ${
              i === index
                ? "w-5 bg-ochre"
                : "w-1.5 bg-border-default hover:bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          screenshots={screenshots}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
