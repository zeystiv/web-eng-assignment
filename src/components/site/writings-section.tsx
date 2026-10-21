import { Container } from "@/components/site/container";
import { WritingsExplorer } from "@/components/site/writings-explorer";
import { listWritings } from "@/lib/data/writings";
import { cn } from "@/lib/utils";

export async function WritingsSection({
  withTopBorder = false,
}: {
  withTopBorder?: boolean;
}) {
  const feedItems = await listWritings();

  return (
    <section
      id="blog"
      aria-label="Writings"
      className={cn(
        "bg-bg-alt py-20 sm:py-28",
        withTopBorder && "border-t border-border-default",
      )}
    >
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Writings
          </h2>
        </div>
        <div className="mt-8">
          <WritingsExplorer items={feedItems} />
        </div>
      </Container>
    </section>
  );
}