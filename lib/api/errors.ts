export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    // Ensure the error is properly serialized
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code
    };
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function handleApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error;
  }
  
  if (error instanceof Error) {
    return new ApiError(
      error.message,
      error.name === 'TypeError' ? 400 : 500
    );
  }
  
  return new ApiError('An unexpected error occurred', 500);
}