import { Settings2 } from "lucide-react";

const PLANNED_SETTINGS = [
  {
    label: "Explanation level",
    detail: "How much detail line-by-line explanations go into.",
  },
  {
    label: "Hint level",
    detail: "How direct a hint gets before you have to work it out yourself.",
  },
  {
    label: "Explanation language",
    detail: "The human language hints and explanations are written in.",
  },
  {
    label: "AI usage today",
    detail: "How many of your daily AI Deep Help requests you've used, and when they reset.",
  },
];

export function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <Settings2 className="mx-auto h-8 w-8 text-ink-faint" aria-hidden="true" />
        <h1 className="mt-4 font-display text-2xl font-medium text-ink">Settings</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Nothing here is configurable yet — this phase is the project's foundation. Here's what
          moves into this page next:
        </p>
      </div>
      <dl className="mt-10 divide-y divide-line border-y border-line">
        {PLANNED_SETTINGS.map((setting) => (
          <div key={setting.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
            <dt className="w-48 shrink-0 font-medium text-ink">{setting.label}</dt>
            <dd className="text-sm text-ink-soft">{setting.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
