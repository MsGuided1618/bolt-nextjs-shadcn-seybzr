// Webhook configuration
export const WEBHOOKS = {
  HAMILTON: "https://hook.us1.make.com/y3lfkrknkjao9bo1nbln4t5d6z4qd40z",
  // Add other webhooks as they become available
} as const;

// Map of founders to their webhook URLs
export const FOUNDER_WEBHOOKS: Record<string, string> = {
  "Alexander Hamilton": WEBHOOKS.HAMILTON,
  // Temporary fallback for testing - remove in production
  "Benjamin Franklin": WEBHOOKS.HAMILTON,
  "James Madison": WEBHOOKS.HAMILTON,
  "John Jay": WEBHOOKS.HAMILTON,
  "Andrew Jackson": WEBHOOKS.HAMILTON,
} as const;