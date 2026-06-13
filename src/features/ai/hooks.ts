import { useMutation } from "@tanstack/react-query";
import { suggestReply } from "./services";

export const useAiSuggestion = () =>
  useMutation({
    mutationFn: (conversationId: string) => suggestReply(conversationId),
  });
