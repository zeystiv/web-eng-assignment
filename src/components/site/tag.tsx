import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border border-border-default bg-transparent px-2.5 py-0.5 font-sans text-[11px] font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
