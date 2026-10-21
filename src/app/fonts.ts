import { Montserrat, Manrope, Onest } from "next/font/google";

export const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const manrope = Manrope({
  variable: "--font-reading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const onest = Onest({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
