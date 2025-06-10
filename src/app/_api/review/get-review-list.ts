import { apiGet } from "../methods";

export interface ReviewedProblem {
  id: number;
  userId: number;
  problemNum: number;
  summary: string;
  createdAt: string;
  code: string;
  language: string;
  level?: number;
}

export interface ReviewedResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ReviewedProblem[];
}

export const getReviewedList = async (
  userId: number
): Promise<ReviewedProblem[]> => {
  return apiGet<ReviewedProblem[]>(`/user/${userId}/reviewed`);
};
