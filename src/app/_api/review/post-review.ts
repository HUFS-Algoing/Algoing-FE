import axiosInstance from "../instance";

export interface ReviewRequest {
  userId: number;
  problemNum: number;
  language: string;
  code: string;
}

export interface ReviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    summary: string;
  };
}
export const requestReview = async ({
  userId,
  ...body
}: ReviewRequest): Promise<ReviewResponse> => {
  const response = await axiosInstance.post("/reviews", body, {
    params: { userId },
  });
  return response.data;
};
