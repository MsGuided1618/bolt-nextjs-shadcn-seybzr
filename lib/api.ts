import { TopicAnalysis } from './topic-analyzer';

interface QuestionSubmission {
  content: string;
  email: string;
  selectedFounder: string;
  analysis: TopicAnalysis;
}

interface FounderResponse {
  id: string;
  status: 'success' | 'error';
  response: {
    founder: string;
    content: string;
  };
}

// Hamilton's webhook URL
const HAMILTON_WEBHOOK = 'https://hook.us1.make.com/y3lfkrknkjao9bo1nbln4t5d6z4qd40z';

// Map of founders to their webhook URLs
const FOUNDER_WEBHOOKS: Record<string, string> = {
  'Alexander Hamilton': HAMILTON_WEBHOOK,
  // Add other founders' webhooks as they become available
};

export async function submitQuestion(data: QuestionSubmission): Promise<FounderResponse> {
  try {
    const founder = data.selectedFounder || data.analysis.relevantFounders[0];
    const webhookUrl = FOUNDER_WEBHOOKS[founder];

    if (!webhookUrl) {
      throw new Error(`No webhook configured for ${founder}`);
    }
    
    const payload = {
      content: data.content,
      email: data.email,
      selectedFounder: founder,
      topics: data.analysis.topics,
      era: data.analysis.era,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    let responseData;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      // Handle non-JSON responses gracefully
      responseData = {
        content: responseText,
        founder: founder
      };
    }

    // Format the response for consistent structure
    const formattedResponse = {
      id: Math.random().toString(36).substr(2, 9),
      status: 'success' as const,
      response: {
        founder: founder,
        content: formatFounderResponse(responseData?.content || responseText),
      },
    };

    // Create and dispatch new discussion event
    const newDiscussion = {
      id: formattedResponse.id,
      question: data.content.substring(0, 150) + (data.content.length > 150 ? '...' : ''),
      askedBy: data.email.split('@')[0],
      answeredBy: founder,
      date: new Date().getFullYear().toString(),
      excerpt: formattedResponse.response.content.substring(0, 200) + '...',
    };

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('newDiscussion', { detail: newDiscussion }));
    }

    return formattedResponse;
  } catch (error) {
    console.error('Error submitting question:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'An error occurred while submitting your question'
    );
  }
}

function formatFounderResponse(response: string): string {
  // Add section headers if they don't exist
  if (!response.includes('## Historical Context')) {
    response = `## Historical Context\n\n${response}`;
  }
  
  // Ensure proper formatting for the response display component
  return response
    .replace(/\n/g, '\n\n')
    .replace(/\*\*/g, '**')
    .replace(/- /g, '\n- ')
    .replace(/>/g, '\n> ');
}