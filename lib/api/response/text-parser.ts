import { ParsedResponse } from './types';
import { formatContent } from './formatter';

export function parseTextResponse(text: string): ParsedResponse {
  // Clean up the text and ensure it's properly formatted
  const cleanedText = cleanAndFormatText(text);

  return {
    founder: 'Unknown',
    content: cleanedText,
    format: 'text'
  };
}

function cleanAndFormatText(text: string): string {
  // Remove any potential HTML tags
  let cleanText = text.replace(/<[^>]*>/g, '');
  
  // Normalize whitespace
  cleanText = cleanText.replace(/\s+/g, ' ').trim();

  // If the text doesn't have sections, add them
  if (!hasAnySections(cleanText)) {
    cleanText = `## Historical Context\n\n${cleanText}`;
  }

  return cleanText;
}

function hasAnySections(text: string): boolean {
  const sectionPatterns = [
    /##\s+[\w\s]+/,          // Markdown style
    /^[A-Z][\w\s]+:/m,       // Title with colon
    /Historical Context/i,    // Common sections
    /Recommendations?/i,
    /Historical Reference/i,
    /Action Steps?/i
  ];

  return sectionPatterns.some(pattern => pattern.test(text));
}