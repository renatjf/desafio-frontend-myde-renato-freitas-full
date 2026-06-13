export default function InboxPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[var(--background)]">
      <div className="w-20 h-20 rounded-full bg-[var(--accent-light)] flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-medium text-[var(--foreground)]">Myde Atendimento</h2>
        <p className="text-sm text-[var(--muted)] mt-1 max-w-xs">Selecione uma conversa ao lado para começar a atender.</p>
      </div>
    </div>
  );
}
