"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Scroll } from "lucide-react";
import { foundingFathers } from "@/lib/data/founding-fathers";
import { useFounderSelection } from "@/hooks/use-founder-selection";

export function FoundingFathersCarousel() {
  const { selectFounder } = useFounderSelection();

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {foundingFathers.map((father, index) => (
          <CarouselItem key={father.id} className="md:basis-1/2 lg:basis-1/3 p-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="group bg-gradient-to-br from-stone-800/90 via-stone-800/80 to-[#2C1810]/90 border-stone-600/50 hover:bg-stone-800/95 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/10 backdrop-blur-sm overflow-hidden cursor-pointer"
                onClick={() => selectFounder(father.name)}
              >
                <CardContent className="p-6">
                  <div className="aspect-square relative mb-6 overflow-hidden rounded-lg border-2 border-gold/20 group-hover:border-gold/40 transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-transparent z-10" />
                    <div className="relative w-full h-full">
                      <Image
                        src={father.image}
                        alt={father.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={index < 3}
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="bg-gold/20 p-2 rounded-full inline-block mb-3">
                        <Scroll className="h-5 w-5 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl text-gold group-hover:text-gold/80 transition-colors">
                        {father.name}
                      </h3>
                      <p className="text-stone-300 mt-1 italic">{father.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-stone-300 text-sm mb-4 line-clamp-2">
                    {father.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {father.expertise.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-stone-700/50 text-stone-200 border border-stone-600/50 capitalize"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-stone-800/80 border-stone-600 text-stone-200 hover:bg-[#8B4513] hover:text-white transition-all duration-300" />
      <CarouselNext className="bg-stone-800/80 border-stone-600 text-stone-200 hover:bg-[#8B4513] hover:text-white transition-all duration-300" />
    </Carousel>
  );
}