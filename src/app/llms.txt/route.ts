import { listWritings } from "@/lib/data/writings";
import { env } from "@/lib/env";
import { socials } from "@/lib/socials";

export const dynamic = "force-static";

const lastModified = new Date("2026-09-30T00:00:00Z").toUTCString();

const platformLabel: Record<string, string> = {
  self: "Published on this site",
  medium: "Published on Medium",
  substack: "Published on Substack",
  systivia: "Published on systivia.com",
  "case-study": "Case study, hosted here",
  "daily-dev": "Published on daily.dev",
};

/** "A", "A and B", "A, B, and C" — for reading a list of platforms in prose. */
function joinWithAnd(items: string[]): string {
  if (items.length < 2) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * Prose name of a platform. "X / Twitter" reads as just "X" in a sentence, so
 * only the first name is used when a label carries more than one.
 */
function proseName(label: string): string {
  return label.split(" / ")[0];
}

/**
 * Groups platforms by the handle used there, preserving the order of
 * `socials`, e.g. "@zeystiv on GitHub, X, and Substack".
 */
function handlesByPlatform() {
  const groups = new Map<string, string[]>();

  for (const s of socials) {
    if (!s.handle) continue;
    const platforms = groups.get(s.handle) ?? [];
    platforms.push(proseName(s.label));
    groups.set(s.handle, platforms);
  }

  return [...groups].map(
    ([handle, platforms]) => `**@${handle}** on ${joinWithAnd(platforms)}`,
  );
}

export async function GET() {
  const writings = await listWritings();
  const siteUrl = env.siteUrl.replace(/\/$/, "");

  const lines: string[] = [];

  lines.push("# Rao Zaeem");
  lines.push("");
  lines.push(
    "> Full-stack developer, founder-engineer, and writer. Building systems that compound.",
  );
  lines.push("");
  lines.push(
    "Personal website of Rao Zaeem — an honest record of self-improvement. The guiding philosophy: healing by bringing awareness, progress by intentional effort. Writing it down, clearly.",
  );
  lines.push("");
  lines.push(
    `Online, I use a different handle depending on the platform: ${joinWithAnd(
      handlesByPlatform(),
    )}.`,
  );
  lines.push("");

  // Social links — generated from @/lib/socials so this never drifts from the
  // links rendered on the site
  lines.push("## Connect");
  lines.push("");
  for (const s of socials) {
    const handle = s.handle ? ` — @${s.handle}.` : "";
    lines.push(`- [${s.label}](${s.url})${handle}`);
  }
  lines.push("");

  // About
  lines.push("## About");
  lines.push("");
  lines.push(
    "- [Home](/) — The landing page: the site's philosophy and purpose, a feed of recent writing, a highlight of the latest project, and a newsletter signup.",
  );
  lines.push("");

  // Lab
  lines.push("## Lab");
  lines.push("");
  lines.push(
    "- [Lab overview](/lab) — Portfolio of projects, toolkit, and everyday setup.",
  );
  lines.push(
    "- [Systivia](/lab/systivia) — An identity-driven habit tracker for Android that turns daily actions into proof of who you're becoming.",
  );
  lines.push("");

  // Writing — dynamically built from all writings
  lines.push("## Writing");
  lines.push("");
  lines.push(
    "- [Blog](/blog) — All writings and essays, newest first.",
  );
  for (const w of writings) {
    const url = w.external ? w.href : `${siteUrl}${w.href}`;
    const label = platformLabel[w.platform] ?? "Published";
    lines.push(`- [${w.title}](${url}) — ${label}.`);
  }
  lines.push("");

  // Newsletter
  lines.push("## Newsletter");
  lines.push("");
  lines.push(
    "- [Newsletter](/newsletter) — Subscribe to Intentional Walk, the Substack edition, with an embedded signup form.",
  );
  lines.push(
    "- [Intentional Walk on Substack](https://zeystiv.substack.com/) — The publication itself.",
  );
  lines.push(
    "- [Intentional Walk RSS](https://zeystiv.substack.com/feed) — Feed of every post, for readers that prefer one.",
  );
  lines.push("");

  // Site structure
  lines.push("## Site Structure");
  lines.push("");
  lines.push(
    "- [posts.json](/posts.json) — Machine-readable index of all writing, newest first.",
  );
  lines.push(
    "- [sitemap.xml](/sitemap.xml) — XML sitemap of all pages.",
  );
  lines.push(
    "- [robots.txt](/robots.txt) — Crawler rules.",
  );
  lines.push(
    "- [opengraph-image](/opengraph-image) — Site-wide social share image.",
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "Last-Modified": lastModified,
    },
  });
}