"use client";

import { useState } from "react";
import IntroSection from "./intro-section";
import { useAllRecommendations } from "@/app/hook/recommend/use-all-recommend";
import { PageLoading } from "@/app/_components/loading";
import { RecommendSection } from "./recommend-section";
import { BookOpen, Code, Sparkles } from "lucide-react";

export default function RecommendationContent() {
  const [showSolved, setShowSolved] = useState(false);
  const userId = 3;
  const { data: recommendationData, isLoading } = useAllRecommendations(
    userId ?? 0
  );

  const daily = recommendationData?.dailyRecommendations ?? [];
  const inc = recommendationData?.incProblemRecommendations ?? [];
  const weak = recommendationData?.weaknessRecommendations ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <IntroSection
        // username={userId}
        level={1}
        profileImage=""
        streak={0}
        totalPoints={0}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end items-center mb-8">
          <span className="text-sm text-gray-600 mr-2">풀었던 문제 보기</span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              showSolved ? "bg-indigo-600" : "bg-gray-200"
            }`}
            onClick={() => setShowSolved(!showSolved)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showSolved ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <>
          {isLoading ? (
            <PageLoading />
          ) : (
            <>
              <RecommendSection
                title="티어 기반 맞춤 추천 문제"
                icon={<Sparkles className="h-6 w-6" />}
                problems={daily}
              />
              <RecommendSection
                title="많이 틀린 문제 유형 기반 추천"
                icon={<BookOpen className="h-6 w-6" />}
                problems={inc}
              />
              <RecommendSection
                title="약점을 보완할 문제들이에요"
                icon={<Code className="h-6 w-6" />}
                problems={weak}
              />
            </>
          )}
        </>
      </main>
    </div>
  );
}
