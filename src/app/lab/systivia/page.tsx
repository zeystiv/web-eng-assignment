import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { Tag } from "@/components/site/tag";
import { Button } from "@/components/ui/button";
import { ScreenshotCarousel } from "@/components/site/screenshot-carousel";
import { PageTOC } from "./page-toc";
import { socials } from "@/lib/socials";
import { env } from "@/lib/env";
import { JsonLd } from "@/components/site/json-ld";
import {
  jsonLdGraph,
  websiteEntity,
  organizationEntity,
  personEntity,
  PERSON_ID,
  breadcrumbEntity,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Systivia — Identity-Based Habit Tracker (Case Study)",
  description:
    "Systivia is an identity-based habit tracker for Android. Built with Expo, React Native — no account, no backend, everything on your device.",
  alternates: { canonical: "/lab/systivia" },
  openGraph: {
    title: "Systivia — Identity-Based Habit Tracker (Case Study)",
    description:
      "Systivia is an identity-based habit tracker for Android. Built with Expo, React Native — no account, no backend, everything on your device.",
    url: `${env.siteUrl}/lab/systivia`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Systivia — Identity-Based Habit Tracker (Case Study)",
    description:
      "Systivia is an identity-based habit tracker for Android. Built with Expo, React Native — no account, no backend, everything on your device.",
  },
};

const screenshots = [
  { src: "/projects/systivia/app-screenshots/select-identity.webp", alt: "Systivia onboarding — choosing identities" },
  { src: "/projects/systivia/app-screenshots/habit-1.webp", alt: "Creating a habit connected to an identity" },
  { src: "/projects/systivia/app-screenshots/habit-3.webp", alt: "Habit creation with scheduling options" },
  { src: "/projects/systivia/app-screenshots/habit-overview.webp", alt: "Daily habit view with identity alignment" },
  { src: "/projects/systivia/app-screenshots/complete-habit.webp", alt: "Habit completion with praisal celebration" },
  { src: "/projects/systivia/app-screenshots/celebration.webp", alt: "Full-screen confetti celebration" },
  { src: "/projects/systivia/app-screenshots/habit-calendar.webp", alt: "Calendar view of habit progress" },
  { src: "/projects/systivia/app-screenshots/7-day-calendar.webp", alt: "7-day habits overview" },
];

const problemItems = [
  {
    title: "Streak Obsession",
    body: "Missing one day collapses your entire motivation. The anxiety of breaking a streak replaces the habit itself — you're no longer building the habit you wanted, you're building the habit of maintaining a streak.",
  },
  {
    title: "No Sense of Purpose",
    body: "Checking off a task with no identity behind it becomes a chore. There's no deeper reason behind the action — no sense of who you're trying to become. So when motivation dips, nothing pulls you back.",
  },
  {
    title: "Guilt as Motivation",
    body: "Missed-habit notifications are designed to make you feel guilty. It works for a week, then becomes something you dread opening — the opposite of what a habit app should feel like.",
  },
];

