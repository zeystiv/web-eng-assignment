import type * as React from "react";

import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Component = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Component className={cn("container-site", className)} {...props} />
  );
}
