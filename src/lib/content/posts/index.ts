import { body as notesToSelf } from "./notes-to-self";
import { body as stopLivingInYourMind } from "./stop-living-in-your-mind";
import { body as wayToSelfImprovement } from "./way-to-self-improvement";

export type PostContent = {
  /** URL slug, e.g. `/blog/notes-to-self`. */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO date of the last manual edit, if the post was edited after publishing. */
  editedAt?: string;
  summary?: string;
  tags: string[];
  /** Where the post originally lived: "self" | "medium" | "substack" | "daily-dev". */
  hosted: string;
  /** Canonical URL for posts syndicated to another platform. */
  canonical_url?: string;
  /** Cover image path, relative to /public. */
  cover_image?: string;
  /** Raw MDX source of the post. */
  body: string;
};

/**
 * Every post, hardcoded.
 *
 * This used to be a Keystatic collection (`content/posts/*.mdx`); the data is
 * now baked straight into the app so the site has no CMS and no backend.
 * Post bodies live in sibling files (`./<slug>.ts`) to keep this readable.
 */
export const posts: PostContent[] = [
  {
    slug: "notes-to-self",
    title: "Notes to Self",
    date: "2026-09-14",
    editedAt: "2026-09-14",
    summary:
      "Months of raw, short-lived thoughts, written down to capture forever — taken straight from my journal. Each paragraph stands on its own, a thought of its own.",
    tags: ["notes", "ideas"],
    hosted: "self",
    body: notesToSelf,
  },
  {
    slug: "stop-living-in-your-mind",
    title: "How To Stop Living In Your_Mind",
    date: "2026-09-18",
    editedAt: "2026-09-18",
    summary:
      "One day I'll regret not enjoying the time I have right now, so what am I spending it on?",
    tags: ["mindful", "self-awareness", "overthinking", "presence"],
    hosted: "self",
    body: stopLivingInYourMind,
  },
  {
    slug: "way-to-self-improvement",
    title: "The Correct Way To Approach Self-Improvement",
    date: "2026-09-21",
    editedAt: "2026-09-21",
    summary:
      "You have been improving yourself for years, but why does it feel like you still lack and falling behind?",
    tags: ["self-improvement"],
    hosted: "self",
    body: wayToSelfImprovement,
  },
];
