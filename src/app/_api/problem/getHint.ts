import axiosInstance from "../instance";

export interface HintResponse {
  content: string;
  order: number;
}

export const getHint = async (
  problemId: number,
  hintOrder: number,
  userId: number
): Promise<HintResponse> => {
  const res = await axiosInstance.get(
    `/problems/${problemId}/hints/${hintOrder}`,
    {
      params: { userId },
    }
  );
  return res.data.result;
};
