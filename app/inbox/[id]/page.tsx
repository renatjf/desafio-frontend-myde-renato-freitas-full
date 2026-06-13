import { MobileChatWrapper } from "../../../components/MobileChatWrapper";
import { ChatArea } from "../../../components/ChatArea";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ConversationPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <div className="md:hidden h-full">
        <MobileChatWrapper conversationId={id} />
      </div>
      <div className="hidden md:flex flex-col flex-1 min-h-0 h-full">
        <ChatArea conversationId={id} />
      </div>
    </>
  );
}
