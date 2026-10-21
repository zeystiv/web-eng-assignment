import type { ReactNode } from "react";

import { OG_COLORS } from "@/lib/og";

export function OgBackdrop({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        backgroundColor: OG_COLORS.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -140,
          top: -180,
          width: 560,
          height: 560,
          borderRadius: 99999,
          backgroundImage:
            "radial-gradient(circle at center, rgba(184, 132, 46, 0.10), transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -120,
          top: -220,
          width: 480,
          height: 480,
          borderRadius: 99999,
          backgroundImage:
            "radial-gradient(circle at center, rgba(184, 132, 46, 0.05), transparent 65%)",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 64,
          padding: "0 72px",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}