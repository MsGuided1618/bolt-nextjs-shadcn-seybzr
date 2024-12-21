"use client";

import { createContext, useContext, ReactNode } from "react";
import { Editor } from "@tiptap/react";

interface EditorContextType {
  editor: Editor | null;
}

const EditorContext = createContext<EditorContextType>({ editor: null });

export function EditorProvider({ 
  children, 
  editor 
}: { 
  children: ReactNode;
  editor: Editor | null;
}) {
  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}