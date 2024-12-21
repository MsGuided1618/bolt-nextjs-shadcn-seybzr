"use client";

import { EditorProvider } from "./editor-context";
import { EditorToolbar } from "./editor-toolbar";
import { EditorContentWrapper } from "./editor-content";
import { useEditorSetup } from "./use-editor-setup";
import { EDITOR_STYLES as styles } from "./styles";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSubmit?: () => void;
}

export function RichTextEditor({ content, onChange, onSubmit }: RichTextEditorProps) {
  const { editor, isMounted } = useEditorSetup({ content, onChange, onSubmit });

  if (!isMounted) {
    return (
      <div className="min-h-[200px] bg-stone-800/50 rounded-lg animate-pulse" />
    );
  }

  return (
    <EditorProvider editor={editor}>
      <div className={styles.container}>
        {/* Base background with radial gradient */}
        <div className={styles.background} />
        
        {/* Enhanced inset shadow effect */}
        <div 
          className={cn(
            styles.shadow.base,
            styles.shadow.idle,
            "group-focus-within:" + styles.shadow.focused
          )} 
        />
        
        <EditorToolbar editor={editor} />
        <EditorContentWrapper editor={editor} />
      </div>
    </EditorProvider>
  );
}