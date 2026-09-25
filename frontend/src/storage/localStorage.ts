/**
 * Safe localStorage access. Every read tolerates missing keys, corrupted
 * JSON, and localStorage being unavailable entirely (private browsing,
 * storage quota, SSR) by falling back to the caller-supplied default
 * rather than throwing.
 */

const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;

  let raw: string | null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return fallback;
  }

  if (raw === null) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    // Corrupted value for this key — do not let it break the app, and
    // don't leave the bad value sitting there for next time either.
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore — best effort only
    }
    return fallback;
  }
}

/** Returns true if the write succeeded, false if storage was unavailable or full. */
export function writeStorage<T>(key: string, value: T): boolean {
  if (!isBrowser) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key: string): void {
  if (!isBrowser) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore — best effort only
  }
}

/** Removes every key CodeMentor has ever written, for the Settings "Clear local data" action. */
export function clearAllCodeMentorStorage(): void {
  if (!isBrowser) return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i);
      if (key?.startsWith("codementor:")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // ignore — best effort only
  }
}
