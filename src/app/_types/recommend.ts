export interface IncProblem {
  problemId: number;
  title: string;
  tag: string;
}

export interface IncProblemResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: IncProblem[];
}
export interface TierBasedRecommend {
  problemId: number;
  title: string;
  level: number;
  tag: string;
  score: number;
}

export interface TierBasedRecommendResponse {
  length: number;
  isSuccess: boolean;
  code: string;
  message: string;
  result: TierBasedRecommend[];
}
