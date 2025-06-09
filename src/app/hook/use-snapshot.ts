import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../_api/methods";
import { SnapshotData } from "../_types/snapshot";

export const useSnapshotHistory = (userId: number) => {
  return useQuery({
    queryKey: ["snapshotHistory", userId],
    queryFn: async () => {
      return await apiGet<SnapshotData[]>("/snapshots/history", { userId });
    },
    enabled: !!userId, // userId가 존재할 때만 실행
  });
};
