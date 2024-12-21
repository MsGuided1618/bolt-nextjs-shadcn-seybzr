"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorToolbar } from "./editor/editor-toolbar";
import { EDITOR_CONFIG } from "@/lib/constants/config";
import { EditorProvider } from "./editor/editor-context";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSubmit?: () => void;
}

export function RichTextEditor({ content, onChange, onSubmit }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: EDITOR_CONFIG.headingLevels,
        },
      }),
      Placeholder.configure({
        placeholder: EDITOR_CONFIG.placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-stone prose-invert max-w-none min-h-[200px] px-4 py-3 focus:outline-none text-stone-200",
      },
      handleKeyDown: (view, event) => {
        if (event.key === "Enter" && !event.shiftKey && onSubmit) {
          event.preventDefault();
          onSubmit();
          return true;
        }
        return false;
      },
    },
    // Fix SSR hydration mismatch
    enableCaret: isMounted,
    enableInput: isMounted,
    enablePaste: isMounted,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-[200px] bg-stone-800/50 rounded-lg animate-pulse" />
    );
  }

  return (
    <EditorProvider editor={editor}>
      <div className="relative rounded-lg overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/95 via-stone-800/95 to-stone-800/95" />
        <EditorToolbar />
        <div className="relative">
          <EditorContent editor={editor} />
        </div>
        <div className="absolute bottom-2 right-4 text-stone-400 text-sm">
          Press Enter to submit, Shift + Enter for new line
        </div>
      </div>
    </EditorProvider>
  );
}