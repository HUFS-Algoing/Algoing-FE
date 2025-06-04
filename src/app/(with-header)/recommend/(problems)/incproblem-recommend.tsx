"use client";

import { BookOpen, TrendingUp } from "lucide-react";
import Carousel from "../components/carousel";
import ProblemCard from "../components/problem-card";
import { useIncProblems } from "@/app/hook/recommend/use-incproblem";

export default function IncProblemSection() {
  const userId = 3; // TODO: 임시
  const { data: incProblems, isLoading, error } = useIncProblems(userId);

  return (
    <section className="mb-16">
      <div className="flex items-center mb-6">
        <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          많이 틀린 문제 유형 기반 추천
        </h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {isLoading ? (
          <div className="text-center text-gray-500 py-12">불러오는 중...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            문제 데이터를 불러오지 못했습니다.
          </div>
        ) : Array.isArray(incProblems) && incProblems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <TrendingUp className="h-12 w-12 mb-4 text-gray-300" />
            <p>추천 문제가 없습니다.</p>
          </div>
        ) : (
        <Carousel itemsPerPage={4}>
          {Array.isArray(incProblems) &&
            incProblems.map((problem: any) => (
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
