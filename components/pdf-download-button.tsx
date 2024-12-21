"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateResponsePDF } from "@/lib/pdf-utils";
import { useToast } from "@/hooks/use-toast";

interface PDFDownloadButtonProps {
  response: string;
  founder: string;
}

export function PDFDownloadButton({ response, founder }: PDFDownloadButtonProps) {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      await generateResponsePDF(response, founder);
      toast({
        title: "Success",
        description: "Your response has been downloaded as a PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="bg-[#8B4513]/10 border-[#8B4513]/30 text-[#8B4513] hover:bg-[#8B4513]/20 hover:border-[#8B4513]/50 transition-all duration-300"
    >
      <Download className="h-4 w-4 mr-2" />
      Download Response
    </Button>
  );
}