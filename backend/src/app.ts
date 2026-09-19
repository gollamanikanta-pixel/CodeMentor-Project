import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { apiRouter } from "./routes/index.js";

export function createApp(): Application {
  const app = express();

  // Security headers first, before anything touches the request.
  app.use(helmet());

  // Only the configured frontend origin may call this API.
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
    })
  );

  app.use(express.json({ limit: "1mb" }));

  // General abuse protection for every /api route.
  app.use("/api", apiLimiter);

  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
