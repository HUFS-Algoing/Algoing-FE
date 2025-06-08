"use client";

import { useAllRecommendations } from "@/app/hook/recommend/use-all-recommend";
import { Award } from "lucide-react";
import { useRouter } from "next/navigation";
export default function RecommendedProblems() {
  const userId = 3;
  const {
    data: recommendationData,
    isLoading,
    error,
  } = useAllRecommendations(userId ?? 0);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-12">
        추천 문제 불러오는 중...
      </div>
    );
  }

  if (error || !recommendationData) {
    return (
      <div className="text-center text-red-500 py-12">
        추천 문제를 불러오지 못했습니다.
      </div>
    );
  }

  const problems = recommendationData?.dailyRecommendations ?? [];

  if (problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <Award className="h-12 w-12 mb-4 text-gray-300" />
        <p>추천 문제가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {problems.map((problem) => (
        <div
          key={problem.problemId}
          onClick={() => router.push(`/code/${problem.problemId}`)}
          className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-2 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {problem.level}{" "}
            </span>
            <span className="text-xs text-purple-500 dark:text-purple-400 font-semibold">
              +{problem.score} EXP
            </span>
          </div>

          <p className="text-sm font-semibold mt-1 truncate">
            {problem.problemId}. {problem.title}
          </p>
        </div>
      ))}
    </div>
  );
}
