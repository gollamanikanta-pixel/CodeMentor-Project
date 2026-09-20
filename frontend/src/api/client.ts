import type { ApiResponse, HealthStatus } from "../types";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

class ApiClientError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "ApiClientError";
    this.code = code;
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiClientError(
      "Could not reach the CodeMentor backend. Is it running?",
      "NETWORK_ERROR"
    );
  }

  const body = (await response.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new ApiClientError(body.error.message, body.error.code);
  }

  return body.data;
}

/** Calls GET /api/health. Throws ApiClientError if the backend is unreachable or returns an error. */
export function getHealth(): Promise<HealthStatus> {
  return request<HealthStatus>("/api/health");
}

export { ApiClientError };
