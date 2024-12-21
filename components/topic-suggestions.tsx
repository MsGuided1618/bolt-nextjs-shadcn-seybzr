"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TopicAnalysis, analyzeTopics } from '@/lib/topic-analyzer';

export function TopicSuggestions({ content }: { content: string }) {
  const [analysis, setAnalysis] = useState<TopicAnalysis>({
    relevantFounders: [],
    topics: [],
    era: '',
  });

  useEffect(() => {
    if (content.length > 10) {
      const result = analyzeTopics(content);
      setAnalysis(result);
    }
  }, [content]);

  if (!analysis.relevantFounders.length) {
    return null;
  }

  return (
    <Card className="bg-stone-50/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="font-serif text-lg mb-3">Suggested Correspondents</h3>
        <ScrollArea className="h-[120px] pr-4">
          <div className="space-y-3">
            {analysis.relevantFounders.map((founder) => (
              <div key={founder} className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-[#8B4513] text-white">
                  {founder}
                </Badge>
              </div>
            ))}
            {analysis.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="capitalize">
                    {topic}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}