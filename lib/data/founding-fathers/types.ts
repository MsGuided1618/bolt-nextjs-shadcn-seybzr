export interface FoundingFather {
  id: string;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  beliefs: string[];
  description: string;
}

export type FounderName = 
  | "Alexander Hamilton"
  | "Benjamin Franklin"
  | "James Madison"
  | "John Jay"
  | "Andrew Jackson";