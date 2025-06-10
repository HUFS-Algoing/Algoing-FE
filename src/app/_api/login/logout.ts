import axiosInstance from "../instance";

export const logoutApi = async (): Promise<void> => {
  const response = await axiosInstance.post<void>(
    "/logout",
    {},
    { validateStatus: (status) => status >= 200 && status < 400 }
  );

  if (response.status >= 400) {
    throw new Error(`로그아웃 실패: HTTP ${response.status}`);
  }
};
