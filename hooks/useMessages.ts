import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/lib/api";

export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    refetchInterval: 8_000,
    enabled: !!conversationId,
  });
}
