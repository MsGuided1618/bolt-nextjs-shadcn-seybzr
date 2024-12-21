import { ApiResponse, FounderResponse } from "./types";
import { WebhookPayload } from "./webhook/types";
import { sendWebhookRequest } from "./webhook/send";
import { parseApiResponse } from "./response/parser";
import { ApiError, handleApiError } from "./errors";
import { SUPPORTED_FOUNDERS } from "@/lib/constants/webhooks";

export async function submitQuestion(
  content: string,
  email: string,
  selectedFounder: string
): Promise<ApiResponse<FounderResponse>> {
  try {
    // Validate founder selection
    if (!SUPPORTED_FOUNDERS.includes(selectedFounder)) {
      throw new ApiError(
        `Invalid founder selected: ${selectedFounder}`,
        400,
        "INVALID_FOUNDER"
      );
    }

    // Prepare webhook payload
    const payload: WebhookPayload = {
      content: content.trim(),
      email: email.trim(),
      selectedFounder,
      timestamp: new Date().toISOString(),
      metadata: {
        source: "founding-fathers-app",
        version: "1.0.0"
      }
    };

    // Send request to webhook
    const response = await sendWebhookRequest(payload);
    
    // Parse and validate response
    return await parseApiResponse(response);
  } catch (error) {
    const apiError = handleApiError(error);
    console.error("Error submitting question:", apiError);
    
    return {
      success: false,
      error: apiError.message
    };
  }
}