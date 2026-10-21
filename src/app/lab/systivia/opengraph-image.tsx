import { ImageResponse } from "next/og";

import { OgBackdrop } from "@/components/og/backdrop";
import { OgFooter } from "@/components/og/footer";
import { OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, getOgFonts, ogRgba, readImageAsDataUrl } from "@/lib/og";

export const dynamic = "force-static";
export const alt =
  "Systivia — The Habit Tracker That Focuses On Who You Want To Become";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const [fonts, screenshot] = await Promise.all([
    getOgFonts(),
    readImageAsDataUrl("projects/systivia/app-screenshots/celebration.webp"),
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
          <span
            style={{
              display: "flex",
              alignSelf: "flex-start",
              borderRadius: 999,
              border: `1px solid ${ogRgba(OG_COLORS.accent, 0.3)}`,
              backgroundColor: ogRgba(OG_COLORS.accent, 0.1),
              padding: "6px 14px",
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: OG_COLORS.accent,
            }}
          >
            Mobile App
          </span>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.14,
                letterSpacing: -1.5,
                color: OG_COLORS.heading,
              }}
            >
              The Habit Tracker That
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.14,
                letterSpacing: -1.5,
                color: OG_COLORS.heading,
              }}
            >
              Focuses On
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.14,
                letterSpacing: -1.5,
                color: OG_COLORS.accent,
              }}
            >
              Who You Want To Become
            </div>

            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.6,
                color: OG_COLORS.body,
                maxWidth: 600,
                display: "flex",
                marginTop: 20,
              }}
            >
              Identity, not streaks. Every habit is a vote for who
              you&apos;re becoming.
            </div>
          </div>

          <OgFooter />
        </div>

        {/* Right: phone mockup */}
        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: -16,
              borderRadius: 99999,
              backgroundImage:
                `radial-gradient(circle at center, ${ogRgba(OG_COLORS.accent, 0.25)}, transparent 70%)`,
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              borderRadius: 36,
              border: `3px solid ${ogRgba(OG_COLORS.heading, 0.12)}`,
              backgroundColor: OG_COLORS.bg,
              padding: 10,
              boxShadow: `0 30px 70px -20px ${ogRgba(OG_COLORS.heading, 0.25)}`,
            }}
          >
            <img
              src={screenshot}
              width={240}
              height={533}
              style={{
                borderRadius: 28,
                objectFit: "cover",
                display: "flex",
              }}
            />
          </div>
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