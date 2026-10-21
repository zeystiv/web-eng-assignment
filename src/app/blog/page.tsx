import type { Metadata } from "next";

import { WritingsSection } from "@/components/site/writings-section";
import { JsonLd } from "@/components/site/json-ld";
import { listPosts } from "@/lib/data/posts";
import { site } from "@/lib/site";
import {
  jsonLdGraph,
  siteUrl,
  websiteEntity,
  organizationEntity,
  personEntity,
  WEBSITE_ID,
  breadcrumbEntity,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Rao Zaeem · Blog — Writings, Notes & Essays",
  description:
    "Essays, notes, and insights by Rao Zaeem — self-improvement through awareness, intentional effort, and honest reflection.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await listPosts();

  const jsonLd = jsonLdGraph([
    websiteEntity,
    organizationEntity,
    personEntity,
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/blog`,
      url: `${siteUrl}/blog`,
      name: "Rao Zaeem · Blog — Writings, Notes & Essays",
      description: metadata.description,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/blog/${post.slug}`,
          name: post.title,
        })),
      },
    },
    breadcrumbEntity({
      url: `${siteUrl}/blog`,
      items: [
        { name: "Home", url: siteUrl },
        { name: "Blog", url: `${siteUrl}/blog` },
      ],
    }),
  ]);

  return (
    <>
      <JsonLd data={jsonLd} />
      <WritingsSection />
    </>
  );
}