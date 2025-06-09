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

  // 날짜별 그룹화 및 평균 처리
  const grouped: Record<string, CodeStatData[]> = {};
  for (const item of data) {
    const dateKey = new Date(item.createdAt).toISOString().split("T")[0];
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(item);
  }

  const averagedData = Object.entries(grouped).map(([dateKey, items]) => {
    const total = items.reduce(
      (acc, cur) => {
        acc.readability += cur.normalizedReadbility;
        acc.optimization += cur.normalizedOptimization;
        acc.duplicate += cur.normalizedDuplicate;
        return acc;
      },
      { readability: 0, optimization: 0, duplicate: 0 }
    );
    const count = items.length;
    return {
      date: new Date(dateKey).toLocaleDateString("ko-KR", {
        month: "numeric",
        day: "numeric",
      }),
      가독성: parseFloat((total.readability / count).toFixed(2)),
      최적화: parseFloat((total.optimization / count).toFixed(2)),
      중복도: parseFloat((total.duplicate / count).toFixed(2)),
    };
  });

  // 최신 날짜 기준 정렬 및 8개 제한
  const chartData = averagedData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)
    .reverse();

  // 평균 계산
  const calculateAverageStats = (key: keyof (typeof chartData)[0]) => {
    const values = chartData.map((item) => item[key] as number);
    const average = values.reduce((acc, cur) => acc + cur, 0) / values.length;
    return { average: parseFloat(average.toFixed(2)) };
  };

  const readabilityStats = calculateAverageStats("가독성");
  const optimizationStats = calculateAverageStats("최적화");
  const duplicateStats = calculateAverageStats("중복도");

  // 전날 대비 변화량 계산
  const getDelta = (key: keyof (typeof chartData)[0]) => {
    if (chartData.length < 2) return "0.00";
    const last = chartData[chartData.length - 1][key] as number;
    const prev = chartData[chartData.length - 2][key] as number;
    const delta = last - prev;
    const sign = delta > 0 ? "+" : delta < 0 ? "" : "";
    return `${sign}${delta.toFixed(2)}`;
  };

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
          최근 분석 결과의 일별 평균 추이
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

        {/* 변화량 및 평균 표시 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">가독성 (평균)</div>
            <div className="font-semibold text-indigo-600">
              {readabilityStats.average}{" "}
              <span className="text-xs text-slate-400">
                ({getDelta("가독성")})
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">최적화 (평균)</div>
            <div className="font-semibold text-emerald-600">
              {optimizationStats.average}{" "}
              <span className="text-xs text-slate-400">
                ({getDelta("최적화")})
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center p-2 rounded-lg bg-slate-50">
            <div className="text-xs text-slate-500 mb-1">중복도 (평균)</div>
            <div className="font-semibold text-amber-600">
              {duplicateStats.average}{" "}
              <span className="text-xs text-slate-400">
                ({getDelta("중복도")})
              </span>
            </div>
          </div>
        </div>

        {/* 품질 경고 메시지 */}
        {duplicateStats.average > 60 && (
          <p className="text-sm text-red-500 text-center mt-2">
            ⚠️ 중복도가 높습니다. 코드 리팩토링을 고려해보세요.
          </p>
        )}
      </div>
    </div>
  );
}
