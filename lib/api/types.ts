export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface FounderResponse {
  founder: string;
  content: string;
}

export interface QuestionPayload {
  content: string;
  email: string;
  selectedFounder: string;
  timestamp: string;
}

export interface Discussion {
  id: string;
  question: string;
  askedBy: string;
  answeredBy: string;
  date: string;
  excerpt: string;
}