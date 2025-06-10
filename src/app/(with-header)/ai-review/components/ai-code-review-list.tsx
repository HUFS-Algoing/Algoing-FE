"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Award,
  Calendar,
  Tag,
} from "lucide-react";
import { useReviewedProblems } from "@/app/hook/review/use-review-list";
import { useQueries } from "@tanstack/react-query";
import {
  getProblemDetail,
  type ProblemDetailResponse,
} from "@/app/_api/problem/problemInfo";
import { CodeReviewModal } from "@/app/(with-header)/ai-review/components/code-review-modal";
import { getTierColor } from "@/app/_util/get-tier-color";
import { getTierName } from "@/app/_util/get-tier-name";

export default function AICodeReviewList() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useReviewedProblems(3);

  const filterOptions = [
    { id: "all", label: "전체", icon: <Filter className="h-4 w-4" /> },
    { id: "Bronze", label: "브론즈", icon: <Award className="h-4 w-4" /> },
    { id: "Silver", label: "실버", icon: <Award className="h-4 w-4" /> },
    { id: "Gold", label: "골드 이상", icon: <Award className="h-4 w-4" /> },
  ];

  const reviews = data || [];

  const problemQueries = useQueries<
    {
      data: ProblemDetailResponse;
    }[]
  >({
    queries: reviews.map((review) => ({
      queryKey: ["problem", review.problemNum],
      queryFn: () => getProblemDetail(review.problemNum),
      enabled: !!review.problemNum,
    })),
  });

  const mergedReviews = reviews.map((review, index) => {
    const problem = problemQueries[index]?.data;
    const levelNum = Number(problem?.level);
    return {
      ...review,
      title: problem?.title || "제목 불러오는 중...",
      isHighlighted: false,
      problemNumber: problem?.problemId,
      baekjoonTier: getTierName(levelNum), // 문자열 변환
      level: levelNum,
      algorithmType: problem?.tagNames?.split(",")[0] || "알 수 없음",
      tags: problem?.tagNames?.split(",") || [],
      date: new Date(review.createdAt).toLocaleDateString(),
      status: "completed",
    };
  });

  const filteredReviews = mergedReviews.filter((review) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "Gold") {
      return review.level >= 11;
    }
    if (selectedFilter === "Bronze") {
      return review.level >= 1 && review.level < 6;
    }
    if (selectedFilter === "Silver") {
      return review.level >= 6 && review.level < 11;
    }
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalPages = Math.ceil(sortedReviews.length / 10);

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="pl-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                AI 코드리뷰
              </h1>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                AI가 당신의 코드를 분석하고 개선점을 제안합니다. <br />
                코드 품질, 성능, 보안 측면에서 전문적인 피드백을 받아보세요.
              </p>
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
              </div>

              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {sortedReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer ${
                        review.isHighlighted ? "bg-indigo-50/30" : ""
                      } hover:bg-gray-50 transition-colors duration-150`}
                      onClick={() => handleReviewClick(review)}
                    >
                      <div className="col-span-6">
                        <div className="flex items-center flex-wrap gap-1.5">
                          <span className="text-gray-900 hover:text-indigo-600 font-medium line-clamp-1 ml-1">
                            {review.title}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          {review.problemNumber}
                        </span>
                      </div>

                      <div className="col-span-2 text-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${getTierColor(review.level)}`}
                        >
                          {review.baekjoonTier}
                        </span>
                        {/* <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${getTierColor(review.level)}`}
                        >
                          {getTierName(review.level)}
                        </span> */}
                      </div>

                      <div className="col-span-2 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {review.algorithmType}
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
                    className={`bg-white rounded-xl border cursor-pointer ${
                      review.isHighlighted
                        ? "border-indigo-300"
                        : "border-gray-200"
                    } overflow-hidden shadow-sm hover:shadow-md transition-all duration-200`}
                    onClick={() => handleReviewClick(review)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {review.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                          {review.problemNumber}
                        </span>

                        <div className="col-span-2 text-center">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-semibold ${getTierColor(review.level)}`}
                          >
                            {review.baekjoonTier}
                          </span>
                        </div>

                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {review.algorithmType}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
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

      {/* Code Review Modal */}
      <CodeReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        review={selectedReview}
      />
    </div>
  );
}
