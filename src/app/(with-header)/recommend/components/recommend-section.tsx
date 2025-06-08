"use client";

import ProblemCard from "../components/problem-card";
import Carousel from "../components/carousel";
import { useRouter } from "next/navigation";

interface RecommendSectionProps {
  title: string;
  icon: React.ReactNode;
  problems: {
    problemId: number;
    title: string;
    tag: string;
    level: number;
  }[];
}

export function RecommendSection({
  title,
  icon,
  problems,
}: RecommendSectionProps) {
  const router = useRouter();
  if (!Array.isArray(problems)) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center mb-6">
        <div className="text-indigo-600 mr-2">{icon}</div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {problems.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            추천 문제가 없습니다.
          </div>
        ) : (
          <Carousel itemsPerPage={4}>
            {problems.map((problem) => (
              <ProblemCard
                key={problem.problemId}
                id={problem.problemId}
                title={problem.title}
                level={problem.level ?? 1}
                tags={problem.tag?.split(",") ?? []}
                isSolved={false}
                onClick={() => router.push(`/code/${problem.problemId}`)}
              />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}
