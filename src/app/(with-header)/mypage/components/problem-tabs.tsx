"use client";

import { motion } from "framer-motion";
import { Send, Code, Bookmark } from "lucide-react";

interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  solvedProblems: any[];
  reviewedProblems: any[];
  bookmarkedProblems: any[];
}

const getLanguageColor = (language: string) => {
  switch (language) {
    case "python":
      return "bg-blue-50 text-blue-800";
    case "javascript":
      return "bg-yellow-50 text-yellow-800";
    case "java":
      return "bg-orange-50 text-orange-800";
    case "node.js":
      return "bg-purple-50 text-purple-800";
    default:
      return "bg-gray-50 text-gray-800";
  }
};

export function ProblemTabs({
  activeTab,
  setActiveTab,
  solvedProblems,
  reviewedProblems,
  bookmarkedProblems,
}: ProblemTabsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <nav className="flex">
          <button
            onClick={() => setActiveTab("submitted")}
            className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
              activeTab === "submitted"
                ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              제출한 문제 ({solvedProblems.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("reviewed")}
            className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
              activeTab === "reviewed"
                ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              리뷰받은 문제 ({reviewedProblems.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("bookmarked")}
            className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
              activeTab === "bookmarked"
                ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              북마크한 문제 ({bookmarkedProblems.length})
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "submitted" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {solvedProblems.map((problem, index) => (
              <motion.div
                key={problem.submittedProblemId ?? `${problem.title}-${index}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1">
                    {problem.title}
                  </h4>
                  <span className="px-2 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200">
                    Lv. {problem.level}
                  </span>
                </div>

                {/* 태그 */}
                {/* {problem.tag && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {problem.tag.split(",").map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )} */}

                {/* 언어 / 제출일 */}
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-md font-medium ${getLanguageColor(problem.language)}`}
                  >
                    {problem.language}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {problem.submittedDate}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "reviewed" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {reviewedProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    문제 번호: {problem.problemNum}
                  </h4>
                  <span className="px-2 py-1 rounded-lg text-xs font-bold border bg-blue-100 text-blue-700 shadow-sm">
                    {problem.language}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {problem.summary}
                </p>

                <div className="text-xs text-gray-500 font-medium">
                  리뷰 일자:{" "}
                  {new Date(problem.createdAt).toLocaleDateString("ko-KR")}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "bookmarked" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bookmarkedProblems.map((problem, index) => (
              <motion.div
                key={problem.problemId}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-gray-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {problem.title}
                  </h4>
                  <div className="text-yellow-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.063 4.185a.563.563 0 00.424.307l4.605.669a.563.563 0 01.312.96l-3.33 3.245a.563.563 0 00-.162.498l.786 4.582a.563.563 0 01-.818.593l-4.115-2.163a.563.563 0 00-.523 0l-4.115 2.163a.563.563 0 01-.818-.593l.786-4.582a.563.563 0 00-.162-.498l-3.33-3.245a.563.563 0 01.312-.96l4.605-.669a.563.563 0 00.424-.307l2.063-4.185z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-sm text-gray-500">{problem.problemId}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
