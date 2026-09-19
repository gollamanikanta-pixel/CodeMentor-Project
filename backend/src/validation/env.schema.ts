import { z } from "zod";

/**
 * Validates every environment variable the backend depends on.
 *
 * This is the single source of truth for what a valid CodeMentor backend
 * configuration looks like. `src/config/env.ts` parses `process.env`
 * against this schema once, at startup, and the rest of the app imports
 * the typed, already-validated result instead of touching `process.env`
 * directly.
 *
 * PHASE 1 NOTE: the AI_* variables are accepted here (so the schema
 * matches the full `.env.example`) but nothing in this phase reads
 * AI_API_KEY or calls the AI provider. That arrives in a later phase.
 */
export const envSchema = z.object({
  // --- Core server ---
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  CLIENT_ORIGIN: z.url().default("http://localhost:5173"),

  // --- AI provider (backend-only; unused until the AI integration phase) ---
  AI_API_BASE_URL: z.string().optional().default(""),
  AI_API_KEY: z.string().optional().default(""),
  AI_MODEL: z.string().optional().default(""),
  AI_API_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),

  // --- AI fair-use / low-cost policy (unused until the AI integration phase) ---
  AI_DAILY_LIMIT: z.coerce.number().int().nonnegative().default(3),
  AI_COOLDOWN_SECONDS: z.coerce.number().int().nonnegative().default(30),
  AI_CACHE_TTL_SECONDS: z.coerce.number().int().nonnegative().default(86400),
  AI_MAX_SOURCE_CHARS: z.coerce.number().int().positive().default(12000),
  AI_MAX_CONTEXT_LINES: z.coerce.number().int().positive().default(80),

  // --- Local code execution limits (unused until the runner phase) ---
  RUN_TIMEOUT_MS: z.coerce.number().int().positive().default(3000),
  MAX_CODE_SIZE_BYTES: z.coerce.number().int().positive().default(51200),
  MAX_STDIN_SIZE_BYTES: z.coerce.number().int().positive().default(10240),
});

export type Env = z.infer<typeof envSchema>;
