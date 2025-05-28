"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Clock,
  Award,
  FileCode,
  CheckCircle,
  XCircle,
  Calendar,
  Code,
  Hash,
  Tag,
} from "lucide-react";

// Types
interface AIReview {
  id: number;
  title: string;
  date: string;
  status: "completed" | "in-progress" | "failed";
  difficulty?: number;
  tags?: string[];
  baekjoonTier?: string;
  problemNumber?: string;
  algorithmType?: string;
  isHighlighted?: boolean;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export default function AICodeReviewList() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Mock data for AI reviews
  const mockReviews: AIReview[] = [
    {
      id: 1,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "completed",
      baekjoonTier: "골드 3",
      problemNumber: "1753",
      algorithmType: "다익스트라",
      timeComplexity: "O(E log V)",
      spaceComplexity: "O(V + E)",
    },
    {
      id: 2,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "completed",
      baekjoonTier: "실버 1",
      problemNumber: "1920",
      algorithmType: "이분 탐색",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 3,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "completed",
      baekjoonTier: "플래티넘 5",
      problemNumber: "1786",
      algorithmType: "KMP",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(m)",
    },
    {
      id: 4,
      title: "생일파티 길찾기",
      date: "2025.03.05",
      status: "completed",
      difficulty: 3,
      tags: ["알고리즘", "그래프"],
      baekjoonTier: "골드 4",
      problemNumber: "1238",
      algorithmType: "다익스트라",
      isHighlighted: true,
      timeComplexity: "O(E log V)",
      spaceComplexity: "O(V + E)",
    },
    {
      id: 5,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "failed",
      baekjoonTier: "실버 2",
      problemNumber: "1654",
      algorithmType: "이분 탐색",
    },
    {
      id: 6,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "completed",
      difficulty: 3,
      baekjoonTier: "골드 5",
      problemNumber: "7576",
      algorithmType: "BFS",
      timeComplexity: "O(n × m)",
      spaceComplexity: "O(n × m)",
    },
    {
      id: 7,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "in-progress",
      baekjoonTier: "실버 3",
      problemNumber: "1463",
      algorithmType: "DP",
    },
    {
      id: 8,
      title: "공지사항입니다아퍼저씨짜구어머구",
      date: "2025.03.05",
      status: "completed",
      baekjoonTier: "골드 2",
      problemNumber: "1167",
      algorithmType: "트리, DFS",
      timeComplexity: "O(V + E)",
      spaceComplexity: "O(V + E)",
    },
  ];

