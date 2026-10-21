import Link from "next/link";

import type { ProjectListItem } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  const href = `/lab/${project.slug}`;

  return (
    <div className="group block rounded-lg border border-border-default bg-surface/50 p-6 transition-colors hover:bg-surface">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {project.tags.length > 0 && (
            <span className="mb-3 inline-flex items-center whitespace-nowrap rounded-full border border-accent-border bg-accent-soft-bg px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ochre">
              {project.tags[0]}
            </span>
          )}
          <h3 className="font-heading text-lg font-bold text-ink">
            {project.title}
          </h3>
          {project.summary && (
            <p className="mt-1.5 font-reading text-sm leading-relaxed text-ink-soft lg:line-clamp-3">
              {project.summary}
            </p>
          )}
          {project.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.links.map((link) => (
                <Link
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-solid px-4 py-2 text-xs font-semibold text-parchment transition-colors hover:bg-ochre-hover"
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
        {project.hasStudy !== false && (
          <Link
            href={href}
            aria-label={`Read the ${project.title} case study`}
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-default text-muted transition-colors hover:border-ochre hover:text-ochre"
          >
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
        )}
      </div>

      {project.stats.length > 0 && (
        <>
          <div className="my-4 h-px bg-border-default" />
          <div className="grid grid-cols-2 gap-4">
            {project.stats.slice(0, 2).map((stat) => (
              <div key={stat.label}>
                <div className="text-lg font-extrabold text-ink">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
