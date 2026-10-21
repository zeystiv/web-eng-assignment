"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavActiveLink({
  href,
  children,
  accent = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "font-sans rounded-full py-2 text-[15px] font-medium transition-colors",
        accent
          ? "bg-accent-solid px-6 py-2.5 text-parchment hover:bg-ochre-hover"
          : "px-3 text-ink-soft hover:text-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}
