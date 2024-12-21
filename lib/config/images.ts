import type { FounderName } from '@/lib/data/founding-fathers/types';

interface FounderImage {
  url: string;
  alt: string;
  attribution: string;
  license: string;
}

export const FOUNDER_IMAGES: Record<FounderName, FounderImage> = {
  "Alexander Hamilton": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Alexander_Hamilton_portrait_by_John_Trumbull_1806.jpg",
    alt: "Portrait of Alexander Hamilton by John Trumbull, 1806",
    attribution: "John Trumbull",
    license: "Public Domain"
  },
  "Benjamin Franklin": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/87/Joseph_Siffred_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg",
    alt: "Portrait of Benjamin Franklin by Joseph Siffred Duplessis",
    attribution: "Joseph Siffred Duplessis",
    license: "Public Domain"
  },
  "James Madison": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1d/James_Madison.jpg",
    alt: "Portrait of James Madison by John Vanderlyn",
    attribution: "John Vanderlyn",
    license: "Public Domain"
  },
  "John Jay": {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3d/John_Jay_%28Gilbert_Stuart_portrait%29.jpg",
    alt: "Portrait of John Jay by Gilbert Stuart",
    attribution: "Gilbert Stuart",
    license: "Public Domain"
  },
  "Andrew Jackson": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Andrew_Jackson_by_Thomas_Sully%2C_1845.jpg",
    alt: "Portrait of Andrew Jackson by Thomas Sully, 1845",
    attribution: "Thomas Sully",
    license: "Public Domain"
  }
} as const;

export function getFounderImage(name: FounderName): FounderImage {
  return FOUNDER_IMAGES[name];
}