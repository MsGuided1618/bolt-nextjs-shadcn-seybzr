export function formatFounderResponse(response: string): string {
  // Add section headers if they don't exist
  if (!response.includes('## Historical Context')) {
    response = `## Historical Context\n\n${response}`;
  }
  
  // Clean up the response text
  const cleanedResponse = response
    .replace(/\s{3,}/g, '\n\n')  // Replace multiple spaces with double newline
    .replace(/\n{3,}/g, '\n\n')  // Replace multiple newlines with double newline
    .trim();

  // Ensure proper section formatting
  return cleanedResponse
    .split('\n')
    .map(line => {
      if (line.startsWith('##')) {
        return `\n${line}\n`;
      }
      return line;
    })
    .join('\n');
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/[<>]/g, '')  // Remove HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}