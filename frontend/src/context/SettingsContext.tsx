import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readStorage, writeStorage } from "../storage/localStorage";
import { STORAGE_KEYS } from "../storage/keys";
import { DEFAULT_SETTINGS, type Settings } from "../storage/settings";

interface SettingsContextValue {
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  resetSettings: () => void;
  /** The theme actually applied right now — resolves "system" to "dark" or "light". */
  resolvedTheme: "dark" | "light";
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

function loadInitialSettings(): Settings {
  const stored = readStorage<Partial<Settings>>(STORAGE_KEYS.settings, {});
  // Merge over defaults so a partial or older-shaped stored object (missing
  // a field a newer version added) never produces an undefined setting.
  return { ...DEFAULT_SETTINGS, ...stored };
}

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadInitialSettings);
  const [systemPrefersDark, setSystemPrefersDark] = useState(getSystemPrefersDark);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      writeStorage(STORAGE_KEYS.settings, next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    writeStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
  }, []);

  // Track the OS-level preference live, only relevant while theme === "system".
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setSystemPrefersDark(media.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme: "dark" | "light" =
    settings.theme === "system" ? (systemPrefersDark ? "dark" : "light") : settings.theme;

  // Apply the resolved theme to <html> so Tailwind's `dark:` variant (configured
  // against the .dark class, not the media query) picks it up everywhere at once.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({ settings, updateSettings, resetSettings, resolvedTheme }),
    [settings, updateSettings, resetSettings, resolvedTheme]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}
