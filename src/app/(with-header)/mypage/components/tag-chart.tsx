"use client";

import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { Trophy, PieChart, Target, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  userId: number;
}

export default function PerformanceChart({ userId }: Props) {
  const { data: solvedProblems = [], isLoading } = useSolvedProblems(userId);

  const tagMap = new Map<string, number>();
  solvedProblems.forEach((p) => {
    const tags = p.tag?.split(",").map((t) => t.trim()) || [];
    tags.forEach((tag) => {
      if (tag) {
        // 빈 태그 제외
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      }
    });
  });

  const sortedTags = [...tagMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const chartData = sortedTags.map(([tag, count]) => ({
    name: tag,
    value: count,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (isLoading) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              많이 푼 태그 TOP 5
            </span>
          </div>
          <PieChart className="h-5 w-5 text-slate-400" />
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <PieChart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            데이터를 불러오고 있어요...
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            잠시만 기다려주세요
          </p>
        </div>
      </motion.div>
    );
  }

  if (solvedProblems.length === 0 || chartData.length === 0) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              많이 푼 태그 TOP 5
            </span>
          </div>
          <PieChart className="h-5 w-5 text-slate-400" />
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            {solvedProblems.length === 0 ? (
              <BookOpen className="h-8 w-8 text-gray-400" />
            ) : (
              <Target className="h-8 w-8 text-gray-400" />
            )}
          </div>

          {solvedProblems.length === 0 ? (
            <>
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                아직 해결한 문제가 없어요
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                문제를 풀어보시면 태그별 통계를 확인할 수 있어요!
              </p>
            </>
          ) : (
            <>
              <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                태그 정보가 없는 문제들이에요
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                해결한 {solvedProblems.length}개 문제에 태그가 설정되지 않았어요
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  📊 태그가 있는 문제를 풀면 통계가 표시됩니다
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            많이 푼 태그 TOP 5
          </span>
        </div>
        <PieChart className="h-5 w-5 text-slate-400" />
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        총 {total}개 문제
      </p>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-xs">
          <ResponsiveContainer width="100%" height={240}>
            <RePieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </RePieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
          {chartData.map((entry, index) => {
            const isTopTag = index === 0;

            return (
              <div
                key={index}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md shadow-sm
          ${
            isTopTag
              ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
              : "bg-slate-50 dark:bg-slate-700"
          }
        `}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span
                  className={`${
                    isTopTag
                      ? "text-blue-700 dark:text-blue-300 font-bold"
                      : "text-slate-800 dark:text-slate-200 font-medium"
                  }`}
                >
                  {entry.name}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {entry.value}문제
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
