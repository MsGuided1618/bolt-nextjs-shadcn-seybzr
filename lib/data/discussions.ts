import type { Discussion } from '@/types/api';

// Initial discussions data
export const initialDiscussions: Discussion[] = [
  {
    id: "1",
    question: "What are your thoughts on the role of political parties?",
    askedBy: "Modern Citizen",
    answeredBy: "George Washington",
    date: "1789",
    excerpt: "The alternate domination of one faction over another, sharpened by the spirit of revenge, natural to party dissension..."
  },
  {
    id: "2",
    question: "How do you view the importance of education in a democracy?",
    askedBy: "Curious Scholar",
    answeredBy: "Thomas Jefferson",
    date: "1776",
    excerpt: "I think by far the most important bill in our whole code is that for the diffusion of knowledge among the people..."
  },
  {
    id: "3",
    question: "What advice do you have for maintaining unity among states?",
    askedBy: "Concerned Patriot",
    answeredBy: "Benjamin Franklin",
    date: "1787",
    excerpt: "We must, indeed, all hang together or, most assuredly, we shall all hang separately..."
  }
];