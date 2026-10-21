import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  descriptionClassName,
  className,
}: {
  title: string;
  description?: string;
  descriptionClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto", className)}>
      <h1 className="font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className={cn("mt-4 text-lg text-ink-soft", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
