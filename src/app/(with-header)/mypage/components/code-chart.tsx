"use client";

import { BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

interface CodeStatData {
  readbility: number;
  optimization: number;
  duplicate: number;
  normalizedReadbility: number;
  normalizedOptimization: number;
  normalizedDuplicate: number;
  createdAt: string;
}

export default function CodeAnalysisChart({
  data = [],
}: {
  data: CodeStatData[];
}) {
  const [, setHovered] = useState<null | number>(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
        <div className="p-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-slate-900">
              코드 품질 분석
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">데이터가 없습니다</p>
        </div>
        <div className="p-4 h-[300px] flex items-center justify-center text-slate-400">
          아직 분석된 코드가 없습니다
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("ko-KR", {
      month: "numeric",
      day: "numeric",
    }),
    가독성: item.normalizedReadbility,
    최적화: item.normalizedOptimization,
    중복도: item.normalizedDuplicate,
  }));

  const calculateAverageStats = (key: keyof (typeof chartData)[0]) => {
    const values = chartData.map((item) => item[key] as number);
    const average = values.reduce((acc, cur) => acc + cur, 0) / values.length;
    return { average };
  };

  const readabilityStats = calculateAverageStats("가독성");
  const optimizationStats = calculateAverageStats("최적화");
  const duplicateStats = calculateAverageStats("중복도");

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
      <div className="p-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-slate-900">
            코드 품질 분석
          </h2>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          시간에 따른 코드 품질 변화 (전체 평균 기준)
        </p>
      </div>

      <div className="p-4 space-y-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseMove={(state) => {
              if (state && state.activeTooltipIndex !== undefined) {
                setHovered(state.activeTooltipIndex);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="가독성"
              stroke="#6366f1"
              strokeWidth={2}
              dot
            />
            <Line
              type="monotone"
              dataKey="최적화"
              stroke="#10b981"
              strokeWidth={2}
              dot
            />
            <Line
              type="monotone"
              dataKey="중복도"
              stroke="#f59e0b"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">가독성 (평균)</div>
            <div className="font-semibold text-indigo-600">
              {readabilityStats.average.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">최적화 (평균)</div>
            <div className="font-semibold text-emerald-600">
              {optimizationStats.average.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">중복도 (평균)</div>
            <div className="font-semibold text-amber-600">
              {duplicateStats.average.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
