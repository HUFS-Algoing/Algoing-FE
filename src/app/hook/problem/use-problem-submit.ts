import { useMutation } from "@tanstack/react-query";
import { problemSubmit, SubmitRequest } from "@/app/_api/problem/problemSubmit";

export const useProblemSubmit = () => {
  return useMutation({
    mutationFn: (payload: SubmitRequest) => problemSubmit(payload),
  });
};
