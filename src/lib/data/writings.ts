import { posts as postContent } from "@/lib/content/posts";
import { writings as writingContent } from "@/lib/content/writings";

export type Platform =
  | "self"
  | "systivia"
  | "medium"
  | "substack"
  | "case-study"
  | "daily-dev";

export type FeedItem = {
  id: string;
  title: string;
  date: string;
  href: string;
  platform: Platform;
  external: boolean;
};

/**
 * The full writing feed: external writings (Medium, Substack, Systivia) and
 * the posts hosted on this site, merged and sorted newest first.
 */
export async function listWritings(): Promise<FeedItem[]> {
  const writingItems: FeedItem[] = writingContent
    .filter((w) => w.date)
    .map((w) => ({
      id: `writing-${w.slug}`,
      title: w.title,
      date: w.date,
      href: w.url,
      platform: w.platform,
      external: w.platform !== "case-study",
    }));

  const postItems: FeedItem[] = postContent
    .filter((p) => p.date)
    .map((p) => ({
      id: `post-${p.slug}`,
      title: p.title,
      date: p.date,
      href: `/blog/${p.slug}`,
      platform: isPlatform(p.hosted) ? p.hosted : "self",
      external: false,
    }));

  return [...writingItems, ...postItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function isPlatform(value: string): value is Platform {
  return [
    "self",
    "systivia",
    "medium",
    "substack",
    "case-study",
    "daily-dev",
  ].includes(value);
}
