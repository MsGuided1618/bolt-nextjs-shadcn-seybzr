"use client";

import { Editor, EditorContent } from "@tiptap/react";
import { EDITOR_STYLES as styles } from "./styles";

interface EditorContentWrapperProps {
  editor: Editor | null;
}

export function EditorContentWrapper({ editor }: EditorContentWrapperProps) {
  return (
    <div className={styles.content.wrapper}>
      <EditorContent editor={editor} />
      <div className={styles.content.hint}>
        Press Enter to submit, Shift + Enter for new line
      </div>
    </div>
  );
}