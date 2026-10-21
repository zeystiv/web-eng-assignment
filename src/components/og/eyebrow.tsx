import type { ReactNode } from "react";

import { OG_COLORS } from "@/lib/og";

export function OgEyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "Manrope",
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: 4,
        textTransform: "uppercase",
        color: OG_COLORS.accent,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          width: 34,
          height: 3,
          borderRadius: 999,
          backgroundColor: OG_COLORS.accent,
          display: "block",
        }}
      />
      {children}
    </div>
  );
}