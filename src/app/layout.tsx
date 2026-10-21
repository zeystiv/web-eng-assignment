import type { Metadata, Viewport } from "next";

import { montserrat, manrope, onest } from "./fonts";
import { env } from "@/lib/env";
import { site } from "@/lib/site";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: "Rao Zaeem · Healing by Awareness, Progress by Intentional Effort",
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Rao Zaeem · Healing by Awareness, Progress by Intentional Effort",
    description: site.description,
    url: env.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rao Zaeem · Healing by Awareness, Progress by Intentional Effort",
    description: site.description,
    creator: "@zeystiv",
  },
  icons: {
    icon: "/icon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F0E4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${manrope.variable} ${onest.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground font-sans">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
