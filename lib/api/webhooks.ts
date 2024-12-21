// Separate webhook configuration
export const WEBHOOKS = {
  HAMILTON: "https://hook.us1.make.com/y3lfkrknkjao9bo1nbln4t5d6z4qd40z",
} as const;

export const FOUNDER_WEBHOOKS: Record<string, string> = {
  "Alexander Hamilton": WEBHOOKS.HAMILTON,
  // Add other founders' webhooks as they become available
};