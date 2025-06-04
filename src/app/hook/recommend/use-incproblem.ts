import { getIncProblems } from "../../_api/recommend/get-incproblems";
import { useQuery } from "@tanstack/react-query";

export const useIncProblems = (userId: number) => {
  return useQuery({
    queryKey: ["incProblems", userId],
    queryFn: () => getIncProblems(userId),
    enabled: !!userId,
  });
};
