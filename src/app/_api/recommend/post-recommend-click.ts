import axiosInstance from "../instance";

export const recommendClick = async ({
  userId,
  problemId,
  sessionId,
}: {
  userId: number;
  problemId: number;
  sessionId: string;
}) => {
  return axiosInstance.post("/recommend/click", null, {
    params: {
      userId,
      problemId,
      sessionId,
    },
  });
};
