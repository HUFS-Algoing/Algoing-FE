"use client";

import ProblemCard from "../components/problem-card";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { colorVariants } from "./color-variants";

interface RecommendSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  problems: {
    problemId: number;
    title: string;
    tagNames: string;
    level: number;
  }[];
  color: "indigo" | "emerald" | "amber";
  emptyIcon: React.ReactNode;
  emptyTitle: string;
  emptyDescription: string;
}

function RecommendSection({
  title,
  description,
  icon,
  problems,
  color,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}: RecommendSectionProps) {
  const router = useRouter();
  const variant = colorVariants[color];

  if (!Array.isArray(problems)) return null;

  return (
    <section className="relative">
      <div
        className={`bg-gradient-to-br ${variant.gradient} rounded-2xl border ${variant.border} shadow-lg overflow-hidden`}
      >
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4 mb-3">
            <div className={`p-3 ${variant.iconBg} rounded-xl shadow-md`}>
              <div className="text-white">{icon}</div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {problems.length === 0 ? (
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-white/50 dark:border-gray-700/50 p-8 text-center">
              <div
                className={`inline-flex p-4 ${variant.emptyBg} rounded-full mb-4`}
              >
                <div className={variant.emptyIconColor}>{emptyIcon}</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {emptyTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                {emptyDescription}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {problems.map((problem, index) => (
                <div
                  key={problem.problemId}
                  className="transform transition-all duration-300 hover:shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProblemCard
                    id={problem.problemId}
                    title={problem.title}
                    level={problem.level ?? 1}
                    tags={problem.tagNames?.split(",") ?? []}
                    isSolved={false}
                    onClick={() => router.push(`/code/${problem.problemId}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(RecommendSection);
