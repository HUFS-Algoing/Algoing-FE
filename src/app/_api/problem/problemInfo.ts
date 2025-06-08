import axiosInstance from "@/app/_api/instance";

export interface ProblemDetailResponse {
  problemId: number;
  title: string;
  description: string;
  input: string;
  output: string;
  sampleInput1: string;
  sampleInput2: string;
  sampleOutput1: string;
  sampleOutput2: string;
  tag: string;
  tagNames: string;
  time: string;
  memory: string;
  level: number;
  limit: string;
}

export const getProblemDetail = async (
  problemId: number
): Promise<ProblemDetailResponse> => {
  const res = await axiosInstance.get(`/problems/${problemId}`);
  return res.data.result;
};
