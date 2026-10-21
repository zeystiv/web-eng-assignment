import Image from "next/image";

import { Container } from "@/components/site/container";
import { SubstackEmbed } from "@/components/site/substack-embed";
import { site } from "@/lib/site";

/** Landing-page band that closes out the page, directly under Writings. */
export function NewsletterSection() {
  const { publication, url } = site.newsletter;

  return (
    <section
      id="newsletter"
      aria-label="Newsletter"
      className="border-t border-border-default bg-bg-base py-20 sm:py-28"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            The Newsletter
          </p>
          {/* The publication's wordmark. The <h2> stays a heading and takes
              its accessible name from the alt text. 480x160 is the 3:1 source
              ratio — h-auto keeps it from distorting. */}
          <h2 className="mt-4 flex justify-center">
            <Image
              src="/intentional-walk.webp"
              alt={publication}
              width={480}
              height={160}
              sizes="(min-width: 768px) 480px, calc(100vw - 2.5rem)"
              className="h-auto w-auto max-w-full"
            />
          </h2>
          <p className="mt-6 font-reading text-lg leading-relaxed text-ink-soft">
            The same essays, on Substack, straight to your inbox as I publish
            them.
          </p>
        </div>

        <div className="mt-10">
          <SubstackEmbed />
        </div>

        <p className="mt-6 text-center font-sans text-sm text-muted">
          Prefer Substack directly?{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ochre underline-offset-4 hover:underline"
          >
            Open {publication}
          </a>
        </p>
      </Container>
    </section>
  );
}
