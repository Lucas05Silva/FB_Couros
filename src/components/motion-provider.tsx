"use client";

import { MotionConfig } from "framer-motion";

// Honors prefers-reduced-motion: transform animations are skipped, fades stay.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
