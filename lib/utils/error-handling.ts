export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleError(error: unknown): Error {
  if (error instanceof APIError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new APIError(error.message);
  }
  
  return new APIError('An unexpected error occurred');
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && 
    (error.message.includes('network') || error.message.includes('Network'));
}