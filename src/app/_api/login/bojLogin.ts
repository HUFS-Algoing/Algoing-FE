import axiosInstance from "../instance";

export interface BOJInfo {
  bojId: string;
  bojPassword: string;
}

export const postBOJ = async (data: BOJInfo) => {
  const res = await axiosInstance.post(`/insertboj`, data);
  return res.data;
};
