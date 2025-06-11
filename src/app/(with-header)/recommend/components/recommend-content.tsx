"use client";

import IntroSection from "./intro-section";
import { useAllRecommendations } from "@/app/hook/recommend/use-all-recommend";
import { PageLoading } from "@/app/_components/loading";
import {
  BookOpen,
  Code,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Suspense, lazy } from "react";
import { useUserStore } from "@/app/_store/use-userStore";

export default function RecommendationContent() {
  const { userId, nickname } = useUserStore();
  const { data: recommendationData, isLoading } = useAllRecommendations(
    userId ?? 0
  );

  const daily = recommendationData?.dailyRecommendations ?? [];
  const inc = recommendationData?.incProblemRecommendations ?? [];
  const weak = recommendationData?.weaknessRecommendations ?? [];
  const RecommendSection = lazy(() => import("./recommend-section"));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <IntroSection
        username={nickname}
        level={1}
        profileImage=""
        streak={0}
        totalPoints={0}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <PageLoading />
        ) : (
          <Suspense fallback={<PageLoading />}>
            <div className="space-y-12">
              <RecommendSection
                title="티어 기반 맞춤 추천 문제"
                description="현재 실력에 맞는 도전적인 문제들"
                icon={<Sparkles className="h-6 w-6" />}
                problems={daily.slice(0, 3)}
                color="indigo"
                emptyIcon={<Target className="h-12 w-12" />}
                emptyTitle="맞춤 추천 문제가 준비 중이에요"
                emptyDescription="더 많은 문제를 풀어보시면 정확한 추천을 받을 수 있어요"
              />
              <RecommendSection
                title="많이 틀린 문제 유형 기반 추천"
                description="약점을 보완할 수 있는 문제들"
                icon={<TrendingUp className="h-6 w-6" />}
                problems={inc.slice(0, 3)}
                color="emerald"
                emptyIcon={<BookOpen className="h-12 w-12" />}
                emptyTitle="아직 틀린 문제가 없어요"
                emptyDescription="다양한 문제에 도전해보시면 개선점을 찾아드릴게요"
              />
              <RecommendSection
                title="약점을 보완할 문제들이에요"
                description="부족한 영역을 강화하는 문제들"
                icon={<Zap className="h-6 w-6" />}
                problems={weak.slice(0, 3)}
                color="amber"
                emptyIcon={<Code className="h-12 w-12" />}
                emptyTitle="약점 분석이 진행 중이에요"
                emptyDescription="더 많은 데이터가 쌓이면 정확한 분석을 제공해드릴게요"
              />
            </div>
          </Suspense>
        )}
      </main>
    </div>
  );
}
