interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <span className="text-4xl" aria-hidden="true">{icon}</span>
      <p className="text-[var(--foreground)] font-medium">{title}</p>
      {description && (
        <p className="text-sm text-[var(--muted)] max-w-xs">{description}</p>
      )}
    </div>
  );
}
