import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { listPosts } from "@/lib/data/posts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE = env.siteUrl.replace(/\/$/, "");

  const posts = await listPosts();

  const newestPostDate = posts.reduce(
    (latest, p) => {
      const d = new Date(p.editedAt ?? p.date);
      return d > latest ? d : latest;
    },
    new Date("2026-09-14"),
  );

  return [
    {
      url: `${SITE}/`,
      lastModified: newestPostDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE}/blog`,
      lastModified: newestPostDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/lab`,
      lastModified: new Date("2026-09-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/lab/systivia`,
      lastModified: new Date("2026-09-14"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE}/newsletter`,
      lastModified: new Date("2026-09-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: new Date(post.editedAt ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}