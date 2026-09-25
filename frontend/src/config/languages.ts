/**
 * Centralized language configuration for CodeMentor.
 *
 * This is the ONLY place language names, file extensions, Monaco editor
 * modes, execution status, and status messaging are defined. Every
 * component (language selector, status badges, editor, file upload,
 * action buttons, landing page, help page) reads from here rather than
 * hardcoding its own copy — so a status can never drift between screens.
 *
 * Language tiers follow the project's updated rules: C#, Go, PHP, Ruby,
 * Rust, and Kotlin are grouped under "Secure Remote Runner Required"
 * alongside C/C++/Java, rather than a separately-named "Coming Soon"
 * list. "Coming Soon" remains a valid status for any future language
 * added before its tier is decided, but none of the current 13 use it.
 */

/** Which execution tier a language is currently in. */
export type ExecutionStatus =
  | "browser-runner"
  | "local-analysis"
  | "secure-runner-required"
  | "coming-soon";

export interface StatusMeta {
  label: string;
  /** Short, neutral one-line description of what this tier means. */
  description: string;
}

/** Display metadata for each execution status, independent of any one language. */
export const STATUS_META: Record<ExecutionStatus, StatusMeta> = {
  "browser-runner": {
    label: "Browser Runner",
    description: "Runs directly in your browser.",
  },
  "local-analysis": {
    label: "Local Analysis",
    description: "Learning support without execution.",
  },
  "secure-runner-required": {
    label: "Secure Remote Runner Required",
    description: "Needs a secure isolated remote execution service before it can run.",
  },
  "coming-soon": {
    label: "Coming Soon",
    description: "Not yet an enabled language.",
  },
};

/**
 * Which badge tone represents each status. Centralized here, next to the
 * status definitions themselves, rather than left for each component that
 * renders a status badge to decide on its own.
 */
export const STATUS_BADGE_TONE: Record<ExecutionStatus, "cyan" | "blue" | "violet" | "neutral"> = {
  "browser-runner": "cyan",
  "local-analysis": "blue",
  "secure-runner-required": "violet",
  "coming-soon": "neutral",
};

export interface LanguageConfig {
  id: string;
  name: string;
  /** File extensions this language matches, each including the leading dot. */
  extensions: string[];
  /** The language id Monaco Editor expects for syntax highlighting. */
  monacoId: string;
  status: ExecutionStatus;
  /** Whether "Run Code" can be used for this language right now. */
  canRun: boolean;
  /** One-line description shown in the language selector. */
  description: string;
  /**
   * The honest banner shown in the Playground when this language is
   * selected and it can't run yet. Undefined only for languages that can
   * run (Python, JavaScript) — every non-runnable language must explain
   * why, never stay silent about it.
   */
  unsupportedMessage?: string;
}

const SECURE_RUNNER_MESSAGE =
  "This language requires a secure isolated remote execution service before CodeMentor can run it. You can still write and save your code, but Run Code is not yet available.";

export const LANGUAGES: LanguageConfig[] = [
  {
    id: "python",
    name: "Python",
    extensions: [".py"],
    monacoId: "python",
    status: "browser-runner",
    canRun: true,
    description: "Runs in your browser for small learning programs.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    extensions: [".js"],
    monacoId: "javascript",
    status: "browser-runner",
    canRun: true,
    description: "Runs in a browser worker for small learning programs.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    extensions: [".ts"],
    monacoId: "typescript",
    status: "local-analysis",
    canRun: false,
    description:
      "Syntax and learning support can be added locally. Execution requires transpilation to JavaScript.",
    unsupportedMessage:
      "TypeScript execution is not enabled yet. You can write code and use future local structural analysis, but browser execution will be added after safe transpilation is implemented.",
  },
  {
    id: "sql",
    name: "SQL",
    extensions: [".sql"],
    monacoId: "sql",
    status: "local-analysis",
    canRun: false,
    description:
      "Learning guidance is available later. Query execution requires a safe local database engine or remote sandbox.",
    unsupportedMessage:
      "SQL query execution is not enabled yet. CodeMentor will require a safe practice database engine before queries can run.",
  },
  {
    id: "c",
    name: "C",
    extensions: [".c", ".h"],
    monacoId: "c",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "cpp",
    name: "C++",
    extensions: [".cpp", ".cc", ".cxx", ".hpp", ".h"],
    monacoId: "cpp",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "java",
    name: "Java",
    extensions: [".java"],
    monacoId: "java",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler and runtime service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "csharp",
    name: "C#",
    extensions: [".cs"],
    monacoId: "csharp",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler and runtime service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "go",
    name: "Go",
    extensions: [".go"],
    monacoId: "go",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "php",
    name: "PHP",
    extensions: [".php"],
    monacoId: "php",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated runtime service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "ruby",
    name: "Ruby",
    extensions: [".rb"],
    monacoId: "ruby",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated runtime service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "rust",
    name: "Rust",
    extensions: [".rs"],
    monacoId: "rust",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
  {
    id: "kotlin",
    name: "Kotlin",
    extensions: [".kt"],
    monacoId: "kotlin",
    status: "secure-runner-required",
    canRun: false,
    description: "Execution requires a secure isolated compiler and runtime service.",
    unsupportedMessage: SECURE_RUNNER_MESSAGE,
  },
];

export const DEFAULT_LANGUAGE_ID = "python";

export function getLanguageById(id: string): LanguageConfig | undefined {
  return LANGUAGES.find((lang) => lang.id === id);
}

/**
 * Infers a language from a file extension (including the leading dot).
 * ".h" matches both C and C++ — this resolves to C, since it's listed
 * first; callers should let the learner override the guess either way.
 * Returns undefined for unrecognized extensions (including .txt, which
 * callers should handle by asking the learner or keeping their current
 * selection).
 */
export function getLanguageByExtension(extension: string): LanguageConfig | undefined {
  const normalized = extension.toLowerCase();
  return LANGUAGES.find((lang) => lang.extensions.includes(normalized));
}

/** All extensions across every language, plus ".txt", for the upload file picker's `accept` attribute. */
export const ALL_UPLOAD_EXTENSIONS: string[] = [
  ...new Set(LANGUAGES.flatMap((lang) => lang.extensions)),
  ".txt",
];
