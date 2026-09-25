import { Laptop, Moon, Sun } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { Tooltip } from "./Tooltip";
import type { ThemePreference } from "../../storage/settings";

const ORDER: ThemePreference[] = ["dark", "light", "system"];

const ICONS: Record<ThemePreference, typeof Sun> = {
  dark: Moon,
  light: Sun,
  system: Laptop,
};

const LABELS: Record<ThemePreference, string> = {
  dark: "Dark theme — click for light",
  light: "Light theme — click to follow system",
  system: "Following system theme — click for dark",
};

export function ThemeToggle() {
  const { settings, updateSettings } = useSettings();
  const Icon = ICONS[settings.theme];

  function cycleTheme() {
    const currentIndex = ORDER.indexOf(settings.theme);
    const next = ORDER[(currentIndex + 1) % ORDER.length];
    updateSettings({ theme: next });
  }

  return (
    <Tooltip label={LABELS[settings.theme]}>
      <button
        type="button"
        onClick={cycleTheme}
        className="rounded-lg border border-border bg-surface p-2 text-text-soft transition-colors hover:text-text"
        aria-label={LABELS[settings.theme]}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </button>
    </Tooltip>
  );
}
