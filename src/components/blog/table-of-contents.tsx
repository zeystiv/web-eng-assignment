"use client";

import { useEffect, useState } from "react";

import { ScrollLink } from "@/components/site/scroll-link";
import type { Heading } from "@/lib/data/utils";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border-default">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <ScrollLink
              targetId={h.id}
              className={`-ml-px block border-l-2 py-1 pl-3 transition-colors ${
                active === h.id
                  ? "border-ochre bg-accent-soft-bg/60 font-medium text-ochre"
                  : "border-transparent text-muted hover:text-ink-soft"
              }`}
            >
              {h.text}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}