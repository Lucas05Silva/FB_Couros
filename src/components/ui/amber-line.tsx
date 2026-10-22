import { cn } from "@/lib/utils";

/** v2 accent line (amber). Sections still on v1 use GoldLine. */
export function AmberLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-[3px] w-12 rounded-full bg-gradient-to-r from-amber to-amber-glow", className)}
    />
  );
}
