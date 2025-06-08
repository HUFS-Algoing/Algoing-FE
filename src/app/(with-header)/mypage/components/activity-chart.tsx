"use client";

import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ActivityData {
  date: string; // "2025-06-08"
  count: number; // 문제 수
  day: string; // 요일 (예: "월")
}

export default function ActivityChart({
  activityData,
}: {
  activityData: ActivityData[];
}) {
  const maxCount = Math.max(...activityData.map((d) => d.count));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          주간 활동
        </h3>
        <div className="text-sm text-gray-500">최근 7일</div>
      </div>

      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {[0, 1, 2, 3].map((line) => (
            <line
              key={line}
              x1="40"
              y1={40 + line * 40}
              x2="380"
              y2={40 + line * 40}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
          ))}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path
            d={`M 40 ${200 - (activityData[0].count / maxCount) * 120 - 40} ${activityData
              .map(
                (point, index) =>
                  `L ${40 + index * 50} ${200 - (point.count / maxCount) * 120 - 40}`
              )
              .join(" ")} L 390 160 L 40 160 Z`}
            fill="url(#areaGradient)"
          />
          <path
            d={`M 40 ${200 - (activityData[0].count / maxCount) * 120 - 40} ${activityData
              .map(
                (point, index) =>
                  `L ${40 + index * 50} ${200 - (point.count / maxCount) * 120 - 40}`
              )
              .join(" ")}`}
            stroke="#6366f1"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {activityData.map((point, index) => {
            const x = 40 + index * 50;
            const y = 200 - (point.count / maxCount) * 120 - 40;
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#6366f1"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx={x} cy={y} r="3" fill="white" />
              </g>
            );
          })}
          {activityData.map((point, index) => (
            <text
              key={index}
              x={40 + index * 50}
              y="190"
              textAnchor="middle"
              className="text-xs fill-gray-500"
            >
              {point.day}
            </text>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          총 {activityData.reduce((sum, d) => sum + d.count, 0)} 문제 해결
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-indigo-500 rounded-full" /> 문제 수
        </span>
      </div>
    </motion.div>
  );
}
