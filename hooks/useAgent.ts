import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api";

export function useAgent() {
  return useQuery({
    queryKey: ["agent"],
    queryFn: getMe,
    staleTime: 60_000,
  });
}
