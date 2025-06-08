import { useMutation } from "@tanstack/react-query";
import { recommendClick } from "@/app/_api/recommend/post-recommend-click";

interface ClickLogPayload {
  userId: number;
  problemId: number;
  sessionId: string;
}

export const useLogProblemClick = () => {
  return useMutation({
    mutationFn: (payload: ClickLogPayload) => recommendClick(payload),
  });
};
