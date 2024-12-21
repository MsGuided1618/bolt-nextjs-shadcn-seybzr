import { FounderResponse, QuestionSubmission, Discussion } from "@/types/api";
import { truncateText } from "./formatting";

export function createNewDiscussion(
  response: FounderResponse, 
  submission: QuestionSubmission
): Discussion {
  return {
    id: response.id,
    question: truncateText(submission.content, 150),
    askedBy: submission.email.split("@")[0],
    answeredBy: response.response.founder,
    date: new Date().getFullYear().toString(),
    excerpt: truncateText(response.response.content, 200),
  };
}