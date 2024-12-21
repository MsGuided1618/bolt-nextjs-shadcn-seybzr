"use client";

import { motion } from "framer-motion";

export function BackgroundDecorator() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-stone-800/50 via-stone-900/80 to-stone-900" />
      
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Top right decorative corner */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        {/* Bottom left decorative corner */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        {/* Center decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold/5 to-transparent opacity-30" />
      </motion.div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('/parchment-texture.png')] opacity-[0.015] mix-blend-overlay" />
    </div>
  );
}