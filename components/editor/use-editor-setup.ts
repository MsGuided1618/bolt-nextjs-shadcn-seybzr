"use client";

import { useEffect, useState } from "react";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EDITOR_CONFIG } from "./config";

interface UseEditorSetupProps {
  content: string;
  onChange: (content: string) => void;
  onSubmit?: () => void;
}

export function useEditorSetup({ content, onChange, onSubmit }: UseEditorSetupProps) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure(EDITOR_CONFIG.extensions),
      Placeholder.configure({
        placeholder: EDITOR_CONFIG.placeholder,
        immediatelyRender: true
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: EDITOR_CONFIG.className,
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
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return { editor, isMounted };
}