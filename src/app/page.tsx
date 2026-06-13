"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Chat from "@/components/Chat";
import { useConversations } from "@/features/conversations/hooks";

export default function Page() {
  const [selectedId, setSelectedId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: conversations, isLoading, isError } = useConversations();
  const selectedConversation = conversations?.find(
    (conversation: any) => conversation.id === selectedId,
  );

  useEffect(() => {
    if (!selectedId && conversations?.length) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations, selectedId]);

  return (
    <main className="container">
      <div className={`sidebar-wrapper ${sidebarOpen ? "open" : "closed"}`}>
        <Sidebar
          conversations={conversations}
          selectedId={selectedId}
          onSelect={(id: string) => {
            setSelectedId(id);
            // close sidebar on mobile when a conversation is selected
            setSidebarOpen(false);
          }}
          isLoading={isLoading}
          isError={isError}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      <section className="chat-pane">
        <Chat
          id={selectedId}
          conversation={selectedConversation}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
      </section>
    </main>
  );
}
