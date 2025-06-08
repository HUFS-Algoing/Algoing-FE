"use client";

import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { Trophy, Award } from "lucide-react";
import { motion } from "framer-motion";

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

  const tagColors = [
    { color: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50" },
    { color: "from-blue-400 to-blue-600", bg: "bg-blue-50" },
    { color: "from-amber-400 to-amber-600", bg: "bg-amber-50" },
    { color: "from-pink-400 to-pink-600", bg: "bg-pink-50" },
    { color: "from-purple-400 to-purple-600", bg: "bg-purple-50" },
    { color: "from-orange-400 to-orange-600", bg: "bg-orange-50" },
    { color: "from-red-400 to-red-600", bg: "bg-red-50" },
  ];

  const chartData = sortedTags.map(([tag, count], index) => {
    const colorSet = tagColors[index % tagColors.length];
    return {
      tag,
      solved: count,
      color: colorSet.color,
      bgColor: colorSet.bg,
    };
  });

  //  가장 많이 푼 태그의 수 → 상대 퍼센트 기준
  const maxSolved = Math.max(...chartData.map((d) => d.solved));

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          많이 푼 태그 TOP 5
        </h3>
        <Award className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {chartData.map((item, index) => (
          <motion.div
            key={item.tag}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`flex items-center gap-4 p-3 rounded-xl ${item.bgColor} border border-gray-100`}
          >
            <span className="text-sm font-semibold text-gray-700 w-24 truncate">
              {item.tag}
            </span>

            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width:
                    maxSolved > 0
                      ? `${(item.solved / maxSolved) * 100}%`
                      : "0%",
                }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                className={`bg-gradient-to-r ${item.color} h-3 rounded-full shadow-sm`}
              />
            </div>

            <span className="text-sm font-bold text-gray-700 w-10 text-right">
              {item.solved}
            </span>
            <span className="text-xs text-gray-500 w-10 text-right">
              {maxSolved > 0 ? Math.round((item.solved / maxSolved) * 100) : 0}%
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
