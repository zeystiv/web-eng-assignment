import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Fully static site — no server, no CMS, no backend. `next build` emits a
   * plain `out/` folder of HTML/CSS/JS that can be hosted anywhere.
   */
  output: "export",
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Static export has no image optimizer, so images are served as-is.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
