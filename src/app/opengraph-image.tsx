import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

import { OgBackdrop } from "@/components/og/backdrop";
import { OgEyebrow } from "@/components/og/eyebrow";
import { OgFooter } from "@/components/og/footer";
import {
  OG_COLORS,
  OG_CONTENT_TYPE,
  OG_SIZE,
  getOgFonts,
  ogRgba,
  readImageAsDataUrl,
} from "@/lib/og";

export const dynamic = "force-static";
export const alt =
  "Rao Zaeem — Years Of Figuring Out The Art Of Self-Improvement, Doing It Right And Writing It Down";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* Orbit motif — the same SVG geometry as the site hero (viewBox 0 0 100 100):
   three dashed concentric rings, one large accent dot, a few small dots and
   plus marks, in the hero's exact stroke widths and colors. The portrait and
   the soft blob behind it keep the hero's proportions (portrait ≈ 59.4% of
   the 400px field, blob at 1.15×, 14deg rotation). Colors are the computed
   color-mix() results of the theme tokens in globals.css. */
const ORBIT_FIELD = 400;
const ORBIT_CENTER = ORBIT_FIELD / 2;
const RING_1 = ogRgba(OG_COLORS.accent, 0.6); // ochre 60% over transparent
const RING_2 = ogRgba(OG_COLORS.accent, 0.45); // ochre 45% over transparent
const RING_3 = ogRgba(OG_COLORS.accent, 0.3); // ochre 30% over transparent
// ochre 30% + parchment — must match --blob-fill in src/app/globals.css
const BLOB_FILL = "#e7d5ba";

/* satori has no true inline text flow, so break the heading into words and
   let flex-wrap lay them out with natural line breaks. The accent phrase is
   just another word, so it stays inline mid-sentence instead of being forced
   onto its own line. Trailing spaces use whiteSpace: "pre" (satori trims them
   under normal white-space). */
const HEADING_LEAD = "Years Of Figuring Out The Art Of";
const HEADING_ACCENT = "Self-Improvement,";
const HEADING_TAIL = "Doing It Right And Writing It Down";

const headingWord: ReactNode[] = [];
for (const [i, word] of [...HEADING_LEAD.split(" "), HEADING_ACCENT, ...HEADING_TAIL.split(" ")].entries()) {
  headingWord.push(
    <div
      key={i}
      style={{
        display: "flex",
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 1.16,
        letterSpacing: -1,
        color: i === HEADING_LEAD.split(" ").length ? OG_COLORS.accent : OG_COLORS.heading,
        whiteSpace: "pre",
      }}
    >
      {word}{" "}
    </div>,
  );
}

export default async function Image() {
  const [fonts, portrait] = await Promise.all([
    getOgFonts(),
    readImageAsDataUrl("zaeem.webp"),
  ]);

  const portraitSize = Math.round(ORBIT_FIELD * 0.594);
  const blobSize = Math.round(portraitSize * 1.15);
  const portraitInset = ORBIT_CENTER - portraitSize / 2;
  const blobInset = ORBIT_CENTER - blobSize / 2;

  const orbit = (
    <svg
      width={ORBIT_FIELD}
      height={ORBIT_FIELD}
      viewBox="0 0 100 100"
      fill="none"
      style={{ position: "absolute", inset: 0, display: "flex" }}
    >
      <circle cx="50" cy="50" r="37" stroke={RING_1} strokeWidth="0.52" strokeDasharray="1.5 3.2" strokeLinecap="round" />
      <circle cx="51.5" cy="49.5" r="43" stroke={RING_2} strokeWidth="0.5" strokeDasharray="1.7 3.4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="49" stroke={RING_3} strokeWidth="0.48" strokeDasharray="1.9 3.6" strokeLinecap="round" />
      <circle cx="78.1" cy="9.9" r="1.15" fill={OG_COLORS.accent} />
      <circle cx="13" cy="15" r="0.95" fill={OG_COLORS.accent} />
      <circle cx="94" cy="76" r="0.95" fill={OG_COLORS.accent} />
      <circle cx="20" cy="90" r="0.95" fill={OG_COLORS.accent} />
      <path d="M 88.7 16 H 91.3 M 90 14.7 V 17.3" stroke={RING_2} strokeWidth="0.5" strokeLinecap="round" />
      <path d="M 4.7 78 H 7.3 M 6 76.7 V 79.3" stroke={RING_2} strokeWidth="0.5" strokeLinecap="round" />
      <path d="M 84.7 86 H 87.3 M 86 84.7 V 87.3" stroke={RING_2} strokeWidth="0.5" strokeLinecap="round" />
    </svg>
  );

  return new ImageResponse(
    (
      <OgBackdrop>
        {/* Left: text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 470,
            flex: 1,
          }}
        >
          <OgEyebrow>Awareness + Intentionality</OgEyebrow>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 560 }}>
              {headingWord}
            </div>

            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.6,
                color: OG_COLORS.body,
                maxWidth: 560,
                display: "flex",
                marginTop: 20,
              }}
            >
              The Fundamentals That Were Skipped Unknowingly,
              Going Back To The Basics
            </div>
          </div>

          <OgFooter />
        </div>

        {/* Right: orbit portrait */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: ORBIT_FIELD,
            height: ORBIT_FIELD,
            flexShrink: 0,
          }}
        >
          {orbit}

          {/* soft irregular blob behind the portrait */}
          <div
            style={{
              position: "absolute",
              left: blobInset,
              top: blobInset,
              width: blobSize,
              height: blobSize,
              borderRadius: "42% 58% 61% 39% / 45% 40% 60% 55%",
              backgroundColor: BLOB_FILL,
              transform: "rotate(14deg)",
            }}
          />

          {/* portrait */}
          <img
            src={portrait}
            width={portraitSize}
            height={portraitSize}
            style={{
              position: "absolute",
              left: portraitInset,
              top: portraitInset,
              width: portraitSize,
              height: portraitSize,
              borderRadius: "50%",
              objectFit: "cover",
              display: "flex",
            }}
          />
        </div>
      </OgBackdrop>
    ),
    {
      width: size.width,
      height: size.height,
      fonts,
    },
  );
}