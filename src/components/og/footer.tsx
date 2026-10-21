import type { ReactNode } from "react";

import { OG_COLORS } from "@/lib/og";

export function OgFooter({
  name = "Rao Zaeem",
  handle = "@zeystiv",
  children,
}: {
  name?: string;
  handle?: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div
        style={{
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: 26,
          color: OG_COLORS.heading,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: 22,
          color: OG_COLORS.muted,
        }}
      >
        ·
      </div>
      <div
        style={{
          fontFamily: "Manrope",
          fontWeight: 600,
          fontSize: 22,
          color: OG_COLORS.accent,
        }}
      >
        {handle}
      </div>
      {children}
    </div>
  );
}