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

export interface RecommendationItem {
  problemId: number;
  title: string;
  tag: string;
  level: number;
}

export interface DailyRecommendation extends RecommendationItem {
  score: number;
}

export interface WeaknessRecommendation extends RecommendationItem {
  finalScore: number;
}
export interface AllRecommendationsResponse {
  recommendationSessionId: any;
  dailyRecommendations: any[];
  incProblemRecommendations: any[];
  weaknessRecommendations: any[];
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    recommendationSessionId: string;
    dailyRecommendations: DailyRecommendation[];
    incProblemRecommendations: IncProblem[];
    weaknessRecommendations: WeaknessRecommendation[];
  };
}
