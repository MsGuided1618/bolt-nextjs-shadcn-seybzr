"use client";

import { motion } from "framer-motion";
import { Feather } from "lucide-react";

export function LoadingQuill() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <motion.div
        animate={{
          rotate: [0, -45, 0],
          y: [0, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-gold"
      >
        <Feather className="w-12 h-12" />
      </motion.div>
      <p className="text-stone-400 text-lg font-serif italic">
        Awaiting response...
      </p>
    </div>
  );
}