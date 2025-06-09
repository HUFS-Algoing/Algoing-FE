import axiosInstance from "@/app/_api/instance";
import { ProblemDetailResponse } from "@/app/_types/problems";

export type { ProblemDetailResponse };

export const getProblemDetail = async (
  problemId: number
): Promise<ProblemDetailResponse> => {
  const res = await axiosInstance.get(`/problems/${problemId}`);
  return res.data.result;
};
