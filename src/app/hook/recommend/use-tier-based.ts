
import { useQuery } from "@tanstack/react-query";
import { getTierBasedRecommend } from "../../_api/recommend/get-daily-problems";

export const useTierBasedRecommend = (userId: number) => {
  return useQuery({
    queryKey: ["daily-problems", userId],
    queryFn: () => getTierBasedRecommend(userId),
  });
};
