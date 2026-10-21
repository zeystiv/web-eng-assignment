"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

type Screenshot = { src: string; alt: string };

export function ImageLightbox({
  screenshots,
  initialIndex,
  onClose,
}: {
  screenshots: Screenshot[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : screenshots.length - 1));
    resetView();
  }, [screenshots.length, resetView]);

  const next = useCallback(() => {
    setIndex((i) => (i < screenshots.length - 1 ? i + 1 : 0));
    resetView();
  }, [screenshots.length, resetView]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setZoom((z) => {
      const next = Math.min(3, Math.max(0.5, z + delta));
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (zoom <= 1) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  }, [zoom, pan]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (zoom > 1) {
      resetView();
    } else {
      setZoom(2.5);
    }
  }, [zoom, resetView]);

  const shot = screenshots[index];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
      onWheel={handleWheel}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className="absolute left-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className="absolute right-4 z-10 grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className={`relative max-h-[85vh] max-w-[90vw] select-none ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={900}
          height={1950}
          className="h-auto max-h-[85vh] w-auto rounded-lg object-contain"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transition: dragRef.current ? "none" : "transform 0.2s ease-out",
          }}
          draggable={false}
          priority
        />
      </div>

      {/* Zoom + counter */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(0.5, z - 0.25)); if (zoom <= 1.25) setPan({ x: 0, y: 0 }); }}
          aria-label="Zoom out"
          className="cursor-pointer font-bold transition-opacity hover:opacity-70"
        >
          &minus;
        </button>
        <span className="min-w-[3rem] text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(3, z + 0.25)); }}
          aria-label="Zoom in"
          className="cursor-pointer font-bold transition-opacity hover:opacity-70"
        >
          +
        </button>
        <span className="mx-1 h-4 w-px bg-white/30" />
        <span>{index + 1} / {screenshots.length}</span>
      </div>
    </div>
  );
}
