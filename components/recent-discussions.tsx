"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";

interface Discussion {
  id: string;
  question: string;
  askedBy: string;
  answeredBy: string;
  date: string;
  excerpt: string;
}

// This would typically come from your API/database
const initialDiscussions: Discussion[] = [
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

export function RecentDiscussions() {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  // Function to add new discussion (call this when a new response is received)
  const addDiscussion = (newDiscussion: Discussion) => {
    setDiscussions(prev => [newDiscussion, ...prev]);
  };

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[600px] pr-4">
        <AnimatePresence>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discussions.slice(0, visibleCount).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group bg-gradient-to-br from-stone-800/90 via-stone-800/80 to-[#2C1810]/90 border-stone-600/50 hover:bg-stone-800/95 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/parchment-texture.png')] opacity-5 mix-blend-overlay" />
                  
                  <CardHeader className="relative border-b border-stone-600/30">
                    <div className="flex items-start gap-3">
                      <div className="bg-gold/20 p-2 rounded-full">
                        <MessageSquare className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-gold group-hover:text-gold/80 transition-colors line-clamp-2">
                          {item.question}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative pt-4">
                    <p className="text-stone-300 text-sm mb-4 line-clamp-3 italic">
                      "{item.excerpt}"
                    </p>
                    <div className="space-y-2">
                      <p className="text-stone-400 text-sm">
                        Asked by: <span className="text-stone-300">{item.askedBy}</span>
                      </p>
                      <p className="text-stone-400 text-sm">
                        Answered by: <span className="text-gold font-semibold">{item.answeredBy}</span>
                      </p>
                      <p className="text-stone-500 text-xs italic">Anno Domini {item.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </ScrollArea>

      {visibleCount < discussions.length && (
        <div className="text-center mt-8">
          <Button
            onClick={loadMore}
            variant="outline"
            className="bg-stone-800/50 border-stone-600/50 text-stone-300 hover:bg-stone-800 hover:text-white transition-all duration-300"
          >
            <ChevronDown className="mr-2 h-4 w-4" />
            View More Deliberations
          </Button>
        </div>
      )}
    </div>
  );
}