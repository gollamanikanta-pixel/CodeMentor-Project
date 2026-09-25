import type { ReactNode } from "react";

export type BadgeTone = "accent" | "blue" | "violet" | "cyan" | "success" | "error" | "warning" | "neutral";

const TONE_CLASSES: Record<BadgeTone, string> = {
  accent: "bg-accent-soft text-accent border-accent/25",
  blue: "bg-blue-soft text-blue border-blue/25",
  violet: "bg-violet-soft text-violet border-violet/25",
  cyan: "bg-cyan-soft text-cyan border-cyan/25",
  success: "bg-success-soft text-success border-success/25",
  error: "bg-error-soft text-error border-error/25",
  warning: "bg-warning-soft text-warning border-warning/25",
  neutral: "bg-surface-raised text-text-soft border-border",
};

export function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
