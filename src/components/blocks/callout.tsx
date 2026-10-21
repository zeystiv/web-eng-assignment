type Props = {
  variant?: string;
  title?: string;
  children?: React.ReactNode;
};

const palette: Record<string, string> = {
  info: "border-ochre/30 bg-ochre/8 text-ink-soft",
  tip: "border-ochre/20 bg-ochre/5 text-ink-soft",
  warning: "border-destructive/30 bg-destructive/8 text-ink-soft",
};

export function Callout({ variant = "info", title, children }: Props) {
  const tone = palette[variant] ?? palette.info;
  return (
    <aside className={`my-8 rounded-lg border px-6 py-5 ${tone}`} role="note">
      {title ? <p className="text-sm font-semibold tracking-tight">{title}</p> : null}
      <div className={`text-sm leading-relaxed ${title ? "mt-1" : ""}`}>{children}</div>
    </aside>
  );
}
