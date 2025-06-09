"use client";

import { motion } from "framer-motion";
import { Send, Code, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

type StatsCardsProps = {
  solvedCount: number;
  reviewedCount: number;
  bookmarkedCount: number;
  onClickTab: (tab: string) => void;
};

export default function StatsCards({
  solvedCount,
  reviewedCount,
  bookmarkedCount,
  onClickTab,
}: StatsCardsProps) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        onClick={() => onClickTab("submitted")}
        className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-emerald-700 font-semibold">제출한 문제</h3>
            <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
              <Send className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-900 mb-2">
            {solvedCount}개
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={() => {
          onClickTab("reviewed");
          router.push("/ai-review");
        }}
        className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-purple-700 font-semibold">리뷰받은 문제</h3>
            <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
              <Code className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-900 mb-2">
            {reviewedCount}개
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => onClickTab("bookmarked")}
        className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      >
        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-700 font-semibold">북마크한 문제</h3>
            <div className="p-2 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
              <Bookmark className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-900 mb-2">
            {bookmarkedCount}개
          </div>
        </div>
      </motion.div>
    </div>
  );
}
