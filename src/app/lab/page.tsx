import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { AgeFact } from "@/components/site/age-fact";
import { ScrollLink } from "@/components/site/scroll-link";
import { Tag } from "@/components/site/tag";
import { Button } from "@/components/ui/button";
import { socials } from "@/lib/socials";
import { JsonLd } from "@/components/site/json-ld";
import {
  jsonLdGraph,
  siteUrl,
  websiteEntity,
  organizationEntity,
  personEntity,
  profilePageEntity,
  breadcrumbEntity,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Rao Zaeem · Lab — Projects, Toolkit & Setup",
  description:
    "A developer portfolio and lab — what I'm building and why, the toolkit, education, and everyday setup.",
  alternates: { canonical: "/lab" },
  openGraph: {
    title: "Rao Zaeem · Lab — Projects, Toolkit & Setup",
    description:
      "A developer portfolio and lab — what I'm building and why, the toolkit, education, and everyday setup.",
    url: `${siteUrl}/lab`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rao Zaeem · Lab — Projects, Toolkit & Setup",
    description:
      "A developer portfolio and lab — what I'm building and why, the toolkit, education, and everyday setup.",
  },
};

const infoRows = [
  { label: "Name", value: "Rao Zaeem" },
  { label: "Handle", value: "@zeystiv" },
  { label: "Currently", value: "Building Systivia" },
  { label: "Based in", value: "Karachi, Pakistan" },
  { label: "Random fact", value: "I like to have cats on my profile picture." },
];

const education = [
  {
    degree: "Bachelors in Computer Science",
    institution: "Sindh Madressatul Islam University, Karachi",
    year: "2024 – 2026",
  },
  {
    degree: "Intermediate",
    institution: "Government Degree College Gulshan-e-Iqbal Block 7, Karachi",
    year: "2021 – 2023",
  },
];

