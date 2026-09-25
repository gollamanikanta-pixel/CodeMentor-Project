import { DEFAULT_LANGUAGE_ID } from "../config/languages";

export type ThemePreference = "dark" | "light" | "system";
export type ExplanationLevel = "beginner" | "intermediate" | "advanced";
export type HintLevel = "gentle" | "guided" | "learning";

export interface Settings {
  theme: ThemePreference;
  explanationLevel: ExplanationLevel;
  hintLevel: HintLevel;
  defaultLanguageId: string;
  editorFontSize: number;
  wordWrap: boolean;
  autosave: boolean;
  autoVisualGeneration: boolean;
  autoQuizReadiness: boolean;
  aiDeepHelpEnabled: boolean;
}

/** Dark is CodeMentor's default appearance; "system" is an option, not the starting point. */
export const DEFAULT_SETTINGS: Settings = {
  theme: "dark",
  explanationLevel: "beginner",
  hintLevel: "guided",
  defaultLanguageId: DEFAULT_LANGUAGE_ID,
  editorFontSize: 14,
  wordWrap: true,
  autosave: true,
  autoVisualGeneration: true,
  autoQuizReadiness: true,
  aiDeepHelpEnabled: true,
};

export const EDITOR_FONT_SIZE_MIN = 12;
export const EDITOR_FONT_SIZE_MAX = 22;
