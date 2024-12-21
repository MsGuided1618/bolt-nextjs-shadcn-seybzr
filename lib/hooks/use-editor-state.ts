"use client";

import { useState, useCallback } from 'react';

export function useEditorState(initialContent: string = '') {
  const [content, setContent] = useState(initialContent);
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
    setIsValid(newContent.trim().length > 0);
  }, []);

  return {
    content,
    isValid,
    handleChange,
  };
}