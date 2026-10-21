import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/site/container";
import { FlipCard } from "@/components/site/flip-card";
import { NewsletterSection } from "@/components/site/newsletter-section";
import { ProjectCard } from "@/components/site/project-card";
import { ScrollLink } from "@/components/site/scroll-link";
import { WritingsSection } from "@/components/site/writings-section";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";
import { socials } from "@/lib/socials";
import { JsonLd } from "@/components/site/json-ld";
import {
  jsonLdGraph,
  siteUrl,
  websiteEntity,
  organizationEntity,
  personEntity,
  profilePageEntity,
} from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Rao Zaeem · Healing by Awareness, Progress by Intentional Effort",
  description:
    "My honest record of self-improvement — healing by bringing awareness, progress by intentional effort. Writing it down, clearly.",
  alternates: { canonical: "/" },
};

const jsonLd = jsonLdGraph([
  websiteEntity,
  organizationEntity,
  personEntity,
  profilePageEntity({
    url: siteUrl,
    name: "Rao Zaeem · Healing by Awareness, Progress by Intentional Effort",
    description:
      "My honest record of self-improvement — healing by bringing awareness, progress by intentional effort. Writing it down, clearly.",
  }),
]);

export default async function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      {/* ── Hero ── */}
      <section id="hero" aria-label="Hero" className="relative py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-16">
            <div className="order-last lg:order-first">
              <h1 className="font-heading max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl sm:leading-[1.08] lg:text-[3rem] lg:leading-[1.08] xl:text-[3.25rem]">
                Years Of Figuring Out The Art Of{" "}
                <span className="text-ochre">Self-Improvement</span>, Doing It
                Right And Writing It Down
              </h1>
              <p className="mt-6 max-w-2xl font-reading text-lg leading-relaxed text-ink-soft sm:text-xl">
                The Fundamentals That Were Skipped Unknowingly, Going Back To The Basics
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button asChild variant="primary" size="lg">
                  <ScrollLink targetId="blog">Read My Writings</ScrollLink>
                </Button>
                <Link
                  href="/lab"
                  className="inline-flex items-center gap-1.5 font-reading text-base font-medium text-muted transition-colors hover:text-ochre"
                >
                  Check out my portfolio
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
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border-default bg-transparent text-muted transition-colors hover:border-ochre hover:text-ochre [&_svg]:h-4 [&_svg]:w-4"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="hero-orbit relative order-first mx-auto aspect-square w-[min(88vw,24rem)] max-w-full lg:order-last lg:mx-0 lg:w-full">
              <svg
                className="orbit-svg"
                viewBox="0 0 100 100"
                aria-hidden="true"
                fill="none"
              >
                <circle
                  className="orbit-ring orbit-ring-1"
                  cx="50"
                  cy="50"
                  r="37"
                  strokeWidth="0.52"
                  strokeDasharray="1.5 3.2"
                />
                <circle
                  className="orbit-ring orbit-ring-2"
                  cx="51.5"
                  cy="49.5"
                  r="43"
                  strokeWidth="0.5"
                  strokeDasharray="1.7 3.4"
                />
                <circle
                  className="orbit-ring orbit-ring-3"
                  cx="50"
                  cy="50"
                  r="49"
                  strokeWidth="0.48"
                  strokeDasharray="1.9 3.6"
                />
                <circle className="orbit-dot" cx="78.1" cy="9.9" r="1.15" />
                <circle className="orbit-dot" cx="13" cy="15" r="0.95" />
                <circle className="orbit-dot" cx="94" cy="76" r="0.95" />
                <circle className="orbit-dot" cx="20" cy="90" r="0.95" />
                <path
                  className="orbit-plus"
                  d="M 88.7 16 H 91.3 M 90 14.7 V 17.3"
                  strokeWidth="0.5"
                />
                <path
                  className="orbit-plus"
                  d="M 4.7 78 H 7.3 M 6 76.7 V 79.3"
                  strokeWidth="0.5"
                />
                <path
                  className="orbit-plus"
                  d="M 84.7 86 H 87.3 M 86 84.7 V 87.3"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="orbit-blob" aria-hidden="true" />
              <Image
                src="/zaeem.webp"
                alt="Portrait of Rao Zaeem"
                width={600}
                height={750}
                className="orbit-portrait"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Healing By Bringing Awareness ── */}
      <section id="awareness" aria-label="Healing by bringing awareness" className="border-y border-border-default bg-bg-alt py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-3">
                My Philosophy
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Healing By <span className="text-ochre">Bringing Awareness</span>
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  The patterns that hurt me, kept me stuck, and stood like an obstacle in front of me were like some
                  inner monsters that I couldn't confront, mountains I didn't know I could climb. The unknown potential
                  that I never began to realize I had while I was doubting myself. All of it was invisible, hidden
                  from my eyes while I was busy living my life on autopilot.
                </p>
                <p>
                  At my core and by nature, I'm an analyzer; I've spent years analyzing and dissecting my emotions and
                  behavior, just in hopes of improving myself so I never have to deal with any of my flaws or shortcomings
                  ever again. Years of figuring out the art of self-improvement: getting it right, getting it wrong,
                  figuring it out one mistake at a time.
                </p>
                <p>
                  It all comes down to one thing: Awareness - bringing light to the patterns and beliefs that I never chose,
                  but that were choosing my days for me. This is the philosophy I write from. Awareness isn't the last step
                  of healing, but it is the first. Passing forward what I had to learn the hard way.
                </p>
              </div>
            </div>
            <FlipCard
              className="h-72 sm:h-80 lg:h-96 w-full max-w-md mx-auto lg:mx-0"
              front={
                <>
                  <span className="font-heading text-6xl text-ochre/30">&ldquo;</span>
                  <p className="font-reading text-lg italic leading-relaxed text-ink-soft">
                    Between stimulus and response there is a space. In that space is
                    our freedom and power to choose.
                  </p>
                  <span className="mt-4 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    Viktor Frankl
                  </span>
                </>
              }
              back={
                <>
                  <span className="font-heading text-5xl text-ochre/50 mb-2">*</span>
                  <p className="font-reading text-base leading-relaxed text-ink-soft">
                    You can&rsquo;t change what you won&rsquo;t look at.
                    Awareness is the first act of healing — not the last.
                  </p>
                </>
              }
            />
          </div>
        </Container>
      </section>

      {/* ── My Problem: Gifted Kid Syndrome ── */}
      <section id="problem" aria-label="My problem: Gifted Kid Syndrome" className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <FlipCard
              className="h-72 sm:h-80 lg:h-96 w-full max-w-md mx-auto lg:mx-0 order-2 lg:order-1"
              front={
                <>
                  <span className="font-heading text-6xl text-ochre/30">&ldquo;</span>
                  <p className="font-reading text-lg italic leading-relaxed text-ink-soft">
                    The price of being the smart one is never learning how to
                    be the hardworking one.
                  </p>
                  <span className="mt-4 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    The cost
                  </span>
                </>
              }
              back={
                <>
                  <span className="font-heading text-5xl text-ochre/50 mb-2">*</span>
                  <p className="font-reading text-base leading-relaxed text-ink-soft">
                    Talent is a head start, not a finish line. Without effort,
                    it becomes the thing you hide behind — and eventually, the
                    thing that hides you.
                  </p>
                </>
              }
            />
            <div className="order-1 lg:order-2">
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-3">
                The Root
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                <span className="text-ochre">Gifted Kid Syndrome</span>
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  Growing up, everything came easily to me. I've always been the smartest kid in the room, the one
                  teachers used as an example. I never had to study hard and still got away with the top results;
                  uh, that was the problem.
                </p>
                <p>
                  When talent is your identity, effort feels like a failure. I had a gift I took for granted, and
                  assumed life would stay easy. All I ever received were praises, and no teacher ever told me that
                  I was falling behind or that I needed to try harder; One thing I didn't know was that my gift was
                  going to expire one day.
                </p>
                <p>
                  Then real life started, and the hardest pill I had to swallow was that I wasn't as special as I'd
                  been told I was. No one cares how fast you can solve a math problem. I'd never learned how to work
                  hard, never built discipline, and the result is burnout, anxiety, and a quiet imposter syndrome that
                  whispers every time I hit a wall: <em>I’m not supposed to struggle. I’m supposed to be the smart one.</em>
                </p>
                <p>
                  That's the lie I'm unraveling. The root of every pattern I carry. Learning, the hard way, to humble myself.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Progress by Intentional Effort ── */}
      <section id="progress" aria-label="Progress by intentional effort" className="border-y border-border-default bg-bg-alt py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-3">
                The Shift
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Progress By <span className="text-ochre">Intentional Effort</span>
              </h2>
              <div className="mt-8 space-y-5 font-reading text-lg leading-relaxed text-ink-soft lg:text-xl">
                <p>
                  Once you're aware of the beliefs and patterns that kept you stuck, the next step is to take action intentionally.
                  That means taking control of your life by choosing your environment, choosing who and what you spend time with,
                  choosing what you consume and what you do. The kind of choices that actually make progress.
                </p>
                <p>
                  Most people already know what they need to do. They just can't do it, because the comfort of procrastinating is
                  easier than the work. This is the principle behind everything I'm doing now. The writing, the healing, the building
                  - none of it happens on autopilot. It happens because I stopped waiting to feel ready and started showing up,
                  one action at a time.
                </p>
                <p>
                  This isn't motivational-poster energy. It's the boring, unglamorous truth: you have to do the thing you're avoiding,
                  repeatedly. Decide what needs to be done. Then choose to do it. It'll always be hard, and there's no pill to make it easy.
                </p>
              </div>
            </div>
            <FlipCard
              className="h-72 sm:h-80 lg:h-96 w-full max-w-md mx-auto lg:mx-0"
              front={
                <>
                  <span className="font-heading text-6xl text-ochre/30">&ldquo;</span>
                  <p className="font-reading text-lg italic leading-relaxed text-ink-soft">
                    In 5 years, you are the average of the books you read, the food you eat, and the people you spend time with
                  </p>
                </>
              }
              back={
                <>
                  <span className="font-heading text-5xl text-ochre/50 mb-2">*</span>
                  <p className="font-reading text-base leading-relaxed text-ink-soft">
                    Discipline is a muscle, not a trait. You don&rsquo;t find it —
                    you build it, reps at a time, by choosing the hard thing
                    before it chooses you.
                  </p>
                </>
              }
            />
          </div>
        </Container>
      </section>

      {/* ── Lab ── */}
      {projects.length > 0 && (
        <section id="lab" aria-label="Lab" className="py-20 sm:py-28">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                What I&rsquo;m <span className="text-ochre">building</span>
              </h2>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Writings ── */}
      <WritingsSection withTopBorder />

      {/* ── Newsletter ── */}
      <NewsletterSection />
    </>
  );
}
