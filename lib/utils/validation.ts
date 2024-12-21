export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContent(content: string): boolean {
  return content.trim().length >= 10;
}

export function validateFounder(founder: string, availableFounders: string[]): boolean {
  return availableFounders.includes(founder);
}