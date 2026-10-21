import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

import { Callout } from "@/components/blocks/callout";

// ---------------------------------------------------------------------------
// Image path pre-processing
// ---------------------------------------------------------------------------

function resolveImagePaths(source: string, slug: string): string {
  if (!slug) return source;

  const basePath = `/content/posts/${slug}/body`;

  return source.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt: string, src: string) => {
      if (!src || src.startsWith("/") || src.startsWith("http") || src.startsWith("data:")) {
        return match;
      }
      return `![${alt}](${basePath}/${src})`;
    }
  );
}

// ---------------------------------------------------------------------------
// Styled markdown components — recolored for periwinkle accent
// ---------------------------------------------------------------------------

function MdxImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-10 mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-lg border border-border">
        <Image
          src={src}
          alt={alt ?? ""}
          width={1280}
          height={720}
          className="h-auto w-full"
        />
      </div>
      {alt ? (
        <figcaption className="mt-3 text-center text-xs text-muted">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MdxLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");
  return (
    <Link
      href={href ?? "#"}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-ochre underline decoration-ochre/40 underline-offset-4 transition-colors hover:text-ochre hover:decoration-ochre"
    >
      {children}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Heading ID generation
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node || typeof node !== "object") return "";
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  const el = node as { props?: { children?: ReactNode } };
  if (el.props?.children) return extractText(el.props.children);
  return "";
}

function headingId(children: ReactNode): string {
  return slugify(extractText(children));
}

function MdxH1({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="mt-16 mb-4 font-heading text-4xl font-semibold tracking-tight leading-[1.08] text-ink first:mt-0 sm:text-5xl"
      {...props}
    >
      {children}
    </h1>
  );
}

function MdxH2({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      id={id ?? headingId(children)}
      className="mt-16 mb-4 font-heading text-3xl font-bold tracking-tight text-ink first:mt-0 sm:text-4xl"
      {...props}
    >
      {children}
    </h2>
  );
}

function MdxH3({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      id={id ?? headingId(children)}
      className="mt-14 mb-3 font-heading text-xl font-semibold tracking-tight text-ink first:mt-0 sm:text-2xl"
      {...props}
    >
      {children}
    </h3>
  );
}

function MdxH4({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      id={id}
      className="mt-12 mb-3 font-heading text-lg font-semibold tracking-tight text-ink first:mt-0 sm:text-xl"
      {...props}
    >
      {children}
    </h4>
  );
}

function MdxParagraph({
  bodyClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { bodyClassName?: string }) {
  const fontClass = bodyClassName ?? "font-reading";
  const hasBlockChild = (() => {
    const childArray = Array.isArray(children) ? children : [children];
    return childArray.some((child) => {
      if (!child || typeof child !== "object" || !("type" in child)) return false;
      const type = (child as { type: unknown }).type;
      if (typeof type === "string") {
        return ["figure", "pre", "table", "hr", "div", "blockquote", "ul", "ol"].includes(type);
      }
      const name =
        typeof type === "function"
          ? (type as Function & { displayName?: string; name?: string }).displayName ||
            (type as Function & { displayName?: string; name?: string }).name
          : "";
      return ["MdxImage", "Callout"].includes(name);
    });
  })();

  if (hasBlockChild) {
    return (
      <div className={`my-5 ${fontClass} text-lg leading-relaxed text-ink-soft lg:text-xl`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <p className={`my-5 ${fontClass} text-lg leading-relaxed text-ink-soft lg:text-xl`} {...props}>
      {children}
    </p>
  );
}

function MdxUnorderedList({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className="my-5 space-y-2 pl-6 list-disc marker:text-ochre"
      {...props}
    >
      {children}
    </ul>
  );
}

function MdxOrderedList({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className="my-5 space-y-2 pl-6 list-decimal"
      {...props}
    >
      {children}
    </ol>
  );
}

function MdxListItem({
  bodyClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & { bodyClassName?: string }) {
  return (
    <li className={`${bodyClassName ?? "font-reading"} text-ink-soft`} {...props}>
      {children}
    </li>
  );
}

function MdxBlockquote({
  bodyClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement> & { bodyClassName?: string }) {
  return (
    <blockquote
      className={`my-8 border-l-2 border-ochre/60 pl-5 ${bodyClassName ?? "font-reading"} text-lg italic text-ink`}
      {...props}
    >
      {children}
    </blockquote>
  );
}

function MdxPre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  );
}

function MdxCodigo({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink [&[data-language]]:bg-transparent [&[data-language]]:px-0 [&[data-language]]:py-0 [&[data-language]]:rounded-none [&[data-language]]:text-[1em]"
      {...props}
    >
      {children}
    </code>
  );
}

function MdxTable({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function MdxThead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className="border-b border-border bg-surface" {...props}>
      {children}
    </thead>
  );
}

function MdxTbody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props}>{children}</tbody>;
}

function MdxTr({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className="border-b border-border/60 last:border-0" {...props}>
      {children}
    </tr>
  );
}

function MdxTh({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted"
      {...props}
    >
      {children}
    </th>
  );
}

function MdxTd({
  bodyClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement> & { bodyClassName?: string }) {
  return (
    <td className={`px-4 py-3 ${bodyClassName ?? "font-reading"} text-ink-soft`} {...props}>
      {children}
    </td>
  );
}

function MdxHr(props: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className="my-12 border-border" {...props} />;
}

// ---------------------------------------------------------------------------
// Component map
// ---------------------------------------------------------------------------

function buildComponents(bodyClassName: string) {
  return {
    img: MdxImage,
    a: MdxLink,
    h1: MdxH1,
    h2: MdxH2,
    h3: MdxH3,
    h4: MdxH4,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <MdxParagraph bodyClassName={bodyClassName} {...props} />
    ),
    ul: MdxUnorderedList,
    ol: MdxOrderedList,
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
      <MdxListItem bodyClassName={bodyClassName} {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
      <MdxBlockquote bodyClassName={bodyClassName} {...props} />
    ),
    pre: MdxPre,
    code: MdxCodigo,
    table: MdxTable,
    thead: MdxThead,
    tbody: MdxTbody,
    tr: MdxTr,
    th: MdxTh,
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
      <MdxTd bodyClassName={bodyClassName} {...props} />
    ),
    hr: MdxHr,
    Callout,
  };
}

// ---------------------------------------------------------------------------
// Public API — server component
// ---------------------------------------------------------------------------

type MDXRenderProps = {
  source: string;
  slug?: string;
  bodyClassName?: string;
};

export async function MDXRender({
  source,
  slug = "",
  bodyClassName = "font-reading",
}: MDXRenderProps) {
  const resolved = resolveImagePaths(source, slug);

  return (
    <div
      className={`mx-auto w-full ${bodyClassName} text-lg leading-relaxed text-ink-soft lg:text-xl`}
    >
      <MDXRemote
        source={resolved}
        components={buildComponents(bodyClassName)}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, { theme: "one-dark-pro" }]],
          },
        }}
      />
    </div>
  );
}
