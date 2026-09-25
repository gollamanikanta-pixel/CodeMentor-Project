import { ALL_UPLOAD_EXTENSIONS, getLanguageByExtension } from "./languages";

export const MAX_UPLOAD_SIZE_BYTES = 50 * 1024; // 50 KB, per the project's stated label
export const MAX_UPLOAD_SIZE_LABEL = "50 KB";

export type UploadRejectionReason = "empty" | "too-large" | "unsupported-extension";

export interface UploadValidationResult {
  ok: boolean;
  reason?: UploadRejectionReason;
  message?: string;
  /** The file extension, including its leading dot, lowercased. */
  extension: string;
  /** The language CodeMentor could infer from the extension, if any. ".txt" and unknown extensions resolve to undefined. */
  inferredLanguageId?: string;
}

function getExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex === -1 ? "" : filename.slice(dotIndex).toLowerCase();
}

/**
 * Validates a file against CodeMentor's upload rules without reading its
 * contents or touching the network — pure metadata checks only, so the
 * caller can show a friendly message before ever opening the file.
 */
export function validateUpload(file: File): UploadValidationResult {
  const extension = getExtension(file.name);

  if (!ALL_UPLOAD_EXTENSIONS.includes(extension)) {
    return {
      ok: false,
      reason: "unsupported-extension",
      message: `"${extension || file.name}" isn't a supported file type. Try one of: ${ALL_UPLOAD_EXTENSIONS.join(", ")}.`,
      extension,
    };
  }

  if (file.size === 0) {
    return {
      ok: false,
      reason: "empty",
      message: "That file is empty — there's nothing to load.",
      extension,
    };
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return {
      ok: false,
      reason: "too-large",
      message: `That file is larger than the ${MAX_UPLOAD_SIZE_LABEL} limit for learning programs.`,
      extension,
    };
  }

  const inferredLanguageId = extension === ".txt" ? undefined : getLanguageByExtension(extension)?.id;

  return { ok: true, extension, inferredLanguageId };
}
