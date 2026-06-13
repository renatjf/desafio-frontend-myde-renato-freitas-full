"use client";

export default function ConversationItem({
  conversation,
  onSelect,
  selected,
}: any) {
  function timeAgo(dateString: string) {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "agora";
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={`conversation-item ${selected ? "selected" : ""}`}
    >
      <div
        className="conversation-avatar"
        style={{ backgroundColor: conversation.avatarColor }}
      >
        {conversation.contactName?.split(" ")[0][0] ?? "?"}
      </div>
      <div className="conversation-meta">
        <div className="conversation-head">
          <span className="conversation-name">{conversation.contactName}</span>
          <span className="conversation-time">
            {timeAgo(conversation.lastMessageAt)}
          </span>
        </div>
        <p className="conversation-preview">{conversation.lastMessage}</p>
      </div>
      {conversation.unread > 0 && (
        <span className="conversation-unread">{conversation.unread}</span>
      )}
    </button>
  );
}
