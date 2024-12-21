"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { ResponseDisplay } from "@/components/response-display";
import { LoadingQuill } from "@/components/ui/loading-quill";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useFormSubmission } from "@/lib/hooks/use-form-submission";
import { useEditorState } from "@/lib/hooks/use-editor-state";
import { foundingFathers } from "@/lib/founding-fathers";

export function QuestionInput() {
  const [email, setEmail] = useState("");
  const [selectedFounder, setSelectedFounder] = useState("");
  const [response, setResponse] = useState("");
  const { content, isValid, handleChange } = useEditorState();
  const { isSubmitting, handleSubmit } = useFormSubmission();
  const { toast } = useToast();

  const submitForm = async () => {
    if (!isValid || !email.trim() || !selectedFounder) {
      toast({
        title: "Required Fields Missing",
        description: "Please provide your inquiry, email address, and select a Founding Father.",
        variant: "destructive",
      });
      return;
    }

    const result = await handleSubmit({
      content,
      email,
      selectedFounder,
    });

    if (result) {
      setResponse(result.content);
    }
  };

  return (
    <div id="question-input" className="max-w-4xl mx-auto space-y-8 scroll-mt-24">
      <form onSubmit={(e) => { e.preventDefault(); submitForm(); }} className="space-y-6">
        <div className="chat-container rounded-lg p-6 space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/parchment-texture.png')] opacity-5 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900/95 via-stone-800/95 to-[#2C1810]/95 pointer-events-none" />

          <div className="relative z-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative group">
                <label className="block text-lg font-medium text-gold mb-2">
                  Select a Founding Father
                  <span className="text-[#BF9B30] ml-1">*</span>
                </label>
                <Select
                  value={selectedFounder}
                  onValueChange={setSelectedFounder}
                >
                  <SelectTrigger className="bg-stone-800/80 border-2 border-stone-600/50 text-stone-200 ring-offset-stone-800 focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all duration-300 h-12 group-hover:border-gold/50">
                    <SelectValue placeholder="Choose your correspondent..." />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-600">
                    {foundingFathers.map((father) => (
                      <SelectItem
                        key={father.id}
                        value={father.name}
                        className="text-stone-200 hover:bg-stone-700 focus:bg-stone-700"
                      >
                        {father.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative group">
                <label className="block text-lg font-medium text-gold mb-2">
                  Your Email Address
                  <span className="text-[#BF9B30] ml-1">*</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-800/80 border-2 border-stone-600/50 text-stone-200 placeholder:text-stone-400 ring-offset-stone-800 focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all duration-300 h-12 group-hover:border-gold/50"
                  required
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-lg font-medium text-gold mb-2">
                Your Inquiry
                <span className="text-[#BF9B30] ml-1">*</span>
              </label>
              <div className="relative group">
                <RichTextEditor 
                  content={content} 
                  onChange={handleChange}
                  onSubmit={submitForm}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="bg-[#BF9B30] hover:bg-[#A68628] text-white transition-all duration-300 h-12 px-6 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {isSubmitting && !response && (
        <LoadingQuill />
      )}

      {response && (
        <ResponseDisplay 
          response={response} 
          founder={selectedFounder} 
        />
      )}
    </div>
  );
}