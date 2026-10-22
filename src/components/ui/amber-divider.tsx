import { cn } from "@/lib/utils";

/** Hairline amber gradient that fades out at both ends — separates two dark sections. */
export function AmberDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent",
        className,
      )}
    />
  );
}
