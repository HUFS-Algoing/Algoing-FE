"use client";

import { Sparkles } from "lucide-react";
import Carousel from "../components/carousel";
import ProblemCard from "../components/problem-card";
import { useTierBasedRecommend } from "@/app/hook/recommend/use-tier-based";

export default function TierBasedRecommendSection() {
  const userId = 3; // TODO: 실제 로그인 사용자 ID로 교체 필요
  const { data, isLoading, error } = useTierBasedRecommend(userId);

  return (
    <section className="mb-16">
      <div className="flex items-center mb-6">
        <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-900">
          티어 기반 맞춤 추천 문제들이에요
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center text-gray-500 py-12">불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            문제 데이터를 불러오지 못했습니다.
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            추천 문제가 없습니다.
          </div>
        ) : (
          <Carousel itemsPerPage={4}>
            {Array.isArray(data) &&
              data.map((problem: any) => (
                <ProblemCard
                  key={problem.problemId}
                  id={problem.problemId}
                  title={problem.title}
                  level={1}
                  tags={problem.tag.split(",")}
                  isSolved={false}
                />
              ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}
