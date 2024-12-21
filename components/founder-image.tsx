"use client";

import Image from "next/image";
import { FOUNDER_IMAGES } from "@/lib/config/images";
import type { FounderName } from "@/lib/data/founding-fathers/types";
import { cn } from "@/lib/utils";

interface FounderImageProps {
  name: FounderName;
  priority?: boolean;
  className?: string;
  showAttribution?: boolean;
}

export function FounderImage({ 
  name, 
  priority = false,
  className,
  showAttribution = false 
}: FounderImageProps) {
  const image = FOUNDER_IMAGES[name];

  return (
    <div className={cn("relative", className)}>
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={priority}
      />
      {showAttribution && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1">
          <p>Portrait by {image.attribution}</p>
          <p>{image.license}</p>
        </div>
      )}
    </div>
  );
}