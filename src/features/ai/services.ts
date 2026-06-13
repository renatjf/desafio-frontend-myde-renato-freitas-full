import { api } from "@/lib/api";

export const suggestReply = async (conversationId: string) =>
  (await api.post("/ai/suggest", { conversationId })).data.suggestion as string;
