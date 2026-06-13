"use client";

import { ChatArea } from "./ChatArea";

interface MobileChatWrapperProps {
  conversationId: string;
}

export function MobileChatWrapper({ conversationId }: MobileChatWrapperProps) {
  return (
    <div className="flex flex-col w-full" style={{ height: "100dvh" }}>
      <ChatArea conversationId={conversationId} isMobile />
    </div>
  );
}
