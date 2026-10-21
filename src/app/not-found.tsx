import Link from "next/link";

import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden accent-wash py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border-default bg-surface/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted backdrop-blur">
            <span
              className="h-1.5 w-1.5 rounded-full bg-ochre"
              aria-hidden
            />
            404
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            This page hasn&rsquo;t been{" "}
            <span className="text-ochre">built yet.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            The page you&apos;re after either moved or doesn&apos;t exist yet.
            No worries — just head somewhere useful.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/lab">Explore the Lab</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
