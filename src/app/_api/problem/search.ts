import { ProblemSearchResponse } from "@/app/_types/problems";
import { apiGet } from "../methods";
export const searchProblems = (keyword: string) => {
  return apiGet<ProblemSearchResponse>(
    `/problems/search?keyword=${encodeURIComponent(keyword)}`
  );
};
