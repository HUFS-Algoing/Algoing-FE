import axiosInstance from "@/app/_api/instance";

export interface MyInfoResponse {
  userId: number;
  email: string;
  name: string;
  role: string;
  handle: string;
  bojId: string;
  bio: string;
  picture: string;
  tier: number;
  solvedCount: number;
  userPoint: number;
  createdAt: string;
}

export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const res = await axiosInstance.get("/myinfo");
  return res.data.result;
};
