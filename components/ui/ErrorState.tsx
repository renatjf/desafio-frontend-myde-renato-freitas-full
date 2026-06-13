interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Algo deu errado.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center">
      <span className="text-4xl" aria-hidden="true">⚠️</span>
      <p className="text-[var(--foreground)] font-medium">Erro ao carregar</p>
      <p className="text-sm text-[var(--muted)]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 bg-[var(--accent)] text-white text-sm rounded-full hover:bg-[var(--accent-dark)] transition-colors"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
