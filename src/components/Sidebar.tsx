"use client";
import { useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import ConversationItem from "@/components/ConversationItem";

export default function Sidebar({
  conversations,
  selectedId,
  onSelect,
  isLoading,
  isError,
  onClose,
}: any) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!conversations) return [];
    const search = query.toLowerCase();
    return conversations.filter((conversation: any) =>
      [
        conversation.contactName,
        conversation.contactPhone,
        conversation.lastMessage,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search)),
    );
  }, [conversations, query]);

  return (
    <aside className="sidebar">
      <div className="sidebar-topbar">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">RF</div>
          <div className="sidebar-user-details">
            <p className="sidebar-user-label">Meu perfil</p>
            <span className="sidebar-user-name">Atendimento</span>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            className="sidebar-close icon-button"
            aria-label="Fechar conversas"
            onClick={onClose}
          >
            ×
          </button>
        )}
        <button
          type="button"
          className="sidebar-new-chat"
          aria-label="Nova conversa"
          onClick={() => console.log("Nova conversa")}
        >
          <PlusCircle size={18} />
          <span>Nova conversa</span>
        </button>
      </div>

      <div className="sidebar-body">
        <div className="sidebar-header">
          <div>
            <p className="sidebar-label">Atendimentos</p>
            <h1 className="sidebar-title">Inbox WhatsApp</h1>
          </div>
          <span className="sidebar-count">{conversations?.length ?? 0}</span>
        </div>

        <div className="sidebar-search">
          <input
            type="search"
            placeholder="Buscar conversa, nome ou telefone"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Filtrar conversas"
          />
        </div>

        <div className="conversation-list">
          {isLoading && (
            <div className="sidebar-empty">Carregando conversas...</div>
          )}
          {isError && (
            <div className="sidebar-empty">
              Erro ao carregar. Atualize a página.
            </div>
          )}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="sidebar-empty">Nenhuma conversa encontrada.</div>
          )}
          {filtered.map((conversation: any) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              selected={conversation.id === selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