const features = [
  {
    title: "Identity-First Design",
    body: "Habits attach to identities chosen at onboarding. Praisals — affirmations — are drawn per-identity, so every completion reinforces who you're becoming, not just what you did.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Flexible Scheduling",
    body: "Daily, weekly, and monthly recurrence with interval steps, weekday selection, and negative day-of-month offsets — so \"last day of the month\" always resolves correctly, even across 28, 30, and 31-day months.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    title: "Honest Completion Logic",
    body: "Today's habits can be completed or skipped. Yesterday's pending items can only be skipped with a required note — no rewriting history. Anything older is read-only. Skipping isn't failure, it's acknowledging reality.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Personalized Celebration",
    body: "A random praisal drawn from the habit's identity bank on completion, full-screen confetti and haptic feedback, and a shareable praisal card via the system share sheet.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5.8 11.3 2 22l10.7-3.79" />
        <path d="M4 3h.01" />
        <path d="M22 8h.01" />
        <path d="M15 2h.01" />
        <path d="M22 20h.01" />
        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2z" />
      </svg>
    ),
  },
  {
    title: "Reminders That Don\u2019t Nag",
    body: "Notifications arrive at your habit\u2019s scheduled time with a random identity-based phrase, not a guilt trip. \u201CTime to be the writer you\u2019re becoming\u201D hits differently than \u201CYou missed your task\u201D \u2014 same nudge, but it reinforces who you are, not what you failed to do.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
  },
  {
    title: "Your Data Stays Yours",
    body: "No account, no login, no backend. Full backup and restore via a portable .systivia file — export and import validated and applied atomically, so a bad file can never corrupt your data.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const timeline = [
  { date: "Aug 2025", title: "The first line of code", body: "Started building what would become Systivia \u2014 habits shaped by identity, not just checkboxes." },
  { date: "Sep 2025", title: "A new name", body: "Renamed the project to Systivia." },
  { date: "Late 2025", title: "The core experience comes together", body: "Built onboarding (choosing your identities), calendar view, dashboard, celebration moments, and the ability to skip a habit guilt-free." },
  { date: "Dec 2025", title: "First version goes live", body: "Shipped the first working version of Systivia on the web." },
  { date: "Jan 2026", title: "Public launch", body: "Bought a domain, opened Systivia to the public, and gave it a proper landing page. Also simplified habit creation \u2014 it had gotten too complicated, so it was stripped down to something faster and more approachable." },
  { date: "Feb\u2013Mar 2026", title: "The pivot", body: "Cut distractions and unnecessary features, shifting focus toward building a real community. Tried to make the web app installable on phones \u2014 it didn\u2019t work well enough. Realized people needed an actual app, not a website, and started building one from scratch." },
  { date: "Apr\u2013May 2026", title: "Getting the app to actually work", body: "Rebuilt the mobile app until it worked. Built the first real, installable version, redesigned the site around it, and retired the old web app for good." },
  { date: "May 2026", title: "First real users", body: "17 early testers, then a beta release on Google Play for a small testing group." },
  { date: "Jun 9, 2026", title: "Systivia goes public", body: "Approved for full production release on Google Play \u2014 officially available to everyone." },
  { date: "Jun 2026", title: "Setback and a reset", body: "Lost free hosting credits months early, forcing a scramble to keep things running. Used the moment to get more honest \u2014 rewrote the About page, opened the Discord community, and started real marketing." },
  { date: "Aug 31, 2026", title: "Version 2.0: fully offline", body: "Rebuilt the app to work completely offline \u2014 no server, better reliability, no dependency on hosting." },
  { date: "Sep 2026", title: "Polish and control", body: "Shipped updates for notification reliability, performance, and data export/import with a dedicated settings screen." },
  { date: "Now", title: "Building forward", body: "Improving, writing blogs, growing the user base, and building the community." },
];

const techStack = [
  { category: "Framework", items: ["Expo SDK 57", "React Native 0.86.3", "React 19.2.3", "TypeScript 6"] },
  { category: "Data", items: ["expo-sqlite (WAL)", "Drizzle ORM"] },
  { category: "State", items: ["Zustand"] },
  { category: "UX & Interaction", items: ["NativeWind 5 (Tailwind v4)", "Reanimated", "Gesture Handler", "react-native-svg", "react-native-view-shot", "expo-haptics", "@gorhom/bottom-sheet"] },
  { category: "Notifications", items: ["react-native-notify-kit"] },
  { category: "Utilities", items: ["Luxon (date/timezone math)", "AsyncStorage", "expo-document-picker", "expo-sharing", "expo-file-system"] },
  { category: "Testing", items: ["Jest", "ts-jest", "better-sqlite3 (in-memory mock engine)"] },
];

