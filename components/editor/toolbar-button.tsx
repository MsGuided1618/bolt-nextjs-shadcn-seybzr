"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export function ToolbarButton({ onClick, isActive, icon: Icon }: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "text-stone-200 hover:text-white hover:bg-stone-700",
        isActive && "bg-stone-700"
      )}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}