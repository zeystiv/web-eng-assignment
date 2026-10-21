const WORDS_PER_MINUTE = 220;

export function bodyPlainText(body: string | undefined): string {
  if (!body) return "";
  return body
    .replace(/<[^>]+>/g, "")
    .replace(/#{1,3}\s/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[-*]\s/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function readingMinutes(body?: string): number {
  const words = bodyPlainText(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export type Heading = { id: string; text: string; level: 2 | 3 };

export function extractHeadings(body: string | undefined): Heading[] {
  if (!body) return [];
  const out: Heading[] = [];
  const seen = new Map<string, number>();
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(body)) !== null) {
    const level = match[1]!.length as 2 | 3;
    const text = match[2]!.trim();
    if (!text) continue;
    let id = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 80);
    const seenCount = seen.get(id) ?? 0;
    if (seenCount > 0) id = `${id}-${seenCount}`;
    seen.set(id, seenCount + 1);
    out.push({ id, text, level });
  }
  return out;
}

export const formatPostDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatLongDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
