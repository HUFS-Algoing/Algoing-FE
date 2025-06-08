import { getProblemDetail } from "@/app/_api/problem/problemInfo";
import { useQuery } from "@tanstack/react-query";

export const useProblemDetail = (problemId: number) =>
  useQuery({
    queryKey: ["problem", problemId],
    queryFn: () => getProblemDetail(problemId),
    enabled: !!problemId,
  });
