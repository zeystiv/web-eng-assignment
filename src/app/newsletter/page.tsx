import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { SubstackEmbed } from "@/components/site/substack-embed";
import { JsonLd } from "@/components/site/json-ld";
import { site } from "@/lib/site";
import {
  breadcrumbEntity,
  jsonLdGraph,
  organizationEntity,
  personEntity,
  siteUrl,
  websiteEntity,
  WEBSITE_ID,
} from "@/lib/json-ld";

const { publication, url, feedUrl } = site.newsletter;

const title = `${publication} · Newsletter on Substack`;
const description = `Subscribe to ${publication} on Substack. Essays on self-improvement, healing by awareness, and progress by intentional effort. Delivered straight to your inbox.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/newsletter`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = jsonLdGraph([
  websiteEntity,
  organizationEntity,
  personEntity,
  {
    "@type": "CollectionPage",
    "@id": `${siteUrl}/newsletter`,
    url: `${siteUrl}/newsletter`,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": `${siteUrl}/#person` },
  },
  breadcrumbEntity({
    url: `${siteUrl}/newsletter`,
    items: [
      { name: "Home", url: siteUrl },
      { name: "Newsletter", url: `${siteUrl}/newsletter` },
    ],
  }),
]);

export default function NewsletterPage() {
  return (
    <>
      {/* React 19 hoists these to <head> so the Substack document starts
          loading in parallel with this page instead of after it parses. */}
      <link rel="preconnect" href="https://zeystiv.substack.com" />
      <link rel="preconnect" href="https://substackcdn.com" />

      <JsonLd data={jsonLd} />

      <section className="py-20 sm:py-28">
        <Container>
          {/* Circular portrait on the hero's soft ochre blob, matching the
              `.orbit-blob` / `.orbit-portrait` geometry in globals.css. */}
          <div className="mb-10 flex justify-center">
            <div className="relative aspect-square w-24 sm:w-28">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 size-[115%] -translate-x-1/2 -translate-y-1/2 rotate-[14deg] rounded-[42%_58%_61%_39%/45%_40%_60%_55%] bg-[#e7d5ba]"
              />
              <Image
                src="/zaeem.webp"
                alt={`Portrait of ${site.name}`}
                width={112}
                height={112}
                priority
                className="relative size-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* The publication's wordmark. The <h1> stays a real heading and
              takes its accessible name from the alt text, so the document
              outline and SEO don't depend on an <img> being read. 420x140 is
              the 3:1 source ratio — h-auto keeps it from distorting. */}
          <h1 className="flex justify-center">
            <Image
              src="/intentional-walk.webp"
              alt={publication}
              width={420}
              height={140}
              priority
              sizes="(min-width: 768px) 420px, calc(100vw - 2.5rem)"
              className="h-auto w-auto max-w-full"
            />
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-center font-reading text-lg leading-relaxed text-ink-soft">
            Essays on healing through awareness and progress by intentional
            effort, straight to your inbox as I publish them.
          </p>

          <div className="mt-12">
            <SubstackEmbed loading="eager" />
          </div>

          <p className="mt-8 text-center font-sans text-sm text-muted">
            Having trouble with the form above?{" "}
            <a
              href={`${url}subscribe`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ochre underline-offset-4 hover:underline"
            >
              Subscribe on Substack
            </a>{" "}
            instead, or read it{" "}
            <a
              href={feedUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ochre underline-offset-4 hover:underline"
            >
              over RSS
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
