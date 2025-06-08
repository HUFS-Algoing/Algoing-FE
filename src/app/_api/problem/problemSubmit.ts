import axiosInstance from "../instance";

export interface SubmitRequest {
  userId: number;
  problemNum: number;
  language: string;
  code: string;
}

export const problemSubmit = async (payload: SubmitRequest) => {
  const response = await axiosInstance.post(`/submit`, payload);
  return response.data;
};
