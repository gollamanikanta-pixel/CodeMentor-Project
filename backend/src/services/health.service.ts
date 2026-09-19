import { env, isAiConfigured } from "../config/env.js";
import type { HealthStatus } from "../types/index.js";

/**
 * Builds the current health snapshot for the API.
 *
 * Kept as its own service (rather than inlined in the controller) so the
 * same layering pattern — route -> controller -> service — is in place
 * before later phases add real services (runner, analyzer, AI proxy).
 */
export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    aiConfigured: isAiConfigured,
  };
}
