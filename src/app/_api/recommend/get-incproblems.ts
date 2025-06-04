import { IncProblemResponse } from "../../_types/recommend";
import { apiGet } from "../methods";

export const getIncProblems = async (userId: number) => {
  return apiGet<IncProblemResponse>(`/recommend/incproblem/${userId}`);
};
