"use client";

import { useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMessages } from "../hooks/useMessages";
import { useConversations } from "../hooks/useConversations";
import { MessageBubble } from "./MessageBubble";
import { DateSeparator } from "./DateSeparator";
import { MessageInput } from "./MessageInput";
import { Spinner } from "./ui/Spinner";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";
import { Avatar } from "./ui/Avatar";
import { formatDateSeparator, formatPhone } from "../lib/utils";
import type { Message } from "../lib/api";

interface ChatAreaProps {
  conversationId: string;
  isMobile?: boolean;
}

function groupByDate(messages: Message[]) {
  const groups: { date: string; messages: Message[] }[] = [];
  for (const msg of messages) {
    const dateLabel = formatDateSeparator(msg.createdAt);
    const last = groups[groups.length - 1];
    if (last && last.date === dateLabel) {
      last.messages.push(msg);
    } else {
      groups.push({ date: dateLabel, messages: [msg] });
    }
  }
  return groups;
}

export function ChatArea({ conversationId, isMobile = false }: ChatAreaProps) {
  const router = useRouter();
  const {
    data: messages,
    isLoading,
    isError,
    refetch,
  } = useMessages(conversationId);
  const { data: conversations } = useConversations();
  const bottomRef = useRef<HTMLDivElement>(null);

  const conversation = conversations?.find((c) => c.id === conversationId);
  const grouped = useMemo(() => groupByDate(messages ?? []), [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  return (
    <section
      className="flex flex-col w-full overflow-hidden"
      style={{ height: "100%" }}
      aria-label={`Chat com ${conversation?.contactName ?? "contato"}`}
    >
      <header className="flex items-center gap-3 px-4 py-3 bg-[var(--search-bg)] border-b border-[var(--border)] flex-shrink-0">
        {isMobile && (
          <button
            onClick={() => router.push("/inbox")}
            aria-label="Voltar"
            className="mr-1 text-[var(--accent)] hover:text-[var(--accent-dark)] transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        )}

        {conversation ? (
          <>
            <Avatar
              name={conversation.contactName}
              color={conversation.avatarColor}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-semibold text-[var(--foreground)] truncate">
                {conversation.contactName}
              </h1>
              <p className="text-xs text-[var(--muted)]">
                {formatPhone(conversation.contactPhone)}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--border)] animate-pulse" />
            <div className="h-4 w-32 bg-[var(--border)] rounded animate-pulse" />
          </div>
        )}
      </header>

      <div
        className="flex-1 overflow-y-auto px-3 py-4 min-h-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundColor: "#e5ddd5",
        }}
        role="log"
        aria-live="polite"
        aria-label="Histórico de mensagens"
      >
        {isLoading && (
          <div className="flex justify-center pt-12">
            <Spinner size="lg" />
          </div>
        )}

        {isError && (
          <ErrorState
            message="Não foi possível carregar as mensagens."
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && grouped.length === 0 && (
          <EmptyState
            icon="💬"
            title="Sem mensagens ainda"
            description="Envie a primeira mensagem para iniciar a conversa."
          />
        )}

        {!isLoading &&
          !isError &&
          grouped.map((group) => (
            <div key={group.date}>
              <DateSeparator label={group.date} />
              {group.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOptimistic={msg.id.startsWith("optimistic-")}
                />
              ))}
            </div>
          ))}

        <div ref={bottomRef} aria-hidden="true" />
      </div>

      <div className="flex-shrink-0">
        <MessageInput conversationId={conversationId} />
      </div>
    </section>
  );
}
