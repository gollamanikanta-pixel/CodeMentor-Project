/**
 * Every localStorage key CodeMentor uses, versioned so a future breaking
 * change to a stored shape can move to `v2` without corrupting old data.
 * Nothing in this file, or anything stored under these keys, should ever
 * hold a secret — the AI API key lives only in the backend's environment.
 */
export const STORAGE_KEYS = {
  settings: "codementor:v1:settings",
  draft: "codementor:v1:draft",
  projects: "codementor:v1:projects",
  quizHistory: "codementor:v1:quiz-history",
  latestLocalAnalysis: "codementor:v1:latest-local-analysis",
  latestDeepAnalysis: "codementor:v1:latest-deep-analysis",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
