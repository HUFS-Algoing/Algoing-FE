"use client";

import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProgressFromSolvedProps {
  userId: number;
  totalProblems?: number; // 전체 문제 수, 기본값 100
  className?: string;
}

export default function ProgressFromSolved({
  userId,
  totalProblems = 100,
  className = "",
}: ProgressFromSolvedProps) {
  const { data, isLoading } = useSolvedProblems(userId);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (data && totalProblems > 0) {
      const ratio = Math.min((data.length / totalProblems) * 100, 100);
      setProgress(Math.round(ratio));
    }
  }, [data, totalProblems]);

  return (
    <>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 mb-2">
        {isLoading ? "로딩 중..." : `${data?.length ?? 0} 문제 해결`}
      </p>
      <div
        className={`relative w-full h-[8px] rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-700 shadow-inner ${className}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 dark:from-purple-600 dark:via-pink-500 dark:to-indigo-600 relative"
        >
          <div className="absolute inset-0 bg-white/20 w-full h-full bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent_100%)]" />
        </motion.div>
      </div>
    </>
  );
}
