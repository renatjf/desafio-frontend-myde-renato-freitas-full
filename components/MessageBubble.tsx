import type { Message } from "../lib/api";
import { formatMessageTime } from "../lib/utils";
import { MessageStatus } from "./ui/MessageStatus";

interface MessageBubbleProps {
  message: Message;
  isOptimistic?: boolean;
}

export function MessageBubble({
  message,
  isOptimistic = false,
}: MessageBubbleProps) {
  const isOut = message.direction === "out";

  return (
    <div
      className={`flex ${isOut ? "justify-end" : "justify-start"} mb-1`}
      aria-label={`Mensagem ${isOut ? "enviada" : "recebida"}: ${message.body}`}
    >
      <div
        className={`relative max-w-[70%] px-3 py-2 rounded-lg text-sm shadow-sm ${
          isOut
            ? "bg-[var(--bubble-out)] text-[var(--foreground)] rounded-br-none"
            : "bg-[var(--bubble-in)] text-[var(--foreground)] rounded-bl-none"
        } ${isOptimistic ? "opacity-75" : "opacity-100"}`}
        style={{
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <p className="leading-relaxed break-words whitespace-pre-wrap">
          {message.body}
        </p>

        <div
          className={`flex items-center gap-1 mt-1 ${isOut ? "justify-end" : "justify-end"}`}
        >
          <time
            dateTime={message.createdAt}
            className="text-[10px] text-[var(--muted)] leading-none"
          >
            {formatMessageTime(message.createdAt)}
          </time>
          {isOut && !isOptimistic && <MessageStatus status={message.status} />}
          {isOptimistic && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className="text-[var(--muted)]"
              aria-label="Enviando..."
            >
              <circle
                cx="5"
                cy="5"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="6 6"
                className="animate-spin origin-center"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
