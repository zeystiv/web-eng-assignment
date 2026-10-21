import { env } from "@/lib/env";
import { site } from "@/lib/site";
import { socials } from "@/lib/socials";

export const siteUrl = env.siteUrl;

export const WEBSITE_ID = `${siteUrl}/#website`;
export const PERSON_ID = `${siteUrl}/#person`;
export const ORGANIZATION_ID = `${siteUrl}/#organization`;

export const websiteEntity = {
  "@id": WEBSITE_ID,
  "@type": "WebSite",
  url: siteUrl,
  name: site.name,
  alternateName: site.handle,
  description: site.description,
  inLanguage: "en",
} as const;

export const organizationEntity = {
  "@id": ORGANIZATION_ID,
  "@type": "Organization",
  name: "Systivia",
  url: "https://systivia.com/",
} as const;

export const personEntity = {
  "@id": PERSON_ID,
  "@type": "Person",
  name: site.name,
  alternateName: site.handle,
  url: siteUrl,
  image: `${siteUrl}/zaeem.webp`,
  description: site.description,
  jobTitle: "Full-stack Developer, Founder-Engineer, Writer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "Writing",
    "Coding",
  ],
  worksFor: { "@id": ORGANIZATION_ID },
  sameAs: socials
    .filter((s) => s.platform !== "discord")
    .map((s) => s.url),
} as const;

/** ProfilePage entity shared by the landing page and /lab (both profile pages). */
export function profilePageEntity({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

/** BreadcrumbList entity for a page, given its full URL and ordered crumbs (current page last). */
export function breadcrumbEntity({
  url,
  items,
}: {
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jsonLdGraph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}