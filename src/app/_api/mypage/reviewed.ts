import { apiGet } from "../methods";

export interface ReviewedProblem {
  id: number;
  userId: number;
  problemNum: number;
  summary: string;
  createdAt: string;
  code: string;
  language: string;
}

export const fetchReviewedProblems = (userId: number) => {
  return apiGet<ReviewedProblem[]>(`/user/${userId}/reviewed`);
};
