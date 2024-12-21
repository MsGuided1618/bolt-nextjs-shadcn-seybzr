export interface ParsedResponse {
  founder: string;
  content: string;
  format: 'json' | 'text';
}

export interface ContentSection {
  type: 'context' | 'recommendation' | 'quote' | 'action';
  content: string;
}