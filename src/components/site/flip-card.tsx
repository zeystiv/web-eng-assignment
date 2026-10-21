"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FlipCard({
  front,
  back,
  className,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-label="Flip card"
      className={cn(
        "group relative cursor-pointer [perspective:800px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg border border-border-default bg-surface/60 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg border border-accent-border bg-accent-soft-bg p-6 sm:p-8 flex flex-col items-center justify-center text-center">
          {back}
        </div>
      </div>
    </button>
  );
}
