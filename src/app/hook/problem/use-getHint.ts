import { useQuery } from "@tanstack/react-query";
import { getHint } from "@/app/_api/problem/getHint";

export const useHint = (
  problemId: number,
  hintOrder: number,
  userId: number
) => {
  return useQuery({
    queryKey: ["hint", problemId, hintOrder, userId],
    queryFn: () => getHint(problemId, hintOrder, userId),
    enabled: false,
  });
};
