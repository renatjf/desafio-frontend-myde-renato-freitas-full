
import { useQuery } from "@tanstack/react-query";
import { getConversations } from "./services";

export const useConversations = () =>
  useQuery({ queryKey: ["conversations"], queryFn: getConversations, refetchInterval: 5000 });
