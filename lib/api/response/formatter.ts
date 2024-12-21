import { ContentSection } from './types';

export function formatContent(content: string): string {
  const sections = extractSections(content);
  return formatSections(sections);
}

function extractSections(content: string): ContentSection[] {
  // Split on both markdown headers and colon-style headers
  const sectionDelimiters = /(?:##\s+[\w\s]+|^[A-Z][\w\s]+:)/m;
  
  if (!content.match(sectionDelimiters)) {
    return [{
      type: 'context',
      content: content.trim()
    }];
  }

  return content
    .split(sectionDelimiters)
    .filter(Boolean)
    .map(section => {
      const lines = section.split('\n');
      const firstLine = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();

      return {
        type: getSectionType(firstLine),
        content: content || firstLine // If no content, use the first line
      };
    });
}

function formatSections(sections: ContentSection[]): string {
  return sections
    .map(section => {
      const title = getSectionTitle(section.type);
      const content = formatSectionContent(section.content);
      return `## ${title}\n\n${content}`;
    })
    .join('\n\n');
}

function formatSectionContent(content: string): string {
  return content
    .replace(/\n{3,}/g, '\n\n')           // Normalize multiple newlines
    .replace(/^[•-]\s*/gm, '• ')          // Normalize list markers
    .replace(/^(\d+\.)\s*/gm, '$1 ')      // Normalize numbered lists
    .replace(/([.!?])\s+/g, '$1 ')        // Fix sentence spacing
    .trim();
}

function getSectionType(text: string): ContentSection['type'] {
  const normalizedText = text.toLowerCase().replace(/[:##\s]+/g, '');
  
  if (normalizedText.includes('historical') && normalizedText.includes('context')) return 'context';
  if (normalizedText.includes('recommend')) return 'recommendation';
  if (normalizedText.includes('reference') || normalizedText.includes('quote')) return 'quote';
  if (normalizedText.includes('action')) return 'action';
  return 'context';
}

function getSectionTitle(type: ContentSection['type']): string {
  switch (type) {
    case 'context': return 'Historical Context';
    case 'recommendation': return 'Recommendations';
    case 'quote': return 'Historical Reference';
    case 'action': return 'Action Steps';
    default: return 'Response';
  }
}