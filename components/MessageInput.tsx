"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage, suggestReply } from "../lib/api";
import type { Message } from "../lib/api";
import { Spinner } from "./ui/Spinner";

interface MessageInputProps {
  conversationId: string;
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const [text, setText] = useState("");
  const [aiError, setAiError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [text]);

  const sendMutation = useMutation({
    mutationFn: (msg: string) => sendMessage(conversationId, msg),

    onMutate: async (newText) => {
      await queryClient.cancelQueries({
        queryKey: ["messages", conversationId],
      });
      await queryClient.cancelQueries({ queryKey: ["conversations"] });

      const previousMessages = queryClient.getQueryData<Message[]>([
        "messages",
        conversationId,
      ]);

      const optimistic: Message = {
        id: `optimistic-${Date.now()}`,
        direction: "out",
        body: newText,
        status: "sent",
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (old) => [...(old ?? []), optimistic],
      );

      return { previousMessages };
    },

    onError: (_err, _text, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", conversationId],
          context.previousMessages,
        );
      }
    },

    onSuccess: (saved) => {
      queryClient.setQueryData<Message[]>(["messages", conversationId], (old) =>
        (old ?? []).map((m) => (m.id.startsWith("optimistic-") ? saved : m)),
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const suggestMutation = useMutation({
    mutationFn: () => suggestReply(conversationId),
    onSuccess: (data) => {
      setText(data.suggestion);
      setAiError(null);
      textareaRef.current?.focus();
    },
    onError: () => {
      setAiError("Não foi possível obter sugestão. Tente novamente.");
      setTimeout(() => setAiError(null), 4000);
    },
  });

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || sendMutation.isPending) return;
    setText("");
    sendMutation.mutate(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[var(--search-bg)] px-3 py-2 border-t border-[var(--border)]">
      {aiError && (
        <div
          role="alert"
          className="mb-2 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200"
        >
          {aiError}
        </div>
      )}

      {sendMutation.isError && (
        <div
          role="alert"
          className="mb-2 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200"
        >
          Falha ao enviar. Tente novamente.
        </div>
      )}

      {suggestMutation.isPending && (
        <p className="text-xs text-[var(--accent)] mb-1 text-center animate-pulse">
          Gerando sugestão com IA...
        </p>
      )}

      <div className="flex items-end gap-2">
        <button
          onClick={() => suggestMutation.mutate()}
          disabled={suggestMutation.isPending}
          title="Sugerir resposta com IA"
          aria-label="Sugerir resposta com IA"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] disabled:opacity-60 transition-colors"
        >
          {suggestMutation.isPending ? (
            <Spinner size="sm" className="border-white border-t-transparent" />
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )}
        </button>

        <div className="flex-1 bg-white rounded-2xl border border-[var(--border)] flex items-end px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-[var(--accent)] transition min-w-0">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none leading-relaxed"
            aria-label="Campo de mensagem"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!text.trim() || sendMutation.isPending}
          aria-label="Enviar mensagem"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {sendMutation.isPending ? (
            <Spinner size="sm" className="border-white border-t-transparent" />
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