  const filterOptions = [
    { id: "all", label: "전체", icon: <Filter className="h-4 w-4" /> },
    {
      id: "completed",
      label: "완료됨",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    { id: "in-progress", label: "진행중", icon: <Clock className="h-4 w-4" /> },
    { id: "failed", label: "실패", icon: <XCircle className="h-4 w-4" /> },
    { id: "gold", label: "골드 이상", icon: <Award className="h-4 w-4" /> },
  ];

  const filteredReviews = mockReviews.filter((review) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "completed") return review.status === "completed";
    if (selectedFilter === "in-progress")
      return review.status === "in-progress";
    if (selectedFilter === "failed") return review.status === "failed";
    if (selectedFilter === "gold")
      return (
        review.baekjoonTier?.includes("골드") ||
        review.baekjoonTier?.includes("플래티넘") ||
        review.baekjoonTier?.includes("다이아")
      );
    return true;
  });

  // Default to recent sorting
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalPages = Math.ceil(sortedReviews.length / 10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "in-progress":
        return <Clock className="h-4 w-4 mr-1" />;
      case "failed":
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getTierColor = (tier: string) => {
    if (tier.includes("브론즈")) return "text-amber-700 bg-amber-100";
    if (tier.includes("실버")) return "text-gray-700 bg-gray-200";
    if (tier.includes("골드")) return "text-yellow-700 bg-yellow-100";
    if (tier.includes("플래티넘")) return "text-teal-700 bg-teal-100";
    if (tier.includes("다이아")) return "text-cyan-700 bg-cyan-100";
    if (tier.includes("루비")) return "text-red-700 bg-red-100";
    return "text-gray-700 bg-gray-100";
  };

  const getTierBadge = (tier: string) => {
    return (
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${getTierColor(tier)}`}
      >
        {tier}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                AI 코드리뷰
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                AI가 당신의 코드를 분석하고 개선점을 제안합니다. 코드 품질,
                성능, 보안 측면에서 전문적인 피드백을 받아보세요.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FileCode className="mr-2 h-4 w-4" />새 코드 분석 요청
              </motion.button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedFilter(option.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    selectedFilter === option.id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {option.icon}
                  {option.label}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-indigo-600 bg-indigo-50">
                <Calendar className="h-4 w-4" />
                <span>최신순</span>
              </div>
              <div className="h-6 border-l border-gray-300 mx-1"></div>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-indigo-50 text-indigo-600" : "text-gray-500"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-indigo-50 text-indigo-600" : "text-gray-500"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List/Grid */}
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
            >
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-6">제목</div>
                <div className="col-span-1 text-center">문제 번호</div>
                <div className="col-span-2 text-center">백준 티어</div>
                <div className="col-span-2 text-center">알고리즘 유형</div>
                <div className="col-span-1 text-center">상태</div>
              </div>

              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {sortedReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${
                        review.isHighlighted ? "bg-indigo-50/30" : ""
                      } hover:bg-gray-50 transition-colors duration-150`}
                    >
                      <div className="col-span-6">
                        <div className="flex items-center flex-wrap gap-1.5">
                          {review.difficulty && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold">
                              {review.difficulty}
                            </span>
                          )}
                          <Link
                            href={`/ai-review/${review.id}`}
                            className="text-gray-900 hover:text-indigo-600 font-medium line-clamp-1 ml-1"
                          >
                            {review.title}
                          </Link>
                        </div>

                        {review.tags && review.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1 ml-1">
                            {review.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {review.timeComplexity && (
                          <div className="mt-1 ml-1 flex items-center gap-2">
                            <span className="text-xs text-gray-500 flex items-center">
                              <Code className="h-3 w-3 mr-1" />
                              시간: {review.timeComplexity}
                            </span>
                            {review.spaceComplexity && (
                              <span className="text-xs text-gray-500 flex items-center">
                                <Code className="h-3 w-3 mr-1" />
                                공간: {review.spaceComplexity}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          <Hash className="h-3 w-3 mr-1" />
                          {review.problemNumber}
                        </span>
                      </div>

                      <div className="col-span-2 text-center">
                        {review.baekjoonTier &&
                          getTierBadge(review.baekjoonTier)}
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {review.algorithmType}
                        </span>
                      </div>

                      <div className="col-span-1 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            review.status
                          )}`}
                        >
                          {getStatusIcon(review.status)}
                          {review.status === "completed"
                            ? "완료"
                            : review.status === "in-progress"
                              ? "진행중"
                              : "실패"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
            >
              <AnimatePresence>
                {sortedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className={`bg-white rounded-xl border ${
                      review.isHighlighted
                        ? "border-indigo-300"
                        : "border-gray-200"
                    } overflow-hidden shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          {review.difficulty && (
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold mr-2">
                              {review.difficulty}
                            </span>
                          )}
                          <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {review.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          <Hash className="h-3 w-3 mr-1" />
                          {review.problemNumber}
                        </span>

                        {review.baekjoonTier &&
                          getTierBadge(review.baekjoonTier)}

                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {review.algorithmType}
                        </span>
                      </div>

                      {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {review.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {(review.timeComplexity || review.spaceComplexity) && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="text-xs font-medium text-gray-700 mb-2">
                            복잡도 분석
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {review.timeComplexity && (
                              <div className="bg-white rounded-md p-2">
                                <div className="text-xs text-gray-500">
                                  시간 복잡도
                                </div>
                                <div className="font-mono text-sm text-indigo-600">
                                  {review.timeComplexity}
                                </div>
                              </div>
                            )}
                            {review.spaceComplexity && (
                              <div className="bg-white rounded-md p-2">
                                <div className="text-xs text-gray-500">
                                  공간 복잡도
                                </div>
                                <div className="font-mono text-sm text-indigo-600">
                                  {review.spaceComplexity}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              review.status
                            )}`}
                          >
                            {getStatusIcon(review.status)}
                            {review.status === "completed"
                              ? "완료"
                              : review.status === "in-progress"
                                ? "진행중"
                                : "실패"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center">
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <span className="sr-only">First</span>
              <ChevronsLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-200">
              {currentPage} 페이지
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <span className="sr-only">Last</span>
              <ChevronsRight className="h-5 w-5" />
            </motion.button>
          </nav>
        </div>
      </main>
    </div>
  );
}
