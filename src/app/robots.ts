import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const SITE = env.siteUrl.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
          "OAI-SearchBot",
          "CCBot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
