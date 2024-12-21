"use client";

import { motion } from "framer-motion";
import { APP_CONFIG } from "@/lib/constants/config";

export function PageHeader() {
  return (
    <header className="text-center mb-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-radial from-gold/5 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        </div>

        <h1 className="font-serif text-4xl md:text-6xl mb-4 tracking-tight text-gold">
          {APP_CONFIG.title}
        </h1>
        <p className="font-serif text-xl text-stone-300/90 max-w-2xl mx-auto">
          {APP_CONFIG.description}
        </p>

        {/* Decorative flourish */}
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>
      </motion.div>
    </header>
  );
}