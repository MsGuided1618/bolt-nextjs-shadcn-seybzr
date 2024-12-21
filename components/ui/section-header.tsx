interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <header className={className}>
      <h2 className="font-serif text-3xl text-center text-gold">{title}</h2>
      {subtitle && (
        <p className="text-stone-300/90 text-center mt-2">{subtitle}</p>
      )}
    </header>
  );
}