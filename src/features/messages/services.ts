import { api } from "@/lib/api";
export const getMessages = async (id: string) =>
  (await api.get(`/conversations/${id}/messages`)).data;
export const sendMessage = async (id: string, text: string) =>
  (await api.post(`/conversations/${id}/messages`, { text })).data;
