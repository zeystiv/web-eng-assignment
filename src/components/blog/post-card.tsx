import Image from "next/image";
import Link from "next/link";

import { Tag } from "@/components/site/tag";
import { formatPostDate } from "@/lib/data/utils";

type Props = {
  post: {
    slug: string;
    title: string;
    date: string;
    summary?: string;
    tags: string[];
    cover_image?: string;
  };
};

export function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border-default bg-surface/50 transition-colors hover:border-accent-border hover:bg-surface sm:flex-row"
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 font-ui text-xs uppercase tracking-[0.14em] text-muted">
          <span>{formatPostDate(post.date)}</span>
          {post.tags.length > 0 ? (
            <span className="ml-auto text-ochre">{post.tags[0]}</span>
          ) : null}
        </div>
        <h3 className="mt-3 font-heading text-xl font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-ochre">
          {post.title}
        </h3>
        {post.summary ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {post.summary}
          </p>
        ) : null}
        <span className="mt-auto pt-4 text-xs text-muted transition-colors group-hover:text-ochre">
          Read in the series &rarr;
        </span>
      </div>
      {post.cover_image ? (
        <div className="relative aspect-[16/10] overflow-hidden border-t border-border-default bg-parchment sm:aspect-auto sm:w-64 sm:border-t-0 sm:border-l">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(min-width: 640px) 16rem, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
    </Link>
  );
}