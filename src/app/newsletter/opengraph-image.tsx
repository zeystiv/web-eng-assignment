import { ImageResponse } from "next/og";

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
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `Rao Zaeem — ${site.newsletter.publication}: a newsletter, straight to your inbox`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const BLOB_FILL = "#e7d5ba"; // ochre 30% + parchment — must match --blob-fill in globals.css

const FIELD = 400;
const PORTRAIT = 356; // the hero's ~59.4% of the field, at 1:1 like the hero crop
const BLOB = Math.round(PORTRAIT * 1.15);
const INSET = (FIELD - PORTRAIT) / 2;
const BLOB_INSET = (FIELD - BLOB) / 2;

// The wordmark is 3:1, so width/height must stay in that ratio or satori
// stretches it. 522 keeps it inside the ~592px left column.
const WORDMARK = 522;

export default async function Image() {
  const [fonts, portrait, wordmark] = await Promise.all([
    getOgFonts(),
    readImageAsDataUrl("zaeem.webp"),
    readImageAsDataUrl("intentional-walk.webp"),
  ]);

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
          <OgEyebrow>The Newsletter</OgEyebrow>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* The publication's wordmark, carrying the headline in place of
                text. Transparent PNG, so it sits straight on the parchment. */}
            <img
              src={wordmark}
              width={WORDMARK}
              height={WORDMARK / 3}
              style={{
                width: WORDMARK,
                height: WORDMARK / 3,
                display: "flex",
                objectFit: "contain",
              }}
            />

            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.6,
                color: OG_COLORS.body,
                maxWidth: 520,
                display: "flex",
                marginTop: 28,
              }}
            >
              Subscribe for essays on healing through awareness, straight to
              your inbox.
            </div>
          </div>

          <OgFooter>
            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 600,
                fontSize: 20,
                color: OG_COLORS.muted,
              }}
            >
              · on Substack
            </div>
          </OgFooter>
        </div>

        {/* Right: portrait on the hero's soft ochre blob */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: FIELD,
            height: FIELD,
            flexShrink: 0,
          }}
        >
          {/* one dashed ring, echoing the hero's outermost orbit without
              crowding a much smaller field */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 8,
              width: FIELD - 16,
              height: FIELD - 16,
              borderRadius: 99999,
              border: `1px dashed ${ogRgba(OG_COLORS.accent, 0.3)}`,
              display: "flex",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: BLOB_INSET,
              top: BLOB_INSET,
              width: BLOB,
              height: BLOB,
              borderRadius: "42% 58% 61% 39% / 45% 40% 60% 55%",
              backgroundColor: BLOB_FILL,
              transform: "rotate(14deg)",
            }}
          />

          <img
            src={portrait}
            width={PORTRAIT}
            height={PORTRAIT}
            style={{
              position: "absolute",
              left: INSET,
              top: INSET,
              width: PORTRAIT,
              height: PORTRAIT,
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
