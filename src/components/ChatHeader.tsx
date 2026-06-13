import { MoreVertical, Phone, Search, Video, Menu } from "lucide-react";

function formatPhone(phone?: string) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (!digits) return phone;

  if (digits.length === 13 && digits.startsWith("55")) {
    return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  }

  if (digits.length === 12 && digits.startsWith("55")) {
    return `+55 (${digits.slice(2, 4)}) ${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return phone;
}

export default function ChatHeader({ conversation, onToggleSidebar }: any) {
  if (!conversation) {
    return (
      <div className="chat-header">
        <div className="chat-header-left">
          <div className="chat-avatar">?</div>
          <div>
            <div className="chat-title">Nenhuma conversa selecionada</div>
            <div className="chat-subtitle">
              Escolha uma conversa na lista à esquerda
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        {onToggleSidebar && (
          <button
            type="button"
            className="icon-button mobile-menu-button"
            aria-label="Abrir conversas"
            onClick={onToggleSidebar}
          >
            <Menu size={18} />
          </button>
        )}
        <div className="chat-avatar">
          {conversation.contactName?.[0] ?? "?"}
        </div>
        <div>
          <div className="chat-title">{conversation.contactName}</div>
          <div className="chat-subtitle chat-subtitle-phone">
            <span className="status-dot" />
            {formatPhone(conversation.contactPhone)}
          </div>
        </div>
      </div>

      <div className="chat-header-actions">
        <button type="button" className="icon-button" aria-label="Ligar">
          <Phone size={18} />
        </button>
        <button
          type="button"
          className="icon-button"
          aria-label="Video chamada"
        >
          <Video size={18} />
        </button>
        <button type="button" className="icon-button" aria-label="Pesquisar">
          <Search size={18} />
        </button>
        <button type="button" className="icon-button" aria-label="Mais opções">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}
