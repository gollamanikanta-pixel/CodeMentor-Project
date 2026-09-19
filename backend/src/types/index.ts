/** Standard success envelope every CodeMentor API route responds with. */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

/** Standard error envelope every CodeMentor API route responds with. */
export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** Shape returned by GET /api/health. */
export interface HealthStatus {
  status: "ok";
  uptimeSeconds: number;
  timestamp: string;
  environment: string;
  aiConfigured: boolean;
}
