/** A language CodeMentor can run and analyze in Version 1. */
export type SupportedLanguage = "python" | "javascript";

/** Standard success envelope the backend responds with. */
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

/** Standard error envelope the backend responds with. */
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
