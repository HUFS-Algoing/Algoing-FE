"use client";

import {
  fetchReviewedProblems,
  ReviewedProblem,
} from "@/app/_api/mypage/reviewed";
import { useQuery } from "@tanstack/react-query";
export const useReviewedProblems = (userId: number) => {
  return useQuery<ReviewedProblem[]>({
    queryKey: ["reviewed-problems", userId],
    queryFn: () => fetchReviewedProblems(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
