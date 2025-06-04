import { apiGet } from "../methods";
export interface WeaknessProblem {
  problemId: number;
  title: string;
  tag: string;
  finalScore: number;
}

export interface WeaknessResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: WeaknessProblem[];
}

export const getWeaknessProblems = async (userId: number) => {
  return apiGet<WeaknessResponse>(`/recommend/weakness/${userId}`);
};
