import { Router } from "express";
import { healthRouter } from "./health.routes.js";

/**
 * Root API router. Every route the backend exposes is mounted here and
 * this single router is mounted once, at "/api", in app.ts.
 *
 * Later phases add more routers here (e.g. a deep-analyze router) instead
 * of mounting new paths directly on the Express app.
 */
export const apiRouter = Router();

apiRouter.use(healthRouter);
