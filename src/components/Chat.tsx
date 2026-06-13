"use client";
import { useState } from "react";
import { useAiSuggestion } from "@/features/ai/hooks";
import { useMessages, useSendMessage } from "@/features/messages/hooks";
import ChatHeader from "@/components/ChatHeader";
import Time from "@/components/Time";

export default function Chat({ id, conversation, onToggleSidebar }: any) {
  const { data, isLoading, isError } = useMessages(id);
  const send = useSendMessage(id);
  const ai = useAiSuggestion();
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    send.mutate(trimmed);
    setText("");
  };

  const handleSuggestion = async () => {
    if (!id) return;
    try {
      const suggestion = await ai.mutateAsync(id);
      setText(suggestion);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-panel">
      <ChatHeader
        conversation={conversation}
        onToggleSidebar={onToggleSidebar}
      />

      <div className="chat-content">
        {isLoading && (
          <div className="chat-placeholder">Buscando mensagens...</div>
        )}
        {isError && (
          <div className="chat-placeholder error">
            Falha ao carregar mensagens.
          </div>
        )}
        {!id && (
          <div className="chat-placeholder">
            Selecione uma conversa para começar.
          </div>
        )}
        {id && !isLoading && !isError && data?.length === 0 && (
          <div className="chat-placeholder">
            Ainda não há mensagens nessa conversa.
          </div>
        )}

        <div className="messages">
          {data?.map((message: any) => {
            const isOutgoing = message.direction === "out";
            return (
              <div
                key={message.id}
                className={`message ${isOutgoing ? "outgoing" : "incoming"}`}
              >
                <p>{message.body ?? message.content}</p>
                <span className="message-meta">
                  <Time iso={message.createdAt} />
                  {isOutgoing ? ` • ${message.status ?? "enviado"}` : ""}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chat-composer">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Escreva uma resposta..."
          aria-label="Campo de mensagem"
        />
        <div className="composer-actions">
          <button
            type="button"
            className="button-secondary"
            onClick={handleSuggestion}
            disabled={ai.isPending || !id}
          >
            {ai.isPending ? "Gerando sugestão..." : "Sugerir resposta"}
          </button>
          <button
            type="button"
            className="button-primary"
            onClick={handleSend}
            disabled={send.isPending || !text.trim()}
          >
            {send.isPending ? "Enviando..." : "Enviar"}
          </button>
        </div>
        {ai.isError && (
          <p className="composer-hint">
            Erro ao buscar sugestão. Tente novamente.
          </p>
        )}
      </div>
    </div>
  );
}
