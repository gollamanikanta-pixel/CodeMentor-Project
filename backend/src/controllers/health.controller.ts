import type { Request, Response } from "express";
import { getHealthStatus } from "../services/health.service.js";
import type { ApiSuccess, HealthStatus } from "../types/index.js";

export function getHealth(_req: Request, res: Response<ApiSuccess<HealthStatus>>): void {
  res.status(200).json({
    success: true,
    data: getHealthStatus(),
  });
}
