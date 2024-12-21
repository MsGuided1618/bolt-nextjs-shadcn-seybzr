"use client";

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitQuestion } from '@/lib/api/submit-question';
import { validateEmail, validateContent } from '@/lib/utils/validation';

interface FormState {
  content: string;
  email: string;
  selectedFounder: string;
}

export function useFormSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = (formData: FormState): boolean => {
    if (!validateContent(formData.content)) {
      toast({
        title: "Invalid Content",
        description: "Please provide a question with at least 10 characters.",
        variant: "destructive",
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (formData: FormState) => {
    if (!validateForm(formData)) {
      return null;
    }

    setIsSubmitting(true);

    try {
      const result = await submitQuestion(
        formData.content,
        formData.email,
        formData.selectedFounder
      );

      if (result.success && result.data) {
        toast({
          title: "Response Received",
          description: `${result.data.founder} has provided their wisdom.`,
        });
        return result.data;
      }
      
      throw new Error(result.error || 'Failed to get response');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive",
      });
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
}