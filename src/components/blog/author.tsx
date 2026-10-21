import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

const author = {
  name: site.name,
  role: "Full-stack Developer, Founder-Engineer, Writer",
  bio: site.description,
  avatar: "/zaeem.webp",
};

export function AuthorBadge() {
  return (
    <span className="flex items-center gap-3">
      <Image
        src={author.avatar}
        alt={author.name}
        width={52}
        height={52}
        className="rounded-full object-cover"
      />
      <span className="text-xl leading-tight">
        <Link
          href="/blog"
          className="block font-heading font-medium text-ink transition-colors hover:text-ochre"
        >
          {author.name}
        </Link>
        <span className="block text-xs text-muted">{author.role}</span>
      </span>
    </span>
  );
}

export function AuthorBio() {
  return (
    <aside className="mt-10 rounded-2xl border border-border-default bg-surface/50 p-8 px-10">
      <div className="flex items-start gap-8">
        <Image
          src={author.avatar}
          alt={author.name}
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Written by
          </p>
          <p className="mt-1 font-heading text-xl font-semibold text-ink">
            <Link
              href="/blog"
              className="transition-colors hover:text-ochre"
            >
              {author.name}
            </Link>
          </p>
          <p className="text-xs text-muted">{author.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {author.bio}
          </p>
        </div>
      </div>
    </aside>
  );
}