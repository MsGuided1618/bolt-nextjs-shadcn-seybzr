"use client";

import { useCallback } from "react";

export function useFounderSelection() {
  const selectFounder = useCallback((founderName: string) => {
    window.dispatchEvent(
      new CustomEvent("setFounder", { detail: founderName })
    );
    
    const questionInput = document.getElementById("question-input");
    if (questionInput) {
      questionInput.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return { selectFounder };
}