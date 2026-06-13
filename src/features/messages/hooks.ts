import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage } from "./services";

export const useMessages = (id: string) =>
  useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessages(id),
    enabled: !!id,
    refetchInterval: 3000,
  });

export const useSendMessage = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => sendMessage(id, content),
    onMutate: async (content) => {
      await qc.cancelQueries({ queryKey: ["messages", id] });
      const prev = qc.getQueryData(["messages", id]);
      qc.setQueryData(["messages", id], (old: any) => [
        ...(old || []),
        { id: Date.now(), body: content },
      ]);
      return { prev };
    },
    onError: (_e, _v, ctx) => qc.setQueryData(["messages", id], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ["messages", id] }),
  });
};
