export class ApiError extends Error {
  code:
    | "RateLimitExceeded"
    | "HttpError"
    | "ServerError"
    | "MaxRetriesExceeded";
  retryAfterMs?: number;

  constructor(code: ApiError["code"], message: string, retryAfterMs?: number) {
    super(message);
    this.code = code;
    this.retryAfterMs = retryAfterMs;
  }

  static RateLimitExceeded(retryAfterMs: number) {
    return new ApiError("RateLimitExceeded", "Too many requests", retryAfterMs);
  }

  static ServerError() {
    return new ApiError("ServerError", "Server error (500/503)");
  }

  static HttpError(status: number) {
    return new ApiError("HttpError", `HTTP error: ${status}`);
  }

  static MaxRetriesExceeded() {
    return new ApiError("MaxRetriesExceeded", "Max retries exceeded");
  }
}
