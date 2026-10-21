"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/lib/site";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleHashLink(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav
          aria-label="Mobile navigation"
          className="mt-12 flex flex-col gap-2"
        >
          {site.nav.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleHashLink(e, item.href)}
                className="font-sans rounded-lg px-4 py-3 text-base font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={site.navCta.href}
            onClick={(e) => handleHashLink(e, site.navCta.href)}
            className="font-sans mt-4 rounded-lg bg-accent-solid px-4 py-3 text-center text-base font-medium text-parchment"
          >
            {site.navCta.label}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