const toolkitGroups = [
  {
    label: "Frontend",
    items: ["React JS", "Next JS", "Tailwind CSS", "Apollo Client", "React Query"],
  },
  {
    label: "Backend",
    items: ["Nest JS", "Express JS", "GraphQL", "Rest API", "BullMQ", "WebSocket"],
  },
  {
    label: "Database",
    items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Drizzle", "Prisma"],
  },
  {
    label: "Languages",
    items: ["Javascript", "TypeScript", "Python"],
  },
  {
    label: "CMS",
    items: ["Keystatic", "Payload", "markdown"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    label: "Tools & DevOps",
    items: ["Git", "GitHub", "Digital Ocean", "Vercel", "Nginx", "pm2"],
  },
  {
    label: "Linux / Systems",
    items: ["Ubuntu", "Arch Linux"],
  },
];

const setupCategories = [
  {
    label: "System",
    items: [
      { key: "Distro", value: "CachyOS" },
      { key: "Based On", value: "Arch Linux" },
      { key: "Kernel", value: "Linux (CachyOS)" },
      { key: "Desktop", value: "KDE Plasma" },
      { key: "Session", value: "Wayland" },
      { key: "Browser", value: "Chrome" },
      { key: "File Manager", value: "Dolphin" },
    ],
  },
  {
    label: "Shell & Terminal",
    items: [
      { key: "Terminal", value: "Konsole" },
      { key: "Shell", value: "Fish" },
      { key: "Prompt", value: "Starship" },
    ],
  },
  {
    label: "Editor",
    items: [
      { key: "Editor", value: "Neovim" },
      { key: "Config", value: "LazyVim" },
      { key: "Theme", value: "Tokyo Night" },
      { key: "Language", value: "TypeScript" },
    ],
  },
  {
    label: "CLI Tools",
    items: [
      { key: "Git TUI", value: "LazyGit" },
      { key: "Package Manager", value: "pnpm" },
      { key: "File Viewer", value: "bat" },
      { key: "File Finder", value: "fd" },
      { key: "Grep", value: "ripgrep" },
      { key: "Fuzzy Finder", value: "fzf" },
      { key: "Smart Cd", value: "zoxide" },
      { key: "Ls Replacement", value: "eza" },
      { key: "Sys Monitor", value: "btop" },
    ],
  },
];

const jsonLd = jsonLdGraph([
  websiteEntity,
  organizationEntity,
  {
    ...personEntity,
    alumniOf: education.slice(0, 2).map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
    })),
  },
  profilePageEntity({
    url: `${siteUrl}/lab`,
    name: "The Lab — Rao Zaeem",
    description:
      "A developer portfolio and lab — what I'm building and why, the toolkit, education, and everyday setup.",
  }),
  breadcrumbEntity({
    url: `${siteUrl}/lab`,
    items: [
      { name: "Home", url: siteUrl },
      { name: "Lab", url: `${siteUrl}/lab` },
    ],
  }),
]);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* ── Hero ── */}
      <section aria-label="The Lab" className="relative overflow-hidden border-y border-border-default py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[7fr_3fr] lg:gap-20">
            <div>
              <p className="mb-4 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                The Lab
              </p>
              <h1 className="font-heading max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.08] lg:text-[3rem] lg:leading-[1.08] xl:text-[3.25rem]">
                A Page That Can Prove I&rsquo;m <span className="text-ochre">Also A Developer</span>
              </h1>
              <p className="mt-6 max-w-2xl font-reading text-lg leading-relaxed text-ink-soft sm:text-xl">
                A nerd inside me wanted to show off!
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button asChild variant="primary" size="lg">
                  <ScrollLink targetId="setup">Check out My Setup</ScrollLink>
                </Button>
                <ScrollLink
                  targetId="projects"
                  className="inline-flex items-center gap-1.5 font-reading text-base font-medium text-muted transition-colors hover:text-ochre"
                >
                  See What I&rsquo;m Building
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </ScrollLink>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border-default bg-parchment text-muted transition-colors hover:border-ochre hover:text-ochre [&_svg]:h-4 [&_svg]:w-4"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="rounded-lg border border-border-default bg-surface/50 p-5 shadow-[0_20px_60px_-15px_rgba(61,51,36,0.12)]">
                <dl className="space-y-3">
                  {infoRows.map((row) => (
                    <div
                      key={row.label}
                      className="border-b border-border-default pb-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Background ── */}
      <section aria-label="Background" className="border-y border-border-default bg-bg-alt py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Don&rsquo;t <span className="text-ochre">Read This</span>
              </h2>
              <div className="mt-6 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  Most developer follow the same formula in their portfolio — techy design, a skills list, some projects, education,
                  a few blog links. Honestly, when I started building this, I didn't know what I wanted. I just wanted something live
                  on raozaeem.com. It started messy, ugly, confusing, unstructured. This is me shaping it into something that actually
                  feels like mine.
                </p>
                <p>
                  Since you're still reading this despite being told not to — fine, I'll yap. The heading was bait. So was the little
                  game asking for your age. Worked, though!
                </p>
                <p>
                  Here's the actual point of this section: my landing page is entirely about my philosophy — the root of who I am, the
                  shift I believe in, why I write and put my work out publicly. There was no room left for a developer portfolio. So I
                  built this page — the Lab, to give it one.
                </p>
              </div>
            </div>
            <div className="w-full max-w-md mx-auto lg:max-w-none lg:mx-0">
              <AgeFact />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Projects ── */}
      <section id="projects" aria-label="Projects" className="border-y border-border-default py-20 sm:py-28">
        <Container>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Projects
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What I&rsquo;m <span className="text-ochre">building</span>
          </h2>

          <div className="mt-10 space-y-16">
            {/* ── Systivia ── */}
            <article>
              <div className="grid items-start gap-10 lg:grid-cols-[3fr_1fr] lg:gap-12">
                <div className="min-w-0">
                  <header>
                    <span className="mb-3 inline-flex items-center rounded-full border border-accent-border bg-accent-soft-bg px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ochre">
                      mobile-app
                    </span>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      <Link
                        href="/lab/systivia"
                        className="group inline-flex flex-wrap items-center gap-x-3 gap-y-2 transition-colors hover:text-ochre"
                      >
                        <span>Systivia: Identity-Led Habits</span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold not-italic">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    </h3>
                  </header>

                  <div className="mt-5 space-y-4 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                    <p>
                      The problem is obvious: chasing outcomes doesn't build habits. Everyone has tried it at some point and failed. But most people never find the real reason — they just blame themselves, or their ability to build habits. The truth is, the problem was never you. You were just doing it the wrong way.
                    </p>
                    <p>
                      We don't build habits by chasing outcomes. We build them by focusing on who we believe we already are. If you believe you're lazy, forcing yourself to the gym will never become a habit — you're fighting who you believe you are, not becoming someone new. Someone who believes they're disciplined doesn't have to force it. They just show up.
                    </p>
                    <p>
                      Systivia tracks your habits by tracking your identity. Not streaks, not outcomes — who you're becoming. Identity persists. That's what builds habits that last.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag>mobile-app</Tag>
                    <Tag>react-native</Tag>
                    <Tag>expo</Tag>
                    <Tag>habit-tracker</Tag>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button asChild variant="accent" size="sm">
                      <Link href="https://systivia.com" target="_blank" rel="noreferrer">
                        Live site
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </Link>
                    </Button>
                    <Button asChild variant="accent" size="sm">
                      <Link href="https://play.google.com/store/apps/details?id=com.systivia.habits" target="_blank" rel="noreferrer">
                        Play Store
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/lab/systivia">
                        Read the case study
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>

                <aside className="rounded-lg border border-border-default bg-surface/50 p-6">
                  <dl className="space-y-3">
                    {[
                      { label: "Project", value: "Systivia" },
                      { label: "Platform", value: "Android (Google Play)" },
                      { label: "Status", value: "Live" },
                      { label: "Focus", value: "Identity-based habits" },
                      { label: "Architecture", value: "Offline-first, no backend" },
                      { label: "Stack", value: "Expo · React Native · TypeScript · SQLite" },
                    ].map((row) => (
                      <div key={row.label} className="border-b border-border-default pb-3 last:border-b-0 last:pb-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{row.label}</dt>
                        <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>
            </article>

            {/* ── Systivia Circle ── */}
            <article className="border-t border-border-default pt-16">
              <div className="grid items-start gap-10 lg:grid-cols-[3fr_1fr] lg:gap-12">
                <div className="min-w-0">
                  <header>
                    <span className="mb-3 inline-flex items-center rounded-full border border-accent-border bg-accent-soft-bg px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ochre">
                      community
                    </span>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      Systivia Circle
                    </h3>
                  </header>

                  <div className="mt-5 space-y-4 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                    <p>
                      Doing it alone is hard. Motivation fades, accountability disappears, and there's no one to notice when you show up — or when you don't. Most people trying to change end up isolated in it, and isolation is exactly where habits go to die.
                    </p>
                    <p>
                      Systivia was never meant to be just an app. It's an ecosystem — and this is where that ecosystem lives. A place to find people who are actually doing this too, not just followers, real connections. Share your progress, swap what's working, find someone to hold you accountable when you don't feel like it. Inspire someone on a hard day, get inspired on yours. Less a server, more a club for people building who they want to become.
                    </p>
                    <p>
                      Community doesn't replace identity — it reinforces it. Surround yourself with people becoming who you want to be, and becoming gets easier. That's the whole point.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag>community</Tag>
                    <Tag>discord</Tag>
                    <Tag>accountability</Tag>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button asChild variant="accent" size="sm">
                      <Link href="https://systivia.com/dis" target="_blank" rel="noreferrer">
                        Join The Circle
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M7 17 17 7" />
                          <path d="M7 7h10v10" />
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>

                <aside className="rounded-lg border border-border-default bg-surface/50 p-6">
                  <dl className="space-y-3">
                    {[
                      { label: "Platform", value: "Discord" },
                      { label: "Focus", value: "Habit building" },
                    ].map((row) => (
                      <div key={row.label} className="border-b border-border-default pb-3 last:border-b-0 last:pb-0">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{row.label}</dt>
                        <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* ── Education ── */}
      <section id="education" aria-label="Education" className="border-y border-border-default bg-bg-alt py-20 sm:py-28">
        <Container>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Background
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            <span className="text-ochre">Education</span>
          </h2>
          <p className="mt-2 font-reading text-lg text-muted">
            They say I needed it
          </p>

          <div className="relative mt-10 max-w-2xl pl-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border-default" />

            <div className="space-y-10">
              {education.map((entry) => (
                <div key={entry.degree} className="relative">
                  <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-ochre bg-bg-base" />

                  <span className="text-lg font-semibold text-ochre">
                    {entry.year}
                  </span>
                  <div className="mt-1 font-reading text-base font-medium text-ink">
                    {entry.degree}
                  </div>
                  <div className="mt-0.5 text-sm text-muted">
                    {entry.institution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Toolkit ── */}
      <section id="toolkit" aria-label="Toolkit" className="border-y border-border-default py-20 sm:py-28">
        <Container>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Skills and tools
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            What I <span className="text-ochre">work with.</span>
          </h2>
          <p className="mt-2 font-reading text-lg text-muted">
            Picked out the ones that I enjoy using the most, but not limited to just these
          </p>

          <div className="mt-10 max-w-4xl space-y-6">
            {toolkitGroups.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-2 border-b border-border-default pb-6 sm:flex-row sm:items-baseline sm:gap-4 lg:last:border-b-0 lg:last:pb-0"
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted sm:w-40 sm:shrink-0">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item} className="text-sm">{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── My Setup ── */}
      <section id="setup" aria-label="My Setup" className="border-y border-border-default bg-bg-alt py-20 sm:py-28">
        <Container>
          <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            My Setup
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            The <span className="text-ochre">everyday toolkit.</span>
          </h2>
          <p className="mt-2 max-w-2xl font-reading text-lg text-ink-soft">
            The stack that keeps me productive — a fast kernel, a desktop that stays
            out of the way, and tools I actually enjoy using.
          </p>

          <div className="mt-10 space-y-5">
            {setupCategories.map((cat) => (
              <div
                key={cat.label}
                className="rounded-lg border border-border-default bg-surface/50 p-6 sm:p-7"
              >
                <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-ochre">
                  {cat.label}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                  {cat.items.map((item) => (
                    <div key={item.key}>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                        {item.key}
                      </span>
                      <div className="mt-0.5 font-reading text-sm text-ink">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
