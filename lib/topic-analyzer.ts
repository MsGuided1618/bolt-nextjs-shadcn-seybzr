import { foundingFathers } from './founding-fathers';

export interface TopicAnalysis {
  relevantFounders: string[];
  topics: string[];
  era: string;
  confidence: number;
}

const FOUNDER_EXPERTISE = Object.fromEntries(
  foundingFathers.map(father => [
    father.name,
    {
      topics: father.expertise,
      keywords: [...father.expertise, ...father.beliefs],
      weight: 1.0
    }
  ])
);

export function analyzeTopics(text: string): TopicAnalysis {
  const lowercaseText = text.toLowerCase();
  const founderScores = new Map<string, number>();
  const matchedTopics = new Set<string>();

  // Calculate scores for each founder based on keyword matches
  Object.entries(FOUNDER_EXPERTISE).forEach(([founder, expertise]) => {
    let score = 0;
    expertise.keywords.forEach(keyword => {
      if (lowercaseText.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    expertise.topics.forEach(topic => {
      if (lowercaseText.includes(topic.toLowerCase())) {
        score += 0.5;
        matchedTopics.add(topic);
      }
    });
    score *= expertise.weight;
    founderScores.set(founder, score);
  });

  // Sort founders by score and get top matches
  const sortedFounders = Array.from(founderScores.entries())
    .sort((a, b) => b[1] - a[1])
    .filter(([_, score]) => score > 0)
    .map(([founder]) => founder);

  // If no direct matches, include all founders
  const relevantFounders = sortedFounders.length > 0 
    ? sortedFounders 
    : foundingFathers.map(f => f.name);

  // Calculate confidence based on keyword matches
  const maxPossibleScore = Math.max(...Array.from(founderScores.values()));
  const confidence = Math.min(maxPossibleScore / 3, 1); // Normalize to 0-1 range

  return {
    relevantFounders,
    topics: Array.from(matchedTopics),
    era: determineEra(lowercaseText),
    confidence
  };
}

function determineEra(text: string): string {
  const eras = {
    'Revolutionary': ['revolution', 'independence', 'british', 'colonial'],
    'Constitutional': ['constitution', 'federal', 'republic', 'union'],
    'Early Republic': ['presidency', 'cabinet', 'party', 'administration']
  };

  for (const [era, keywords] of Object.entries(eras)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return era;
    }
  }

  return 'General';
}