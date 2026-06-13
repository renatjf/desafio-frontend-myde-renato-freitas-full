import { ConversationList } from "../../components/ConversationList";
import { MobileInboxShell } from "../../components/MobileInboxShell";

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* DESKTOP ONLY */}
      <div className="hidden md:flex w-full h-full">
        <div
          className="w-[450px] flex-shrink-0 flex flex-col border-r border-[var(--border)]"
          style={{ height: "100dvh" }}
        >
          <ConversationList />
        </div>

        <div
          className="flex-1 flex flex-col min-w-0 min-h-0"
          style={{ height: "100dvh" }}
        >
          {children}
        </div>
      </div>

      {/* MOBILE (se quiser outra tela) */}
      <div className="md:hidden">{children}</div>

      <MobileInboxShell sidebar={<ConversationList />}>
        {children}
      </MobileInboxShell>
    </>
  );
}
