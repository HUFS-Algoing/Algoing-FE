"use client";

import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { Trophy, PieChart } from "lucide-react";
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

export function PerformanceChart({ userId }: Props) {
  const { data: solvedProblems = [] } = useSolvedProblems(userId);

  const tagMap = new Map<string, number>();
  solvedProblems.forEach((p) => {
    const tags = p.tag?.split(",").map((t) => t.trim()) || [];
    tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
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

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          많이 푼 태그 TOP 5
        </h3>
        <PieChart className="h-5 w-5 text-slate-400" />
      </div>

      <p className="text-sm text-slate-500 mb-4">총 {total}개 문제</p>

      <div className="flex flex-col items-center gap-6">
        {/* 파이 차트 */}
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
        {/* 범례 (가로 레이아웃) */}
        {/* 범례 (가로 레이아웃 + 가장 많이 푼 태그 강조) */}
        <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
          {chartData.map((entry, index) => {
            const isTopTag = index === 0;

            return (
              <div
                key={index}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-md shadow-sm
          ${isTopTag ? "bg-blue-100 border border-blue-300" : "bg-slate-50"}
        `}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span
                  className={`${
                    isTopTag
                      ? "text-blue-700 font-bold"
                      : "text-slate-800 font-medium"
                  }`}
                >
                  {entry.name}
                </span>
                <span className="text-slate-500">{entry.value}문제</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
