import {
  getReviewedList,
  ReviewedProblem,
} from "@/app/_api/review/get-review-list";
import { useQuery } from "@tanstack/react-query";

export const useReviewedProblems = (userId: number) => {
  return useQuery<ReviewedProblem[]>({
    queryKey: ["reviewed-problems", userId],
    queryFn: () => getReviewedList(userId),
    enabled: !!userId,
  });
};
