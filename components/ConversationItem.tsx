"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { Conversation } from "@/lib/api";
import { Avatar } from "./ui/Avatar";
import { formatConversationTime, normalizeSearch } from "@/lib/utils";

interface ConversationItemProps {
  conversation: Conversation;
  searchQuery: string;
}

export function ConversationItem({ conversation, searchQuery }: ConversationItemProps) {
  const params = useParams();
  const isActive = params?.id === conversation.id;

  const highlight = (text: string) => {
    if (!searchQuery.trim()) return <>{text}</>;
    const norm = normalizeSearch(searchQuery);
    const normText = normalizeSearch(text);
    const idx = normText.indexOf(norm);
    if (idx === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-[var(--accent-light)] text-[var(--foreground)] rounded-sm">
          {text.slice(idx, idx + norm.length)}
        </mark>
        {text.slice(idx + norm.length)}
      </>
    );
  };

  return (
    <Link
      href={`/inbox/${conversation.id}`}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-[var(--border)] hover:bg-[var(--surface-2)] ${
        isActive ? "bg-[#f0f2f5]" : "bg-[var(--surface)]"
      }`}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Conversa com ${conversation.contactName}${conversation.unread > 0 ? `, ${conversation.unread} não lidas` : ""}`}
    >
      <Avatar name={conversation.contactName} color={conversation.avatarColor} size="md" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-[var(--foreground)] text-sm truncate">
            {highlight(conversation.contactName)}
          </span>
          <span className="text-[11px] text-[var(--muted)] flex-shrink-0">
            {formatConversationTime(conversation.lastMessageAt)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-[var(--muted)] truncate">
            {highlight(conversation.lastMessage)}
          </p>
          {conversation.unread > 0 && (
            <span
              className="bg-[var(--unread-badge)] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 flex-shrink-0"
              aria-label={`${conversation.unread} não lidas`}
            >
              {conversation.unread > 99 ? "99+" : conversation.unread}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
