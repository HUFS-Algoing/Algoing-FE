import axiosInstance from "../instance";

export const logoutApi = async (): Promise<void> => {
  const response = await axiosInstance.post<void>(
    "/logout",
    {},
    { validateStatus: () => true }
  );

  if (response.status !== 200) {
    throw new Error(`로그아웃 실패:  ${response.status}`);
  }
};
