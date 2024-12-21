export interface WebhookPayload {
  content: string;
  email: string;
  selectedFounder: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface WebhookResponse {
  success: boolean;
  founder: string;
  content: string;
  error?: string;
}