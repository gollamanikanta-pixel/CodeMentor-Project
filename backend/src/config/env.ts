import "dotenv/config";
import { envSchema } from "../validation/env.schema.js";

/**
 * Parses and validates process.env once, at import time.
 *
 * Failing fast here (instead of letting a bad env var surface later as a
 * confusing runtime bug) is the whole point of routing every variable
 * through `envSchema` before anything else in the app starts.
 */
function loadEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment configuration:");
    for (const issue of parsed.error.issues) {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
    }
    console.error(
      "\nCheck your backend/.env file against backend/.env.example and fix the values above."
    );
    process.exit(1);
  }

  return parsed.data;
}

export const env = loadEnv();

/** True once a real AI provider is configured. Always false in Phase 1. */
export const isAiConfigured = Boolean(env.AI_API_BASE_URL && env.AI_API_KEY && env.AI_MODEL);
