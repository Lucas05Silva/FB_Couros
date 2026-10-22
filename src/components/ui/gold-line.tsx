import { cn } from "@/lib/utils";

export function GoldLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-1 w-16 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent",
        className,
      )}
    />
  );
}
