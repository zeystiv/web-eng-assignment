import { listWritings } from "@/lib/data/writings";
import type { Platform } from "@/lib/data/writings";
import { env } from "@/lib/env";

export const dynamic = "force-static";

type PostJsonEntry = {
  title: string;
  date: string;
  url: string;
  platform: Platform;
  external: boolean;
};

export async function GET() {
  const writings = await listWritings();

  const entries: PostJsonEntry[] = writings
    .map((w) => ({
      title: w.title,
      date: w.date,
      url: w.external ? w.href : `${env.siteUrl.replace(/\/$/, "")}${w.href}`,
      platform: w.platform,
      external: w.external,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastModified = new Date(
    Math.max(
      ...entries.map((e) => new Date(e.date).getTime()),
      new Date(0).getTime(),
    ),
  ).toUTCString();

  return Response.json(entries, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
      "Last-Modified": lastModified,
    },
  });
}