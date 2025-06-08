import { useMutation } from "@tanstack/react-query";
import { requestReview, ReviewRequest } from "@/app/_api/review/post-review";

export const useCodeReview = () => {
  return useMutation({
    mutationFn: (payload: ReviewRequest) => requestReview(payload),
  });
};
