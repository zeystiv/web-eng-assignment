import { CopyButton } from "@/components/blog/copy-button";

type Props = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: Props) {
  const tw = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const ln = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const hn = `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-1.5">
      <span className="mr-1 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Share
      </span>
      <ShareLink href={tw} label="Share on X (Twitter)">
        <XIcon />
      </ShareLink>
      <ShareLink href={ln} label="Share on LinkedIn">
        <LinkedInIcon />
      </ShareLink>
      <ShareLink href={hn} label="Share on Hacker News">
        <span className="text-xs font-bold leading-none">HN</span>
      </ShareLink>
      <CopyButton url={url} />
    </div>
  );
}

function ShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-8 w-8 place-items-center rounded-full border border-border-default bg-surface/50 text-muted transition-colors hover:border-accent-border hover:text-ochre"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.244 2H21l-6.52 7.452L22 22h-6.41l-4.86-6.36L5.04 22H2.282l6.99-7.985L2 2h6.567l4.39 5.806L18.244 2Zm-1.122 18h1.835L7.046 4H5.077l12.045 16Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      aria-hidden
      fill="currentColor"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zM7.5 8h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.94H17.2v-7.93c0-1.89-.04-4.32-2.63-4.32-2.63 0-3.03 2.06-3.03 4.18V22H7.5V8z" />
    </svg>
  );
}