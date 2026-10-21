import { ImageResponse } from "next/og";

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
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = "Rao Zaeem — Blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const title = "Blog";
const summary =
  "Years Of Figuring Out The Art Of Self-Improvement, Doing It Right and Writing It Down.";

export default async function Image() {
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
          <OgEyebrow>Awareness + Intentionality</OgEyebrow>

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
                fontSize: 56,
                lineHeight: 1.12,
                letterSpacing: -1.5,
                color: OG_COLORS.heading,
              }}
            >
              {title}
            </div>

            <div
              style={{
                display: "flex",
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: 22,
                lineHeight: 1.5,
                color: OG_COLORS.body,
              }}
            >
              {summary}
            </div>
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: 26,
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
                  fontSize: 16,
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
