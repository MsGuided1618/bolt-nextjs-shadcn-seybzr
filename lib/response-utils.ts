export interface Section {
  type: 'context' | 'recommendation' | 'quote' | 'action';
  content: string;
}

export function parseResponse(response: string): Section[] {
  // Split on markdown headers and colon-style headers
  const sections = response.split(/(?=##\s+[\w\s]+|^[A-Z][\w\s]+:)/m);
  
  return sections
    .filter(Boolean)
    .map(section => {
      const lines = section.trim().split('\n');
      const headerMatch = lines[0].match(/^(?:##\s+)?([\w\s]+)(?::)?/);
      const title = headerMatch ? headerMatch[1].trim() : '';
      const content = lines.slice(1).join('\n').trim();

      return {
        type: getSectionType(title),
        content: formatSectionContent(content || lines[0])
      };
    });
}

function getSectionType(title: string): Section['type'] {
  const normalized = title.toLowerCase();
  if (normalized.includes('historical') && normalized.includes('context')) return 'context';
  if (normalized.includes('recommend')) return 'recommendation';
  if (normalized.includes('reference') || normalized.includes('quote')) return 'quote';
  if (normalized.includes('action')) return 'action';
  return 'context';
}

function formatSectionContent(content: string): string {
  return content
    .replace(/\n{3,}/g, '\n\n')           // Normalize multiple newlines
    .replace(/^[•-]\s*/gm, '• ')          // Normalize list markers
    .replace(/^(\d+\.)\s*/gm, '$1 ')      // Normalize numbered lists
    .replace(/([.!?])\s+/g, '$1 ')        // Fix sentence spacing
    .replace(/\*\*(.*?)\*\*/g, '$1')      // Handle bold text
    .replace(/\*(.*?)\*/g, '$1')          // Handle italic text
    .replace(/`(.*?)`/g, '$1')            // Handle inline code
    .trim();
}

export function formatContent(content: string): string {
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#8B4513]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^•\s*(.*?)(?=\n|$)/gm, 
      '<li class="flex items-center gap-2 before:content-[\\"•\\"] before:text-[#8B4513] before:text-lg">$1</li>'
    )
    .replace(/<li>/g, '<ul class="space-y-2 my-4"><li>')
    .replace(/<\/li>\n/g, '</li></ul>')
    .replace(/>\s*(.*?)(?=\n|$)/gm, 
      '<blockquote class="border-l-4 border-[#8B4513]/30 pl-4 italic text-[#5C2E0E]">$1</blockquote>'
    );
}