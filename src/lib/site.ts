export const site = {
  name: "Rao Zaeem",
  handle: "@zeystiv",
  tagline: "Healing by Awareness, Progress by Intentional Effort.",
  description:
    "My honest record of self-improvement — healing by bringing awareness, progress by intentional effort. Writing it down, clearly.",
  /**
   * The Substack publication. `?transparent=1` only drops the iframe's own
   * background (`.embed-page.transparent { background: 0 0 }`) — the page
   * behind it already matches, since the publication's theme resolves to
   * `--web_bg_color: #fbf8f2` and `--background_pop: #b8842e`, the same
   * parchment and ochre this site uses.
   */
  newsletter: {
    publication: "Intentional Walk",
    url: "https://zeystiv.substack.com/",
    embedUrl: "https://zeystiv.substack.com/embed?transparent=1",
    feedUrl: "https://zeystiv.substack.com/feed",
    /**
     * Substack renders the embed at a fixed box: `.embed-page` fills the
     * iframe viewport and centres content capped at `max-width: 370px`, so
     * anything wider than 480px is dead whitespace and anything narrower
     * trips Substack's smaller type scale.
     *
     * `height` is a *control*, not a decoration — Substack hides parts of the
     * embed with height media queries: <=280px drops the logo, <=240px the
     * tagline, <=160px the publication name and byline, <=100px the
     * "Published with Substack" watermark. At 150 the embed is just the email
     * field, the Subscribe button and the terms line, which is the intended
     * bare strip. Raising it past 240 brings the tagline back and clips it
     * (the embed never scrolls), so don't.
     */
    width: 480,
    height: 150,
  },
  /** Plain section links. The prominent Subscribe button is `navCta` below,
      not a nav item — it points somewhere, but it isn't a section of the site. */
  nav: [
    { href: "/blog", label: "Blog" },
    { href: "/lab", label: "Lab" },
  ],
  /** Rendered as the accent pill after the nav links (desktop) and last in
      the mobile sheet. Kept out of `nav` so neither nav has to hardcode which
      href happens to be the CTA. */
  navCta: { href: "/newsletter", label: "Subscribe" },
  footerNav: {
    blog: [
      { href: "/blog", label: "Blog" },
      { href: "/newsletter", label: "Newsletter" },
    ],
    lab: [
      { href: "/lab", label: "Overview" },
      { href: "/lab/systivia", label: "Systivia" },
    ],
  },
  resources: [
    { href: "/llms.txt", label: "llms.txt" },
    { href: "/posts.json", label: "posts.json" },
  ],
} as const;
