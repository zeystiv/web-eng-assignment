import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Mirrors the warm editorial palette in src/app/globals.css (@theme tokens)
// so OG images stay consistent with the site (hero section included).
export const OG_COLORS = {
  bg: "#FBF8F2", // --color-bg-base / --color-parchment
  accent: "#B8842E", // --color-ochre
  heading: "#2E2517", // --color-ink
  body: "#50422C", // --color-ink-soft
  muted: "#8A7355", // --color-muted
  surface: "#F0E6D2", // --color-bg-surface / --color-surface
} as const;

/** Derive an rgba() tint from an OG_COLORS hex token so every OG image
    stays on the theme palette (matching globals.css tokens). */
export function ogRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export async function getOgFonts() {
  const fontDir = join(process.cwd(), "public", "fonts");
  const [montserratSemiBold, montserratBold, manropeRegular, manropeSemiBold] =
    await Promise.all([
      readFile(join(fontDir, "Montserrat-SemiBold.ttf")),
      readFile(join(fontDir, "Montserrat-Bold.ttf")),
      readFile(join(fontDir, "Manrope-Regular.ttf")),
      readFile(join(fontDir, "Manrope-SemiBold.ttf")),
    ]);
  return [
    {
      name: "Montserrat",
      data: montserratSemiBold,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Montserrat",
      data: montserratBold,
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Manrope",
      data: manropeRegular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Manrope",
      data: manropeSemiBold,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

function mimeFromMagic(bytes: Uint8Array) {
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  )
    return "image/png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return "image/jpeg";
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46)
    return "image/gif";
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46
  )
    return "image/webp";
  const head = new TextDecoder().decode(bytes.slice(0, 128));
  if (head.includes("<svg") || head.includes("<?xml")) return "image/svg+xml";
  return "image/png";
}

export async function readImageAsDataUrl(publicPath: string) {
  const filePath = join(process.cwd(), "public", publicPath);
  const data = await readFile(filePath);
  const bytes = new Uint8Array(
    data.buffer,
    data.byteOffset,
    Math.min(256, data.byteLength),
  );
  const mime = mimeFromMagic(bytes);
  if (mime === "image/webp") {
    const buffer = await sharp(data).png().toBuffer();
    return `data:image/png;base64,${buffer.toString("base64")}`;
  }
  return `data:${mime};base64,${data.toString("base64")}`;
}