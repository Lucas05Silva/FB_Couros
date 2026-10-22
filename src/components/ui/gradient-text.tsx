import { cn } from "@/lib/utils";

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** v2 amber ramps: bright on dark sections, deeper on light ones (amber → glow is too pale on cream). */
export const AMBER_GRADIENT = "from-amber to-amber-glow";
export const AMBER_GRADIENT_ON_LIGHT = "from-amber-deep to-amber";

/** Splits `text` and wraps every occurrence of `highlight` in GradientText. */
export function withHighlight(text: string, highlight?: string, className?: string) {
  if (!highlight) return text;
  return text.split(highlight).flatMap((part, i) =>
    i === 0 ? [part] : [<GradientText key={i} className={className}>{highlight}</GradientText>, part],
  );
}
