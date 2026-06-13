interface MessageStatusProps {
  status: "sent" | "delivered" | "read";
}

export function MessageStatus({ status }: MessageStatusProps) {
  if (status === "sent") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-label="Enviada" className="inline-block">
        <path d="M12 5L6.5 10.5L4 8" stroke="#667781" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (status === "delivered") {
    return (
      <svg width="18" height="14" viewBox="0 0 20 16" aria-label="Entregue" className="inline-block">
        <path d="M15 5L9.5 10.5L7 8" stroke="#667781" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M11 5L5.5 10.5L3 8" stroke="#667781" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  return (
    <svg width="18" height="14" viewBox="0 0 20 16" aria-label="Lida" className="inline-block">
      <path d="M15 5L9.5 10.5L7 8" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M11 5L5.5 10.5L3 8" stroke="#53bdeb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
