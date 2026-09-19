import { rateLimit } from "express-rate-limit";

/**
 * General-purpose abuse protection for the whole /api surface.
 *
 * This is intentionally generic — it is not the AI fair-use quota
 * (AI_DAILY_LIMIT / AI_COOLDOWN_SECONDS) described in the project rules.
 * That is a separate, AI-specific limiter that gets added in the AI
 * integration phase, scoped only to the deep-analyze endpoint. This one
 * just stops any single client from hammering the API.
 */
export const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: "Too many requests. Please slow down and try again shortly.",
      code: "RATE_LIMITED",
    },
  },
});
