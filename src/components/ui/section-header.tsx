import { AmberLine } from "@/components/ui/amber-line";
import { AMBER_GRADIENT, AMBER_GRADIENT_ON_LIGHT, withHighlight } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  id?: string;
  highlight?: string;
  subtitle?: string;
  tone: "light" | "dark";
  /** "responsive" = centered on mobile, left-aligned from md (split layouts) */
  align?: "center" | "left" | "responsive";
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
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "responsive" && "items-center text-center md:items-start md:text-left",
        className,
      )}
    >
      {/* Ambient amber "spotlight" behind the title — dark sections only */}
      {dark && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-20 h-[300px] w-[340px] opacity-[0.07] md:w-[500px]",
            align === "center" && "left-1/2 -translate-x-1/2",
            align === "left" && "-left-24",
            align === "responsive" && "left-1/2 -translate-x-1/2 md:-left-24 md:translate-x-0",
          )}
          style={{ background: "radial-gradient(ellipse at center, #C8942A 0%, transparent 70%)" }}
        />
      )}

      <AmberLine className="relative" />
      <h2
        id={id}
        className={cn(
          "relative max-w-[820px] font-heading text-[26px] leading-[1.12] font-bold tracking-[0.01em] text-balance md:text-4xl md:leading-[1.1] md:tracking-normal lg:text-[52px] lg:leading-[1.08]",
          dark ? "text-ivory" : "text-on-light",
        )}
      >
        {withHighlight(title, highlight, dark ? AMBER_GRADIENT : AMBER_GRADIENT_ON_LIGHT)}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "relative max-w-[600px] text-[15px] leading-[1.7] md:text-base lg:text-lg",
            dark ? "text-ivory-muted" : "text-on-light-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
