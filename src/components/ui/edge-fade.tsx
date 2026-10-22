import { cn } from "@/lib/utils";

/**
 * Gradient band on the top or bottom edge of a light section so dark ↔ light never cuts
 * abruptly. Pass the two colors via className, e.g. "from-deep to-light".
 */
export function EdgeFade({ edge, className }: { edge: "top" | "bottom"; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b lg:h-[100px]",
        edge === "top" ? "top-0" : "bottom-0",
        className,
      )}
    />
  );
}
