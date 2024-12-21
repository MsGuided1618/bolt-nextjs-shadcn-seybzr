import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageSection({ title, children, className }: PageSectionProps) {
  return (
    <section className={cn("relative z-10", className)}>
      <h2 className="font-serif text-3xl mb-8 text-center text-gold">{title}</h2>
      {children}
    </section>
  );
}