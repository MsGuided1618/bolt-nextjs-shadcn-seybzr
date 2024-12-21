"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, Quote, Flag } from "lucide-react";
import { PDFDownloadButton } from "@/components/pdf-download-button";
import { parseResponse, formatContent } from "@/lib/response-utils";

interface ResponseDisplayProps {
  response: string;
  founder: string;
}

export function ResponseDisplay({ response, founder }: ResponseDisplayProps) {
  const sections = parseResponse(response);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <Card className="relative overflow-hidden bg-[#F5E6D3] border-[#8B4513]/30">
        <div className="absolute inset-0 bg-[url('/parchment-texture.png')] opacity-30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#8B4513]/5 to-[#8B4513]/10" />
        
        <div className="relative p-8 space-y-6">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-[#8B4513]">{founder}'s Response</h3>
              <p className="text-[#5C2E0E]/80 mt-1">Anno Domini {new Date().getFullYear()}</p>
            </div>
            <div className="flex items-center gap-4">
              <PDFDownloadButton response={response} founder={founder} />
              <Badge className="bg-[#8B4513] text-[#F5E6D3] hover:bg-[#5C2E0E]">
                Official Correspondence
              </Badge>
            </div>
          </header>

          <Separator className="bg-[#8B4513]/20" />

          <ScrollArea className="h-[400px] pr-4 relative">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-[#8B4513]">
                    {section.type === 'context' && (
                      <>
                        <Clock className="h-5 w-5" />
                        <h4 className="font-serif text-lg">Historical Context</h4>
                      </>
                    )}
                    {section.type === 'recommendation' && (
                      <>
                        <BookOpen className="h-5 w-5" />
                        <h4 className="font-serif text-lg">Recommendations</h4>
                      </>
                    )}
                    {section.type === 'quote' && (
                      <>
                        <Quote className="h-5 w-5" />
                        <h4 className="font-serif text-lg">Historical Reference</h4>
                      </>
                    )}
                    {section.type === 'action' && (
                      <>
                        <Flag className="h-5 w-5" />
                        <h4 className="font-serif text-lg">Action Steps</h4>
                      </>
                    )}
                  </div>
                  
                  <div 
                    className="prose max-w-none text-[#2C1810]"
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(section.content) 
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-[url('/scroll-corner.png')] opacity-20" />
        <div className="absolute top-0 right-0 w-16 h-16 bg-[url('/scroll-corner.png')] opacity-20 transform rotate-90" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-[url('/scroll-corner.png')] opacity-20 transform -rotate-90" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-[url('/scroll-corner.png')] opacity-20 transform rotate-180" />
      </Card>
    </motion.div>
  );
}