import { searchProblems } from "@/app/_api/problem/search";
import { useQuery } from "@tanstack/react-query";

export const useSearchProblems = (keyword: string, enabled: boolean) => {
  const shouldFetch = enabled && keyword.trim().length > 0;

  return useQuery({
    queryKey: ["search-problems", keyword],
    queryFn: () => searchProblems(keyword),
    enabled: shouldFetch,
    staleTime: 1000 * 60, // 1분간 캐시 유지
    retry: false, // 검색 실패 시 재시도 안함
  });
};
