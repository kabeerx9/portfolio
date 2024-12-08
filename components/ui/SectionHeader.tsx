interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`space-y-2 mb-12 text-center ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-zinc-600 dark:text-zinc-400">{subtitle}</p>
      )}
    </div>
  );
} 