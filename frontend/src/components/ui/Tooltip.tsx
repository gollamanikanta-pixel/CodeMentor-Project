import { useId, useState, type ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
  /** Where the tooltip renders relative to the trigger. Defaults to top. */
  side?: "top" | "bottom";
}

/**
 * Wraps a single focusable child (a button, typically) and shows `label`
 * on hover AND on keyboard focus — a tooltip that only responds to mouse
 * hover is invisible to keyboard users, which defeats the point of using
 * one to explain an unfamiliar control.
 */
export function Tooltip({ label, children, side = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  const positionClasses =
    side === "top" ? "bottom-full left-1/2 mb-2 -translate-x-1/2" : "top-full left-1/2 mt-2 -translate-x-1/2";

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible && (
        <span
          role="tooltip"
          id={id}
          className={`pointer-events-none absolute z-40 whitespace-nowrap rounded-md border border-border bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-text shadow-lg ${positionClasses}`}
        >
          {label}
        </span>
      )}
    </span>
  );
}
