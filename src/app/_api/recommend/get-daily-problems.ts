import { TierBasedRecommendResponse } from "@/app/_types/recommend";
import { apiGet } from "../methods";

export const getTierBasedRecommend = async (userId: number) => {
  return apiGet<TierBasedRecommendResponse>(`/recommend/daily/${userId}`);
};
