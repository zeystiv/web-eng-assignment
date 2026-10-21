"use client";

import { useEffect, useState } from "react";

import { ScrollLink } from "@/components/site/scroll-link";

type Item = { id: string; label: string };

const items: Item[] = [
  { id: "screenshots", label: "Screenshots" },
  { id: "the-problem", label: "The Problem" },
  { id: "why-you-fail", label: "Why You Fail" },
  { id: "why-trackers-fail", label: "Why Trackers Fail" },
  { id: "start-with-who", label: "Start With Who" },
  { id: "what-systivia-does", label: "What Systivia Does" },
  { id: "why-this-matters", label: "A Confession" },
  { id: "timeline", label: "Timeline" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "faq", label: "FAQ" },
];

export function PageTOC() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const renderList = (items: Item[]) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <ScrollLink
            targetId={item.id}
            className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
              active === item.id
                ? "bg-accent-soft-bg font-medium text-ochre"
                : "text-muted hover:bg-surface hover:text-ink-soft"
            }`}
          >
            {item.label}
          </ScrollLink>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="sticky top-28">
      <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        On the page
      </p>
      {renderList(items)}
    </nav>
  );
}
