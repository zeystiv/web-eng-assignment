import Link from "next/link";

import { Container } from "@/components/site/container";
import { MobileNav } from "./mobile-nav";
import { NavActiveLink } from "./nav-active-link";
import { site } from "@/lib/site";
import Image from "next/image";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-bg-base/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg-base/70">
      <Container className="flex h-16 items-center justify-between gap-4">
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
            priority
          />
          <span className="font-heading text-lg font-semibold tracking-tight text-ink">
            Awareness
            <span className="hidden min-[440px]:inline"> + Intentionality</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => (
              <NavActiveLink key={item.href} href={item.href}>
                {item.label}
              </NavActiveLink>
            ))}
            <NavActiveLink href={site.navCta.href} accent className="ml-3">
              {site.navCta.label}
            </NavActiveLink>
          </nav>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
