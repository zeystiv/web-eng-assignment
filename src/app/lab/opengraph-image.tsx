import { ImageResponse } from "next/og";

import { OgBackdrop } from "@/components/og/backdrop";
import { OgEyebrow } from "@/components/og/eyebrow";
import { OgFooter } from "@/components/og/footer";
import { OG_COLORS, OG_CONTENT_TYPE, OG_SIZE, getOgFonts, ogRgba } from "@/lib/og";

export const dynamic = "force-static";
export const alt =
  "Rao Zaeem — The Lab: A Page That Can Prove I'm Also A Developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const toolkit = [
  "ReactJS",
  "NextJS",
  "TailwindCSS",
  "NestJS",
  "GraphQL",
  "React Native",
  "Arch Linux",
];

const setup = [
  { key: "Distro", value: "CachyOS" },
  { key: "Desktop", value: "KDE Plasma" },
  { key: "Editor", value: "Neovim" },
  { key: "Language", value: "TypeScript" },
];

export default async function Image() {
  const fonts = await getOgFonts();

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
          <OgEyebrow>The Lab</OgEyebrow>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 46,
                lineHeight: 1.12,
                letterSpacing: -1.5,
                color: OG_COLORS.heading,
              }}
            >
              A Page That Can Prove
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 46,
                lineHeight: 1.12,
                letterSpacing: -1.5,
                color: OG_COLORS.accent,
              }}
            >
              I&apos;m Also A Developer
            </div>

            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.6,
                color: OG_COLORS.body,
                display: "flex",
                marginTop: 20,
              }}
            >
              A nerd inside me wanted to show off!
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
              · Karachi, Pakistan
            </div>
          </OgFooter>
        </div>

        {/* Right: toolkit + setup */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 340,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: OG_COLORS.muted,
              }}
            >
              Toolkit
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {toolkit.map((tag) => (
                <div
                  key={tag}
                  style={{
                    borderRadius: 8,
                    border: `1px solid ${ogRgba(OG_COLORS.accent, 0.2)}`,
                    backgroundColor: OG_COLORS.surface,
                    padding: "6px 14px",
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontSize: 14,
                    color: OG_COLORS.heading,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: ogRgba(OG_COLORS.accent, 0.14),
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: OG_COLORS.muted,
              }}
            >
              Setup
            </div>
            {setup.map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 600,
                    fontSize: 13,
                    color: OG_COLORS.muted,
                  }}
                >
                  {item.key}
                </span>
                <span
                  style={{
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontSize: 13,
                    color: OG_COLORS.heading,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
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