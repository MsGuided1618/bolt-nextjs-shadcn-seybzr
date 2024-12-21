import { TopicAnalysis } from "@/lib/topic-analyzer";

export interface QuestionSubmission {
  content: string;
  email: string;
  selectedFounder: string;
  analysis: TopicAnalysis;
}

export interface FounderResponse {
  id: string;
  status: "success" | "error";
  response: {
    founder: string;
    content: string;
  };
}

export interface Discussion {
  id: string;
  question: string;
  askedBy: string;
  answeredBy: string;
  date: string;
  excerpt: string;
}