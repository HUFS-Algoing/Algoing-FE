"use client";

import {
  BookmarkedProblem,
  fetchBookmarkedProblems,
} from "@/app/_api/mypage/bookmarks";
import { useQuery } from "@tanstack/react-query";

export const useBookmarkedProblems = (userId: number) => {
  return useQuery<BookmarkedProblem[]>({
    queryKey: ["bookmarked-problems", userId],
    queryFn: () => fetchBookmarkedProblems(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
