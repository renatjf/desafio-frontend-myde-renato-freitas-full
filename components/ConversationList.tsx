"use client";

import { useState, useMemo } from "react";
import { useConversations } from "../hooks/useConversations";
import { ConversationItem } from "./ConversationItem";
import { Spinner } from "./ui/Spinner";
import { EmptyState } from "./ui/EmptyState";
import { ErrorState } from "./ui/ErrorState";
import { normalizeSearch } from "../lib/utils";

export function ConversationList() {
  const [search, setSearch] = useState("");
  const [filterUnread, setFilterUnread] = useState(false);
  const {
    data: conversations,
    isLoading,
    isError,
    refetch,
  } = useConversations();

  const filtered = useMemo(() => {
    if (!conversations) return [];
    const q = normalizeSearch(search);
    return conversations.filter((c) => {
      const matchesSearch =
        !q ||
        normalizeSearch(c.contactName).includes(q) ||
        normalizeSearch(c.lastMessage).includes(q) ||
        c.contactPhone.includes(q);
      const matchesUnread = !filterUnread || c.unread > 0;
      return matchesSearch && matchesUnread;
    });
  }, [conversations, search, filterUnread]);

  const totalUnread = conversations?.reduce((acc, c) => acc + c.unread, 0) ?? 0;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--sidebar-bg)]">
      <div className="flex-shrink-0 bg-[var(--accent)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-white font-semibold text-sm tracking-wide">
            Myde Atendimento
          </span>
        </div>
        <div className="flex items-center gap-2">
          {totalUnread > 0 && (
            <span className="bg-white text-[var(--accent)] text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          )}
          <span
            title="Sincronizando"
            className="text-[10px] text-white opacity-70"
          >
            ●
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 px-3 py-2 bg-[var(--sidebar-bg)] border-b border-[var(--border)]">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Buscar conversa"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[var(--search-bg)] rounded-full text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
            aria-label="Buscar conversas"
          />
        </div>

        <div className="mt-2">
          <button
            onClick={() => setFilterUnread((v) => !v)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              filterUnread
                ? "bg-[var(--accent-light)] text-[var(--accent-dark)] font-medium"
                : "text-[var(--muted)] hover:bg-[var(--surface-2)]"
            }`}
            aria-pressed={filterUnread}
          >
            Não lidas{" "}
            {filterUnread && totalUnread > 0 ? `(${totalUnread})` : ""}
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto min-h-0"
        role="list"
        aria-label="Lista de conversas"
      >
        {isLoading && (
          <div className="flex justify-center pt-12">
            <Spinner size="lg" />
          </div>
        )}

        {isError && (
          <ErrorState
            message="Não foi possível carregar as conversas."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            icon={search || filterUnread ? "🔍" : "💬"}
            title={
              search
                ? "Nenhuma conversa encontrada"
                : filterUnread
                  ? "Sem mensagens não lidas"
                  : "Nenhuma conversa ainda"
            }
            description={
              search
                ? "Tente outro nome ou mensagem."
                : filterUnread
                  ? "Todas as mensagens foram lidas."
                  : "Quando chegarem mensagens, aparecem aqui."
            }
          />
        )}

        {!isLoading &&
          !isError &&
          filtered.map((conversation) => (
            <div role="listitem" key={conversation.id}>
              <ConversationItem
                conversation={conversation}
                searchQuery={search}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