const faqItems = [
  { q: "What is an identity in Systivia?", a: "An identity is the person you're becoming — an archetype you choose, like Reader, Writer, Athlete, or a focused Student. Every habit you create is tied to one of these identities, and every completion becomes a small vote for that person. Instead of protecting a streak, you're building proof of who you're becoming." },
  { q: "What are identity-led habits?", a: "Identity-led habits are habits that grow out of the person you want to become, rather than a streak you're afraid to break. You pick a few identities at onboarding, attach each habit to one of them, and every time you show up you cast a vote for that identity. A missed day doesn't erase who you are — it just makes you a person with a day off. That shift in self-belief is what keeps habits going long after motivation fades." },
  { q: "Is Systivia free?", a: "Yes. The core habit tracker, identity tagging, scheduling, reminders, and praisals are all completely free. There is no paid plan, no premium tier, and no locked features — the whole app, for everyone, exactly the same." },
  { q: "How is Systivia different from other habit trackers?", a: "Most habit trackers focus on streaks, gamification, or charts. Systivia focuses on identity — each habit ties to who you're becoming, and every check-in earns you a praisal instead of breaking a streak. It's also fully offline, free, unlimited, and tracks measurable goals with real scoring." },
  { q: "Where is my data stored in Systivia?", a: "On your device, and only your device. Systivia has no backend and no servers — your habits, identities, completions, notes, and praisals all live locally, and the app works 100% offline. Nothing is uploaded, shared, or synced anywhere, and uninstalling the app removes everything permanently, because nothing was ever copied elsewhere." },
  { q: "Can I switch devices without losing my data?", a: "Yes. Export your data as a .systivia file and import it on your new device — habits, history, and preferences all come with you. You can open the file directly from WhatsApp, Telegram, or any file manager. Your data stays on your device, your way, and moves only when you move it." },
  { q: "Can I change my identities later?", a: "Yes. Your identities aren't locked in at signup. You can add, edit, or remove them at any time, and reassign habits to a new identity whenever your focus shifts. Who you're becoming is allowed to evolve — Systivia is built to evolve with you." },
  { q: "Can I track measurable goals per habit, like pages or miles?", a: "Yes. Every habit supports multiple goal types — 'at least', 'at most', and 'exactly' — so you can set a target like 'at least 12 push-ups', 'at least 1 mile', 'less than 1 hour' of screen time, or 'exactly 3 glasses of water', and Systivia will track your progress against it." },
  { q: "Can I set multiple reminders for the same habit?", a: "Yes. Every habit can have several reminders in a single day, so you can be gently nudged at the moments that actually work for you. Reminders fire locally on your device, respect your quiet hours, and never touch a server." },
  { q: "What schedule options can I set for a habit?", a: "You're not stuck with daily. Habits can run daily, weekly, or monthly, and you can schedule the same habit multiple times in a day. If life gets in the way, you can catch up on yesterday without guilt, and quiet hours keep reminders respectful of your downtime." },
  { q: "How does Systivia focus on identity?", a: "Every time you complete a habit, Systivia celebrates the identity you're building — not just another day on a streak. That celebration is a praisal: a personalized card tied to the identity you showed up for. It keeps the focus on who you're becoming, so motivation comes from self-belief instead of the fear of breaking a number." },
  { q: "What is a praisal and can I customize it?", a: "A praisal is a short, customizable celebration tied to the identity you completed a habit for — delivered as a card you can keep or share. And yes, every praisal is fully customizable: the message, the tone, and how it looks can all be tailored, so the praise always feels personally yours." },
];

