import { ParsedResponse } from './types';
import { validateJsonStructure } from './validators';
import { formatContent } from './formatter';

export function parseJsonResponse(text: string): ParsedResponse {
  const data = JSON.parse(text);
  validateJsonStructure(data);

  const content = data.content || data.response?.content;
  const founder = data.founder || data.response?.founder || 'Unknown';

  return {
    founder,
    content: formatContent(content),
    format: 'json'
  };
}