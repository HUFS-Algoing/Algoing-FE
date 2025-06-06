import { useQuery } from "@tanstack/react-query";
import { getMyInfo, MyInfoResponse } from "@/app/_api/user/getMyInfo";

export const useMyInfo = () => {
  return useQuery<MyInfoResponse, Error>({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    retry: false,
  });
};
