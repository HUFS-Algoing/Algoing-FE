"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "../_api/methods";

export interface ContributionDay {
  date: string;
  count: number;
}

export const useZandi = (userId: number) => {
  return useQuery<ContributionDay[]>({
    queryKey: ["zandi", userId],
    queryFn: async () => {
      const query = `?userId=${userId}`;
      return await apiGet<ContributionDay[]>(`/myinfo/zandi${query}`);
    },
    enabled: !!userId, // userId가 있을 때만 실행
    staleTime: 1000 * 60 * 5,
  });
};
