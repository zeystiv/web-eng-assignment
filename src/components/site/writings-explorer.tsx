"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

import { formatPostDate } from "@/lib/data/utils";
import { cn } from "@/lib/utils";
import type { FeedItem, Platform } from "@/lib/data/writings";

const PLATFORM_ORDER: Platform[] = [
  "self",
  "systivia",
  "medium",
  "substack",
  "case-study",
  "daily-dev",
];

const PLATFORM_CONFIG: Record<Platform, { label: string; accent: string }> = {
  self: { label: "Site", accent: "var(--color-platform-blog)" },
  systivia: { label: "Systivia", accent: "var(--color-platform-systivia)" },
  medium: { label: "Medium", accent: "var(--color-platform-medium)" },
  substack: { label: "Substack", accent: "var(--color-platform-substack)" },
  "case-study": { label: "Lab", accent: "var(--color-platform-case-study)" },
  "daily-dev": {
    label: "Daily.dev",
    accent: "var(--color-platform-daily-dev)",
  },
};

type Filter = "all" | Platform;

const accentSoft = (colorVar: string) =>
  `color-mix(in oklch, ${colorVar} 55%, transparent)`;

export function WritingsExplorer({ items }: { items: FeedItem[] }) {
  const [active, setActive] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map = new Map<Platform, number>();
    for (const item of items) {
      map.set(item.platform, (map.get(item.platform) ?? 0) + 1);
    }
    return map;
  }, [items]);

  const platformsWithPosts = useMemo(
    () => PLATFORM_ORDER.filter((platform) => (counts.get(platform) ?? 0) > 0),
    [counts],
  );

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((item) => item.platform === active);
  }, [active, items]);

  const emptyMessage =
    active === "all"
      ? "No writings yet."
      : `No ${PLATFORM_CONFIG[active].label} writings yet.`;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter writings by platform"
        className="flex flex-wrap gap-2"
      >
        <FilterPill
          label="All"
          count={items.length}
          active={active === "all"}
          accentVar="var(--color-ochre)"
          onSelect={() => setActive("all")}
        />
        {platformsWithPosts.map((platform) => (
          <FilterPill
            key={platform}
            label={PLATFORM_CONFIG[platform].label}
            count={counts.get(platform) ?? 0}
            active={active === platform}
            accentVar={PLATFORM_CONFIG[platform].accent}
            onSelect={() => setActive(platform)}
          />
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"} shown
      </p>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted sm:py-16">
          {emptyMessage}
        </p>
      ) : (
        <Catalog items={filtered} />
      )}
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  accentVar,
  onSelect,
}: {
  label: string;
  count: number;
  active: boolean;
  accentVar: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      style={{ "--pill-accent": accentVar } as CSSProperties}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 font-sans text-[11px] font-medium transition-colors duration-150 sm:text-xs",
        active
          ? "border-(--pill-accent) bg-[color-mix(in_oklch,var(--pill-accent)_12%,transparent)] text-(--pill-accent)"
          : "border-border-default text-muted hover:border-(--pill-accent) hover:text-(--pill-accent)",
      )}
    >
      {label}
      <span className="tabular-nums opacity-60">{count}</span>
    </button>
  );
}

function Catalog({ items }: { items: FeedItem[] }) {
  const map = new Map<string, FeedItem[]>();
  for (const item of items) {
    const year = new Date(item.date).getFullYear().toString();
    const group = map.get(year);
    if (group) group.push(item);
    else map.set(year, [item]);
  }
  const groups = Array.from(map.entries()).sort((a, b) =>
    b[0].localeCompare(a[0]),
  );
  const showYearLabels = groups.length > 1;

  return (
    <div className="mt-8 sm:mt-10">
      {groups.map(([year, yearItems]) => (
        <div key={year} className={cn(year !== groups[0]![0] && "mt-9")}>
          {showYearLabels && (
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted sm:text-sm">
              {year}
            </p>
          )}
          <ul className="divide-y divide-border-default">
            {yearItems.map((item) => (
              <li key={item.id}>
                <CatalogRow item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CatalogRow({ item }: { item: FeedItem }) {
  const config = PLATFORM_CONFIG[item.platform];
  return (
    <Link
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
      style={
        {
          "--accent": config.accent,
          "--accent-soft": accentSoft(config.accent),
        } as CSSProperties
      }
      className="group flex flex-wrap items-baseline gap-x-4 gap-y-0.5 border-l-2 border-l-(--accent-soft) py-3 pl-4 transition-colors hover:border-l-(--accent) sm:py-4 sm:pl-5"
    >
      <span className="font-sans text-xs font-semibold text-(--accent) sm:w-20 sm:shrink-0 sm:text-sm">
        {config.label}
      </span>
      <span className="order-last w-full text-sm font-medium text-ink underline-offset-4 transition-colors group-hover:underline sm:order-none sm:min-w-0 sm:flex-1 sm:text-base lg:text-lg">
        {item.title}
      </span>
      <time className="ml-auto text-xs text-muted sm:ml-0 sm:text-sm">
        {formatPostDate(item.date)}
      </time>
    </Link>
  );
}