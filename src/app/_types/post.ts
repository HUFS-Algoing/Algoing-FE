// types/post.ts
export interface UserInfo {
  userId: number;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  handle: string;
  bojId: string;
  bio: string;
  picture: string;
  tier: number;
  solvedCount: number;
  userPoint: number;
  createdAt: string;
}

export interface SubmittedProblem {
  submittedProblemId: number;
  userId: number;
  problemId: number;
  title: string;
  answer: string;
  tag: string;
  level: number;
  language: string;
  submittedAt: string;
  submittedDate: string;
}

export interface PostDetail {
  postId: number;
  userId: number;
  title: string;
  content: string;
  language: string;
  userInfo: UserInfo;
  submittedProblem: SubmittedProblem;
}
