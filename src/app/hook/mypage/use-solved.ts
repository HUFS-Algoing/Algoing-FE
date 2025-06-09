"use client";

import { fetchSolvedProblems, SolvedProblem } from "@/app/_api/mypage/solved";
import { useQuery } from "@tanstack/react-query";

export const useSolvedProblems = (userId: number) => {
  return useQuery<SolvedProblem[]>({
    queryKey: ["solved-problems", userId],
    queryFn: () => fetchSolvedProblems(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // TODO: 5분 캐싱이면 되는지
  });
};