export default function SystiviaPage() {
  const jsonLd = jsonLdGraph([
    websiteEntity,
    organizationEntity,
    personEntity,
    {
      "@type": "SoftwareApplication",
      "@id": `${env.siteUrl}/lab/systivia#app`,
      name: "Systivia",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android",
      url: `${env.siteUrl}/lab/systivia`,
      sameAs: [
        "https://systivia.com",
        "https://play.google.com/store/apps/details?id=com.systivia.habits",
      ],
      description: metadata.description,
      image: `${env.siteUrl}/opengraph-image`,
      screenshot: screenshots.slice(0, 3).map((s) => `${env.siteUrl}${s.src}`),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
      creator: { "@id": PERSON_ID },
      datePublished: "2026-06-09",
    },
    {
      "@type": "FAQPage",
      "@id": `${env.siteUrl}/lab/systivia#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    breadcrumbEntity({
      url: `${env.siteUrl}/lab/systivia`,
      items: [
        { name: "Home", url: env.siteUrl },
        { name: "Lab", url: `${env.siteUrl}/lab` },
        { name: "Systivia", url: `${env.siteUrl}/lab/systivia` },
      ],
    }),
  ]);

  return (
    <>
      {/* ── Structured data ── */}
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <section aria-label="Systivia" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        <Container className="max-w-[112rem]">
          <div className="grid items-center gap-12 lg:grid-cols-[7fr_3fr] lg:gap-20">
            <div>
              <span className="mb-4 inline-block rounded-full border border-accent-border bg-accent-soft-bg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ochre">
                Mobile App
              </span>
              <h1 className="font-heading max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.08] lg:text-[3rem] lg:leading-[1.08] xl:text-[3.25rem]">
                The Habit Tracker That Focuses On{" "}
                <span className="text-ochre">Who You Want To Become</span>
              </h1>
              <p className="mt-6 max-w-2xl font-reading text-lg leading-relaxed text-ink-soft sm:text-xl">
                True behavior change is identity change. We don't build habits by chasing outcomes - we build them by deciding who we already believe we are.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button asChild variant="accent" size="lg">
                  <Link
                    href="https://play.google.com/store/apps/details?id=com.systivia.habits"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    Get on Google Play
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="https://systivia.com" target="_blank" rel="noreferrer">
                    Visit Website
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
              <div className="rounded-lg border border-border-default bg-surface p-5 shadow-[0_20px_60px_-15px_rgba(61,51,36,0.12)]">
                <dl className="grid grid-cols-2 gap-x-5 gap-y-3">
                  <div className="border-b border-border-default pb-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Project</dt>
                    <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">Systivia</dd>
                  </div>
                  <div className="border-b border-border-default pb-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Developer</dt>
                    <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">Rao Zaeem</dd>
                  </div>
                  <div className="border-b border-border-default pb-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Platform</dt>
                    <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">Android (Google Play)</dd>
                  </div>
                  <div className="border-b border-border-default pb-3">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">Status</dt>
                    <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">Live</dd>
                  </div>
                  {[
                    { label: "Focus", value: "Identity-based habits" },
                    { label: "Architecture", value: "Offline-first, no backend" },
                    { label: "Stack", value: "Expo \u00b7 React Native \u00b7 TypeScript \u00b7 SQLite" },
                  ].map((row) => (
                    <div key={row.label} className="col-span-2 border-b border-border-default pb-3 last:border-b-0 last:pb-0">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">{row.label}</dt>
                      <dd className="mt-0.5 font-reading text-sm leading-relaxed text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 border-t border-border-default pt-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                    Connect with developer
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {socials.filter((s) => ["github", "twitter", "linkedin", "instagram"].includes(s.platform)).map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-border-default bg-parchment text-muted transition-colors hover:border-ochre hover:text-ochre [&_svg]:h-3.5 [&_svg]:w-3.5"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Main grid: Content + TOC ── */}
      <Container className="max-w-[112rem]">
        <div className="grid gap-10 lg:grid-cols-[7fr_3fr] lg:gap-20">
          {/* ── Left: content ── */}
          <div className="mx-auto min-w-0 w-full max-w-[42rem] space-y-20">

            {/* ═══════ FOR EVERYONE ═══════ */}

            {/* ── Screenshots ── */}
            <section id="screenshots">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                App Screenshots
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Inside Systivia
              </h2>
              <div className="mt-8">
                <ScreenshotCarousel screenshots={screenshots} />
              </div>
              <p className="mt-4 font-reading text-sm text-muted">
                Systivia&apos;s identity-first onboarding and daily check-in flow.
              </p>
            </section>

            {/* ── The Problem ── */}
            <section id="the-problem">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                The Problem
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Chasing Outcome Doesn&apos;t Build Habit
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  Most people think about chasing a certain outcome when the
                  topic is building a habit &mdash; for example: lose 10 kg, quit
                  smoking, read a new book. But the problem is, even with sincere
                  motivation and desire, it becomes a hassle to follow through
                  after a couple of days. You might say you ended up losing
                  motivation, or just lost the will to do it anymore, or even
                  came up with all sorts of excuses to feel better about
                  quitting. The problem wasn&apos;t the motivation, or anything
                  wrong with you, or the outcome you were chasing. You failed
                  because you were trying to build the habit the wrong way.
                </p>
                <p>
                  Outcome is what most people chase, and they end up failing
                  &mdash; then they start doubting themselves or their ability to
                  build habits, and may even give up trying again. The problem was
                  never about you.
                </p>
                <p>
                  Every outcome is achieved by some process. If you want to drink
                  water, you gotta go fetch it or use some means to get it and
                  drink it &mdash; it won&apos;t happen just by desiring the
                  outcome, at least not in this world! Okay, so you may think
                  it&apos;s the process that builds all habits, right? Wrong!
                </p>
                <p>
                  Our everyday actions are driven by some belief we carry with
                  ourselves. If someone is waking up early to go to the office,
                  it&apos;s because they believe they do it to earn a living. For
                  every process to take place, there must be a belief driving it.
                </p>
                <p>
                  You can&apos;t go to the gym every day if you believe
                  you&apos;re a lazy person, and a disciplined person will never
                  quit going to the gym. The difference isn&apos;t the outcome
                  (working out) or the process (driving yourself to the gym)
                  &mdash; it&apos;s the identity these two people carry and
                  believe about themselves.
                </p>
                <p>
                  So we don&apos;t build habits by chasing outcomes or forcing a
                  process. We can only build habits that last by building an
                  identity.
                </p>
                <ul className="my-5 space-y-2 pl-6 list-disc marker:text-ochre">
                  <li className="font-reading text-ink-soft">The goal is not to write a blog; it&apos;s to become a writer.</li>
                  <li className="font-reading text-ink-soft">The goal is not to go to the gym; it&apos;s to become a disciplined person.</li>
                  <li className="font-reading text-ink-soft">The goal is not to take care of your skin; it&apos;s to become someone with good skin.</li>
                </ul>
                <p className="pt-2 font-reading text-lg font-medium text-ink lg:text-xl">
                  Systivia does exactly that &mdash; it focuses on your identity
                  and builds the person you&apos;re becoming, not just the
                  streaks or the outcome.
                </p>
              </div>

              {/* ── Read more ── */}
              <Link
                href="https://systivia.com/blog/identity-based-habits"
                target="_blank"
                rel="noreferrer"
                className="group mt-10 block rounded-lg border border-border-default bg-surface/50 p-6 transition-colors hover:border-ochre"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                  Read more
                  <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <h3 className="mt-3 font-heading text-xl font-bold text-ink transition-colors group-hover:text-ochre">
                  You Don&apos;t Build Habits, You Build Identity
                </h3>
                <p className="mt-2 font-reading text-sm leading-relaxed text-ink-soft">
                  The idea behind Systivia. Your habits shape your identity, and
                  your identity shapes your habits. Every habit is a vote for who
                  you&apos;re becoming &mdash; here&apos;s why most people fail to
                  change, and how to fix it.
                </p>
              </Link>
            </section>

            {/* ── Why You Fail ── */}
            <section id="why-you-fail">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Why You Fail
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                When Belief Is Fighting Against Your Action
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  Imagine a person trying to quit smoking. He&apos;s offered a
                  cigarette and declines with &ldquo;Sorry, I&apos;m trying to
                  quit.&rdquo; Sounds like a good response. But he&apos;s still
                  trying to become something else while believing he&apos;s a
                  smoker. He&apos;s hoping his behavior can change while carrying
                  the same belief.
                </p>
                <p>
                  Now imagine the same situation, but he answers &ldquo;Sorry,
                  I&apos;m not a smoker.&rdquo; A subtle difference &mdash; but
                  this is a change in identity. He believes he&apos;s not a
                  smoker, and that belief drives him to decline more easily. But
                  if he still believed he&apos;s a smoker who&apos;s trying to
                  quit, that belief will make it harder for him to decline, and
                  he&apos;ll lose his sense of purpose very soon &mdash; leading
                  him to fail.
                </p>
                <p>
                  Most people fail at building a new habit because they never
                  build the identity capable of holding it. They&apos;re trying
                  to become something else while still carrying the same beliefs
                  about themselves. You can&apos;t become a new person while
                  holding onto the same beliefs and patterns that kept you stuck
                  as the old version of yourself.
                </p>
                <p>
                  If you&apos;re forcing yourself to go to the gym while still
                  believing you&apos;re a lazy person, that belief will fight
                  against your will every time, and it will lead you to quit. You
                  need to align your beliefs with the outcome you&apos;re chasing
                  &mdash; you need a belief that drives you to do the work.
                </p>
              </div>
            </section>

            {/* ── Why Existing Trackers Fail ── */}
            <section id="why-trackers-fail">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Why Existing Trackers Miss the Point
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Problems With Streak-Based Tracker Apps
              </h2>
              <p className="mt-8 max-w-2xl font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                Streak-based apps are built to protect one number. But that
                number isn&apos;t the habit &mdash; and protecting it makes the
                habit itself harder to keep.
              </p>
              <div className="mt-10 divide-y divide-border-default">
                {problemItems.map((item, i) => (
                  <div key={item.title} className="flex flex-col gap-4 py-8 first:pt-0 last:pb-0 sm:flex-row sm:gap-8">
                    <span className="font-reading text-4xl font-medium leading-none text-ochre/40 sm:w-16 sm:shrink-0 sm:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-ink">{item.title}</h3>
                      <p className="mt-3 max-w-2xl font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-lg border-l-4 border-r border-t border-b border-ochre bg-accent-soft-bg p-8">
                <p className="font-reading text-xl italic leading-relaxed text-ink">
                  You end up with the habit of maintaining a streak &mdash; not
                  the action you set out to do.
                </p>
                <p className="mt-3 font-reading text-base leading-relaxed text-ink-soft">
                  These apps optimize for streak length and daily active use. You
                  start associating yourself with someone who never breaks a
                  streak &mdash; so without the app, you have no habit at all.
                </p>
              </div>
            </section>

            {/* ── Start With Who ── */}
            <section id="start-with-who">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                The Approach
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Start With Who, Not What
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  Once we understand that true behavior change is identity change,
                  the real focus for building new habits should be on the belief
                  system that drives your everyday actions. Developing a habit of
                  working out requires you to believe you&apos;re a disciplined
                  person. Someone who believes they&apos;re lazy will fail at it.
                </p>
                <p>
                  For building a new habit, you need to start with who
                  you&apos;re going to become. If you&apos;re going to write,
                  focus on believing you&apos;re a writer. If it&apos;s taking
                  your wife on a date every Saturday, focus on being the
                  passionate husband.
                </p>
                <p>
                  Every action is a vote for your identity &mdash; the more you do
                  the action, the more you believe you&apos;re someone who does
                  it. They say you need practice to be confident. The more you
                  practice, the more confident you become, because confidence is
                  an identity built through repeated proof of your ability to do
                  something. The more you do it, the more proof you have.
                </p>
                <p>
                  Every time you go to the gym, it reinforces your identity as a
                  disciplined person and makes it stronger. Every action is a vote
                  for who you&apos;re becoming &mdash; but your actions have to
                  match what you believe you already are. If they don&apos;t
                  match, your belief is likely going to work against you and make
                  you quit soon.
                </p>
                <p className="pt-2 font-reading text-lg font-medium text-ink lg:text-xl">
                  The identity persists. The guilt doesn&apos;t.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  { label: "Choose Your Identity", desc: "Pick from 16 presets or create custom" },
                  { label: "Create Connected Habits", desc: "Every habit ties back to an identity" },
                  { label: "Track by Identity", desc: "Progress measured as alignment, not streaks" },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ochre bg-accent-soft-bg text-sm font-bold text-ochre">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div className="mt-3 font-heading text-sm font-bold text-ink">{step.label}</div>
                    <div className="mt-1 min-h-[2rem] font-reading text-xs text-muted">{step.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="text-center font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Example Identities
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {["Learner", "Good Mother", "Athlete", "Founder", "Healthy Individual", "Disciplined Person", "Creative", "Passionate Partner", "Writer", "Husband"].map((identity) => (
                    <span key={identity} className="rounded-full border border-accent-border bg-accent-soft-bg px-3 py-1 text-sm font-medium text-ochre">
                      {identity}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ── What Systivia Does ── */}
            <section id="what-systivia-does">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Features
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                What Systivia Does
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.title} className="rounded-lg border border-border-default bg-surface/50 p-6">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-border-default bg-parchment text-ochre">
                      {feature.icon}
                    </div>
                    <h3 className="font-heading text-base font-bold text-ink">{feature.title}</h3>
                    <p className="mt-2 font-reading text-base leading-relaxed text-ink-soft">{feature.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 font-reading text-base text-muted">
                Systivia is designed so you can focus on your identity first, so
                each action becomes a vote for who you&apos;re becoming. When
                belief is aligned with action, it becomes easy to follow through,
                and it results in a long-lasting habit.
              </p>
            </section>

            {/* ── Why This Project Matters ── */}
            <section id="why-this-matters">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Reflection
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                A Confession
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  It started as a personal struggle. I needed a system to track my
                  reading habit after I bought myself over 60 books &mdash; I could
                  make one for myself. It started as just a tracker I needed for
                  myself, then I wondered: why couldn&apos;t I build it for other
                  people who might need it too? That&apos;s how it started its
                  journey.
                </p>
                <p>
                  I renamed the project, brainstormed a lot of features and things
                  I wanted, and struggled with self-doubt and imposter syndrome
                  every day. I wasn&apos;t sure if what I was building would
                  provide value to anyone, or if I was even someone who could do
                  this. But I knew I needed to align my belief first to keep going,
                  because if I believed I wasn&apos;t a real founder, I&apos;d
                  never pull this through. So all I needed was to act like a real
                  founder &mdash; why couldn&apos;t I be? What&apos;s the
                  difference between me and people who actually build something and
                  grow it?
                </p>
                <p>
                  It took months and months of building, and I was hiding behind
                  building more and more features to avoid facing failure in front
                  of real users. I kept delaying because I wasn&apos;t feeling
                  &ldquo;ready&rdquo; to ship it yet &mdash; because it lacked some
                  more features I had in mind. Then I had to learn the hardest
                  lesson: stop hiding behind building features and face the truth.
                  It&apos;s okay to fail in front of real people, it&apos;s okay
                  to not have it perfect. It just needs to be simple &mdash; a lot
                  of features won&apos;t provide more value, but may just confuse
                  them. So I started cutting features and focused on shipping a
                  minimal, working core.
                </p>
                <p>
                  I first shipped a web app with a backend, then realized no one
                  would want to use a website for logging their habits, and it
                  lacked the ability to send reminders. Then I needed to take it to
                  the Play Store &mdash; again I had identity doubts. Was I even
                  someone who could publish on the Play Store? But I aligned my
                  belief with: why can&apos;t I? I&apos;m more than capable of it.
                  I learned mobile development, built the app with the same
                  features, and submitted it to Google Play Console. I gathered 18
                  testers to use my app for 14 days, as required by Google before
                  getting production access, and I pulled it through. Then I got
                  production access, and it went live on the Play Store.
                </p>
                <p>
                  Then I realized it&apos;d be better to cut down the backend and
                  simply ship a version that works offline, since it&apos;d provide
                  more privacy, availability, and better performance to users. So I
                  rebuilt it to work offline, and I&apos;ve been improving it ever
                  since.
                </p>
                <p>
                  But Systivia is not just an app &mdash; it&apos;s an ideology, a
                  philosophy of identity and how it shapes habits. I want to take
                  it further. Now I&apos;m running a community to bring real people
                  onboard, together in one place to communicate, and I&apos;m
                  writing blogs to deliver this ideology I want to push forward
                  &mdash; and I genuinely love doing it. I&apos;ve been working on
                  it for more than a year, and I&apos;m going to keep doing it,
                  because I believe results will come once there&apos;s enough
                  volume of content I&apos;ve built.
                </p>
              </div>
            </section>

            {/* ── Timeline ── */}
            <section id="timeline">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Timeline
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                The Journey
              </h2>
              <div className="relative mt-10 max-w-2xl pl-8">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-border-default" />
                <div className="space-y-10">
                  {timeline.map((entry) => (
                    <div key={entry.date} className="relative">
                      <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-ochre bg-bg-base" />
                      <span className="text-lg font-semibold text-ochre">{entry.date}</span>
                      <div className="mt-1 font-reading text-base font-medium text-ink">{entry.title}</div>
                      <div className="mt-0.5 font-reading text-sm text-muted">{entry.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Tech Stack ── */}
            <section id="tech-stack">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Tech Stack
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Under The Hood
              </h2>
              <p className="mt-4 max-w-2xl font-reading text-lg leading-relaxed text-ink-soft">
                The tools and technologies behind Systivia.
              </p>
              <div className="mt-8 space-y-5">
                {techStack.map((group) => (
                  <div key={group.category} className="flex flex-col gap-2 border-b border-border-default pb-5 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted sm:w-40 sm:shrink-0">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Tag key={item} className="text-[11px] p-1 px-3">
                          {item}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                FAQ
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 divide-y divide-border-default">
                {faqItems.map((item) => (
                  <details key={item.q} className="group py-6 first:pt-0 last:pb-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-ink">
                      {item.q}
                      <svg
                        className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <p className="mt-3 font-reading text-base leading-relaxed text-ink-soft">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

          </div>

          {/* ── Right: TOC ── */}
          <div className="hidden lg:block">
            <PageTOC />
          </div>
        </div>
      </Container>

      {/* ── Closing CTA ── */}
      <section className="py-20 sm:py-28">
        <Container className="max-w-[112rem]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Ready to build habits that stick?
            </h2>
            <p className="mt-4 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
              Try Systivia and start building habits around who you&apos;re
              becoming &mdash; not just what you&apos;re doing.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="accent" size="md">
                <Link href="https://play.google.com/store/apps/details?id=com.systivia.habits" target="_blank" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  Get on Google Play
                </Link>
              </Button>
              <Button asChild variant="secondary" size="md">
                <Link href="https://systivia.com" target="_blank" rel="noreferrer">
                  Visit Website
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
