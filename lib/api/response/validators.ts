import { ApiError } from '../errors';

export function validateResponseFormat(text: string, contentType: string): void {
  if (!text || !text.trim()) {
    throw new ApiError('Empty response received', 422, 'EMPTY_RESPONSE');
  }

  // More permissive content type validation
  if (!isValidContentType(contentType)) {
    console.warn(`Unexpected content type: ${contentType}, proceeding anyway`);
  }
}

export function validateJsonStructure(data: any): void {
  if (!data) {
    throw new ApiError('Invalid JSON structure', 422, 'INVALID_JSON');
  }

  // More flexible validation - accept either direct content or nested response
  const hasContent = Boolean(
    data.content || 
    data.response?.content || 
    (typeof data === 'string' && data.length > 0)
  );

  if (!hasContent) {
    throw new ApiError(
      'Missing required content',
      422,
      'MISSING_CONTENT'
    );
  }
}

function isValidContentType(contentType: string): boolean {
  const validTypes = [
    'application/json',
    'text/plain',
    'text/html',
    'text/markdown'
  ];

  return validTypes.some(type => 
    contentType.toLowerCase().includes(type.toLowerCase())
  );
}