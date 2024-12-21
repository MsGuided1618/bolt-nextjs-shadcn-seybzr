import { FounderResponse } from "@/types/api";
import { formatFounderResponse } from "@/lib/utils/response-formatter";
import { handleError } from "@/lib/utils/error-handling";

export async function handleApiResponse(response: Response): Promise<FounderResponse> {
  try {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    
    // Handle empty responses
    if (!responseText.trim()) {
      throw new Error("Empty response received");
    }

    // Try to parse as JSON first
    try {
      const parsedResponse = JSON.parse(responseText);
      return {
        id: crypto.randomUUID(),
        status: "success",
        response: {
          founder: parsedResponse.founder || "Unknown",
          content: formatFounderResponse(parsedResponse.content || responseText)
        }
      };
    } catch (parseError) {
      // If JSON parsing fails, treat as plain text
      return {
        id: crypto.randomUUID(),
        status: "success",
        response: {
          founder: "Unknown",
          content: formatFounderResponse(responseText)
        }
      };
    }
  } catch (error) {
    throw handleError(error);
  }
}