import type { NextFunction, Request, Response } from "express";
import { env } from "../config/env.js";
import type { ApiError } from "../types/index.js";

/** Catches requests to unknown API routes and responds with a clean 404. */
export function notFoundHandler(req: Request, res: Response<ApiError>): void {
  res.status(404).json({
    success: false,
    error: {
      message: `No route matches ${req.method} ${req.originalUrl}`,
      code: "NOT_FOUND",
    },
  });
}

/**
 * Final error-handling middleware. Express recognises this as an error
 * handler because it takes four arguments — keep that signature even
 * though `next` is unused, or Express will treat it as a normal
 * middleware and skip it on errors.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiError>,
  _next: NextFunction
): void {
  const message = err instanceof Error ? err.message : "Unexpected server error";

  if (env.NODE_ENV !== "test") {
    console.error("[error]", err);
  }

  res.status(500).json({
    success: false,
    error: {
      message: env.NODE_ENV === "production" ? "Something went wrong." : message,
      code: "INTERNAL_ERROR",
    },
  });
}
