"use client";

import { useState } from "react";
import { Scroll, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#8B4513] to-[#5C2E0E] text-white border-2 border-[#BF9B30]/30 rounded-lg p-8 max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#BF9B30] p-3 rounded-full">
          <Scroll className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-3xl text-[#BF9B30]">Beyond the Headlines</h3>
          <p className="text-stone-300 text-sm mt-1">SimpleAI4You.com</p>
        </div>
      </div>
      
      <p className="text-stone-200 mb-8 text-lg leading-relaxed">
        Subscribe to our distinguished newsletter for enlightened discourse on modern matters,
        delivered with the wisdom of ages past.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Your electronic correspondence..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-stone-400 h-12 pr-36"
            required
          />
          <Button 
            type="submit"
            disabled={status === "loading"}
            className="absolute right-1 top-1 bg-[#BF9B30] hover:bg-[#A68628] text-white transition-all duration-300 h-10"
          >
            <Send className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
        </div>

        {status === "success" && (
          <p className="text-green-400 text-center">Welcome to our correspondence list!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-center">Alas, there was an error. Please try again.</p>
        )}
      </form>

      <div className="mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-stone-300 text-sm">
          Join our growing community of thoughtful citizens seeking wisdom from the past
        </p>
      </div>
    </div>
  );
}