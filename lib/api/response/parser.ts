import { ApiResponse, FounderResponse } from '../types';
import { ApiError } from '../errors';
import { validateResponseFormat } from './validators';
import { parseJsonResponse } from './json-parser';
import { parseTextResponse } from './text-parser';

export async function parseApiResponse(response: Response): Promise<ApiResponse<FounderResponse>> {
  try {
    const text = await response.text();
    const contentType = response.headers.get('content-type') || 'text/plain';
    
    validateResponseFormat(text, contentType);

    let parsedResponse;
    try {
      // Try parsing as JSON first
      parsedResponse = parseJsonResponse(text);
    } catch (jsonError) {
      // Fallback to text parsing if JSON fails
      parsedResponse = parseTextResponse(text);
    }

    return {
      success: true,
      data: {
        founder: parsedResponse.founder,
        content: parsedResponse.content
      }
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to parse response',
      500,
      'PARSE_ERROR'
    );
  }
}