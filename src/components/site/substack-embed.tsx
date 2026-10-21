import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const { width, height, publication, embedUrl } = site.newsletter;

/**
 * Substack's official signup embed, bare variant: transparent background, no
 * logo or publication name (Substack hides those at this iframe height). That
 * leaves just the email field, the Subscribe button and the terms line, so the
 * surrounding section supplies the framing and the page background shows
 * through. Rendered on the server, so it costs zero client JavaScript.
 *
 * No border or background here on purpose — `transparent=1` makes both
 * pointless. Dimensions come from config via inline styles rather than Tailwind
 * arbitrary values, which the JIT scanner can't see when built from a variable.
 */
export function SubstackEmbed({
  loading = "lazy",
  className,
}: {
  loading?: "lazy" | "eager";
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full", className)} style={{ maxWidth: width }}>
      <iframe
        src={embedUrl}
        title={`Subscribe to ${publication} on Substack`}
        width={width}
        height={height}
        loading={loading}
        scrolling="no"
        style={{ height }}
        className="block w-full"
      />
    </div>
  );
}
