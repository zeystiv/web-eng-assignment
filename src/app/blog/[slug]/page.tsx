import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { Tag } from "@/components/site/tag";
import { JsonLd } from "@/components/site/json-ld";
import { MDXRender } from "@/components/blog/mdx-render";
import { PostCard } from "@/components/blog/post-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBadge, AuthorBio } from "@/components/blog/author";
import {
  getPostBySlug,
  getRelatedPosts,
  listPosts,
} from "@/lib/data/posts";
import {
  bodyPlainText,
  readingMinutes,
  formatLongDate,
  extractHeadings,
} from "@/lib/data/utils";
import { env } from "@/lib/env";
import { site } from "@/lib/site";
import {
  jsonLdGraph,
  websiteEntity,
  organizationEntity,
  personEntity,
  WEBSITE_ID,
  breadcrumbEntity,
} from "@/lib/json-ld";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const bodySource = post.body ?? "";
  const plainBody = bodyPlainText(bodySource);
  const description = post.summary ?? plainBody.slice(0, 160);
  const url = `${env.siteUrl}/blog/${slug}`;
  const postTitle = `${post.title} · ${site.name}`;

  const openGraph: Metadata["openGraph"] = {
    title: postTitle,
    description,
    url,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.editedAt ?? undefined,
  };

  return {
    title: postTitle,
    description,
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description,
    },
    alternates: {
      canonical: post.canonical_url && post.hosted !== "self"
        ? post.canonical_url
        : url,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const bodySource = post.body ?? "";
  const plainBody = bodyPlainText(bodySource);
  const minutes = readingMinutes(bodySource);
  const wordCount = plainBody.split(/\s+/).filter(Boolean).length;
  const headings = extractHeadings(bodySource);
  const related = await getRelatedPosts(slug, post.tags);
  const url = `${env.siteUrl}/blog/${slug}`;

  const jsonLd = jsonLdGraph([
    websiteEntity,
    organizationEntity,
    personEntity,
    {
      "@type": "BlogPosting",
      "@id": url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.summary ?? plainBody.slice(0, 160),
      datePublished: post.date,
      dateModified: post.editedAt ?? post.date,
      inLanguage: "en",
      wordCount,
      timeRequired: `PT${minutes}M`,
      articleSection: post.tags[0] ?? "Blog",
      author: personEntity,
      publisher: personEntity,
      image: post.cover_image
        ? `${env.siteUrl}${post.cover_image}`
        : `${env.siteUrl}/opengraph-image`,
      isPartOf: { "@id": WEBSITE_ID },
      keywords: post.tags.join(", "),
    },
    breadcrumbEntity({
      url,
      items: [
        { name: "Home", url: env.siteUrl },
        { name: "Blog", url: `${env.siteUrl}/blog` },
        { name: post.title, url },
      ],
    }),
  ]);

  const showUpdated = post.editedAt && post.editedAt !== post.date;

  return (
    <article className="pb-8 sm:pb-24">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden accent-wash pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden>&larr;</span> All blogs
          </Link>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 font-ui text-xs uppercase tracking-[0.14em] text-muted">
              <time dateTime={post.date}>{formatLongDate(post.date)}</time>
              <span aria-hidden>&middot;</span>
              <span>{minutes} min read</span>
              {showUpdated ? (
                <>
                  <span aria-hidden>&middot;</span>
                  <time dateTime={post.editedAt ?? undefined}>Updated {formatLongDate(post.editedAt!)}</time>
                </>
              ) : null}
            </div>
          </div>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {post.summary ? (
            <p className="mt-5 font-reading text-lg leading-relaxed text-ink-soft sm:text-xl">
              {post.summary}
            </p>
          ) : null}

          {post.cover_image ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border-default bg-surface">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-default pt-6">
            <AuthorBadge />
            <ShareButtons title={post.title} url={url} />
          </div>
        </Container>
      </header>

      {/* ── Body + TOC ── */}
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="mx-auto w-full max-w-3xl">
            <MDXRender source={bodySource} slug={slug} />

            {post.tags.length > 0 ? (
              <div className="mt-12 flex flex-wrap items-center gap-1.5 border-t border-border-default pt-8">
                <span className="mr-1 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Tags
                </span>
                {post.tags.map((tag) => (
                  <Tag key={tag} className="transition-colors hover:border-accent-border hover:text-ink">
                    {tag}
                  </Tag>
                ))}
              </div>
            ) : null}

            <AuthorBio />
          </div>

          {headings.length >= 2 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          ) : null}
        </div>

        {related.length > 0 ? (
          <>
            <hr className="my-16 border-border-default" />

            <section
              aria-labelledby="related-heading"
              className="mx-auto max-w-5xl"
            >
              <h2
                id="related-heading"
                className="mb-6 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl"
              >
                Keep reading
              </h2>
              <ul className="flex flex-col gap-6">
                {related.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </Container>
    </article>
  );
}