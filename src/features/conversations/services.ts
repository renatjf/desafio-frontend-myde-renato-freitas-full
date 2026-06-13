
import { api } from "@/lib/api";
export const getConversations = async () => (await api.get("/conversations")).data;
