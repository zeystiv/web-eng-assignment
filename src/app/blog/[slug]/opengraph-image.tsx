import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { OgBackdrop } from "@/components/og/backdrop";
import { OgEyebrow } from "@/components/og/eyebrow";
import {
  OG_COLORS,
  OG_CONTENT_TYPE,
  OG_SIZE,
  getOgFonts,
  ogRgba,
  readImageAsDataUrl,
} from "@/lib/og";
import { getPostBySlug, listPosts } from "@/lib/data/posts";
import { bodyPlainText, readingMinutes } from "@/lib/data/utils";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = "Rao Zaeem — Blog Post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const bodySource = post.body ?? "";
  const minutes = readingMinutes(bodySource);

  const titleSize =
    post.title.length > 64 ? 40 : post.title.length > 40 ? 48 : 58;
  const summaryCap = post.title.length > 64 ? 100 : post.title.length > 40 ? 130 : 150;
  const summary = post.summary
    ? bodyPlainText(post.summary).slice(0, summaryCap)
    : null;
  const shownSummary =
    summary && summary.length >= summaryCap ? `${summary.trimEnd()} …` : summary;

  const [fonts, portrait] = await Promise.all([
    getOgFonts(),
    readImageAsDataUrl("zaeem.webp"),
  ]);

  return new ImageResponse(
    (
      <OgBackdrop>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: 470,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <OgEyebrow>Awareness + Intentionality</OgEyebrow>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Manrope",
                fontWeight: 600,
                fontSize: 20,
                color: OG_COLORS.accent,
                border: `1px solid ${ogRgba(OG_COLORS.accent, 0.35)}`,
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              {minutes} min read
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              maxWidth: 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: titleSize,
                lineHeight: 1.12,
                letterSpacing: -1.5,
                color: OG_COLORS.heading,
              }}
            >
              {post.title}
            </div>

            {shownSummary ? (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Manrope",
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: 1.5,
                  color: OG_COLORS.body,
                }}
              >
                {shownSummary}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img
              src={portrait}
              width={72}
              height={72}
              style={{
                borderRadius: 999,
                border: `2px solid ${ogRgba(OG_COLORS.heading, 0.12)}`,
                objectFit: "cover",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: 28,
                  color: OG_COLORS.heading,
                }}
              >
                {site.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Manrope",
                  fontWeight: 600,
                  fontSize: 18,
                  color: OG_COLORS.muted,
                }}
              >
                {site.handle}
              </div>
            </div>
          </div>
        </div>
      </OgBackdrop>
    ),
    { width: size.width, height: size.height, fonts },
  );
}
