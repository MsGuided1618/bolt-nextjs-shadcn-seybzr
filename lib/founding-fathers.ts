export interface FoundingFather {
  id: string;
  name: string;
  role: string;
  image: string;
  expertise: string[];
  beliefs: string[];
  description: string;
}

export const foundingFathers: FoundingFather[] = [
  {
    id: "hamilton",
    name: "Alexander Hamilton",
    role: "First Secretary of the Treasury",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Alexander_Hamilton_portrait_by_John_Trumbull_1806.jpg",
    expertise: ["finance", "federalism", "military", "law", "commerce"],
    beliefs: ["strong central government", "industrial economy", "federal banking"],
    description: "Architect of America's financial system and advocate for strong federal government."
  },
  {
    id: "franklin",
    name: "Benjamin Franklin",
    role: "Diplomat & Polymath",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Joseph_Siffred_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg",
    expertise: ["diplomacy", "science", "education", "commerce", "innovation"],
    beliefs: ["practical wisdom", "civic virtue", "self-improvement"],
    description: "Scientist, diplomat, and author known for his wit and wisdom."
  },
  {
    id: "madison",
    name: "James Madison",
    role: "Father of the Constitution",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/James_Madison.jpg",
    expertise: ["constitutional law", "political theory", "republicanism"],
    beliefs: ["checks and balances", "religious freedom", "federalism"],
    description: "Primary architect of the Constitution and champion of the Bill of Rights."
  },
  {
    id: "jay",
    name: "John Jay",
    role: "First Chief Justice",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/John_Jay_%28Gilbert_Stuart_portrait%29.jpg",
    expertise: ["judiciary", "diplomacy", "federalism"],
    beliefs: ["strong judiciary", "national unity", "diplomatic relations"],
    description: "First Chief Justice of the Supreme Court and skilled diplomat."
  },
  {
    id: "jackson",
    name: "Andrew Jackson",
    role: "Seventh President",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Andrew_Jackson_by_Thomas_Sully%2C_1845.jpg",
    expertise: ["military leadership", "populism", "executive power"],
    beliefs: ["democracy", "states' rights", "limited government"],
    description: "Military hero and champion of the common man."
  }
];