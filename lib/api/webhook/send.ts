import { MAKE_WEBHOOK } from "@/lib/constants/webhooks";
import { WebhookPayload, WebhookResponse } from "./types";
import { ApiError } from "../errors";

export async function sendWebhookRequest(payload: WebhookPayload): Promise<Response> {
  try {
    const response = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        "WEBHOOK_ERROR"
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      "Failed to send webhook request",
      500,
      "WEBHOOK_ERROR"
    );
  }
}