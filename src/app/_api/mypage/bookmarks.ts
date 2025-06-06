import { apiGet } from "../methods";

export interface BookmarkedProblem {
  bookMarkId: number;
  userId: number;
  problemId: number;
  title: string;
}

export const fetchBookmarkedProblems = (userId: number) => {
  return apiGet<BookmarkedProblem[]>(`/user/${userId}/bookmarks`);
};
