import Link from "next/link";

import { Container } from "@/components/site/container";
import { socials } from "@/lib/socials";
import { site } from "@/lib/site";
import Image from "next/image";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border-default bg-bg-base">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link
            href="/"
            aria-label="Rao Zaeem home"
            className="group inline-flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.webp"
              alt="Rao Zaeem logo"
              width={32}
              height={32}
              className=""
            />
            <span className="flex flex-col">
              <span className="font-heading text-lg font-semibold tracking-tight text-ink">
                Rao Zaeem
              </span>
              <span className="text-xs text-muted">{site.handle}</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted">
            Full-stack developer, founder-engineer, and writer. {site.tagline}
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map((s) => (
                <Link
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border-default bg-transparent text-muted transition-colors hover:border-ochre hover:text-ochre [&_svg]:h-4 [&_svg]:w-4"
                  aria-label={s.label}
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          )}
        </div>

        {site.footerNav.blog.length > 0 && (
          <FooterColumn label="Content" items={site.footerNav.blog} />
        )}
        {site.footerNav.lab.length > 0 && (
          <FooterColumn label="Lab" items={site.footerNav.lab} />
        )}
      </Container>

      <Container className="flex flex-col items-start justify-between gap-2 border-t border-border-default py-6 font-sans text-xs text-muted sm:flex-row sm:items-center">
        <p>&copy; {year} Rao Zaeem. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <span className="uppercase tracking-[0.14em]">Machine-readable</span>
          {site.resources.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  label,
  items,
}: {
  label: string;
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div className="md:col-span-2">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
        {label}
      </h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target={item.href.startsWith("https://") ? "_blank" : undefined}
              rel={
                item.href.startsWith("https://") ? "noreferrer" : undefined
              }
              className="text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
