import { AmberLine } from "@/components/ui/amber-line";
import { AMBER_GRADIENT, AMBER_GRADIENT_ON_LIGHT, withHighlight } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  id?: string;
  highlight?: string;
  subtitle?: string;
  tone: "light" | "dark";
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  title,
  id,
  highlight,
  subtitle,
  tone,
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("relative flex flex-col gap-4", centered && "items-center text-center", className)}>
      {/* Ambient amber "spotlight" behind the title — dark sections only */}
      {dark && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-20 h-[300px] w-[340px] opacity-[0.07] md:w-[500px]",
            centered ? "left-1/2 -translate-x-1/2" : "-left-24",
          )}
          style={{ background: "radial-gradient(ellipse at center, #C8942A 0%, transparent 70%)" }}
        />
      )}

      <AmberLine className="relative" />
      <h2
        id={id}
        className={cn(
          "relative max-w-[800px] font-heading text-[28px] text-balance leading-[1.15] font-bold md:text-4xl lg:text-5xl lg:leading-[1.1]",
          dark ? "text-ivory" : "text-on-light",
        )}
      >
        {withHighlight(title, highlight, dark ? AMBER_GRADIENT : AMBER_GRADIENT_ON_LIGHT)}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "relative max-w-[600px] text-base leading-[1.7] lg:text-lg",
            dark ? "text-ivory-muted" : "text-on-light-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
