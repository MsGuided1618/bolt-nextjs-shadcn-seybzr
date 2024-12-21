"use client";

import {
  Toast,
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast";
import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast";

export interface ToastOptions extends Partial<ToastProps> {
  action?: ToastActionElement;
}

export function useToast() {
  const { toast: originalToast, ...rest } = useToastOriginal();

  const toast = (options: ToastOptions) => {
    return originalToast({
      ...options,
      className: "bg-stone-800 border-stone-700 text-stone-100",
    });
  };

  return {
    toast,
    ...rest,
  };
}