"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Filter,
  Clock,
  MessageSquare,
  Zap,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommunityHeader from "./community-header";

// Types
interface CodeReviewPost {
  id: number;
  title: string;
  author: string;
  authorLevel?: number;
  date: string;
  comments: number;
  isHot?: boolean;
  difficulty?: number;
  tags?: string[];
  status?: "pending" | "solved" | "in-progress";
  isBookmarked?: boolean;
  hasAttachment?: boolean;
  hasCode?: boolean;
  isFeatured?: boolean;
  previewText?: string;
}

export default function EnhancedCodeReviewCommunity() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for code review posts
  const mockPosts: CodeReviewPost[] = [
    {
      id: 1,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "admin",
      authorLevel: 10,
      date: "2025.03.05",
      comments: 32,
      isBookmarked: true,
      hasAttachment: true,
      previewText: "중요한 공지사항입니다. 모든 사용자는 필독해주세요.",
    },
    {
      id: 2,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "admin",
      authorLevel: 10,
      date: "2025.03.05",
      comments: 18,
      hasAttachment: true,
    },
    {
      id: 3,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "admin",
      authorLevel: 10,
      date: "2025.03.05",
      comments: 12,
    },
    {
      id: 4,
      title: "이거 코드개선점 코드리뷰 부탁드립니다~~",
      author: "coder123",
      authorLevel: 5,
      date: "2025.03.05",
      comments: 28,
      isHot: true,
      difficulty: 3,
      tags: ["알고리즘", "다익스트라"],
      status: "in-progress",
      hasCode: true,
      isFeatured: true,
      previewText:
        "다익스트라 알고리즘을 구현했는데 시간초과가 발생합니다. 어떻게 최적화할 수 있을까요?",
    },
    {
      id: 5,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "user456",
      authorLevel: 3,
      date: "2025.03.05",
      comments: 8,
      difficulty: 3,
      tags: ["이진탐색"],
      status: "pending",
      hasCode: true,
    },
    {
      id: 6,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "dev789",
      authorLevel: 4,
      date: "2025.03.05",
      comments: 15,
      status: "solved",
      hasCode: true,
    },
    {
      id: 7,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "coder456",
      authorLevel: 2,
      date: "2025.03.05",
      comments: 7,
      hasCode: true,
    },
    {
      id: 8,
      title: "공지사항입니다아퍼저씨짜구어머구",
      author: "programmer123",
      authorLevel: 1,
      date: "2025.03.05",
      comments: 5,
      hasCode: true,
    },
  ];

  const filterOptions = [
    { id: "all", label: "전체", icon: <Filter className="h-4 w-4" /> },
    { id: "pending", label: "대기중", icon: <Clock className="h-4 w-4" /> },
    { id: "in-progress", label: "진행중", icon: <Zap className="h-4 w-4" /> },
    { id: "solved", label: "해결됨", icon: <Award className="h-4 w-4" /> },
    { id: "my-posts", label: "내 게시글", icon: <User className="h-4 w-4" /> },
    { id: "bookmarked", label: "북마크", icon: <Star className="h-4 w-4" /> },
  ];

  const filteredPosts = mockPosts.filter((post) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "pending") return post.status === "pending";
    if (selectedFilter === "in-progress") return post.status === "in-progress";
    if (selectedFilter === "solved") return post.status === "solved";
    if (selectedFilter === "bookmarked") return post.isBookmarked;
    return true;
  });

  const totalPages = Math.ceil(filteredPosts.length / 10);

  const handleNewPost = () => {
    console.log("New post");
  };

  const handleMyPosts = () => {
    setSelectedFilter("my-posts");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Header */}
        <CommunityHeader onNewPost={handleNewPost} onMyPosts={handleMyPosts} />

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
          </div>
        </div>

        {/* Post List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 text-sm font-medium text-gray-600">
            <div className="col-span-9">제목</div>
            <div className="col-span-1 text-center">작성자</div>
            <div className="col-span-1 text-center">날짜</div>
            <div className="col-span-1 text-center">댓글</div>
          </div>

          <div className="divide-y divide-gray-100">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center"
                >
                  <div className="col-span-9">
                    <div className="flex items-center flex-wrap gap-1.5">
                      {post.isHot && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <Zap className="h-3 w-3 mr-1" />
                          인기
                        </span>
                      )}
                      {post.difficulty && (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold">
                          {post.difficulty}
                        </span>
                      )}
                      <Link
                        href={`/community/post/${post.id}`}
                        className="text-gray-900 hover:text-indigo-600 font-medium line-clamp-1 ml-1"
                      >
                        {post.title}
                      </Link>
                      {post.isBookmarked && (
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      )}
                      {post.hasAttachment && (
                        <span className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>

                    {post.previewText && (
                      <p className="mt-1 text-xs text-gray-500 line-clamp-1 ml-1">
                        {post.previewText}
                      </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1 ml-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {post.status && (
                      <span
                        className={`inline-block mt-1 ml-1 px-2 py-0.5 text-xs rounded-full ${
                          post.status === "solved"
                            ? "bg-green-100 text-green-800"
                            : post.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {post.status === "solved"
                          ? "해결됨"
                          : post.status === "in-progress"
                            ? "진행중"
                            : "대기중"}
                      </span>
                    )}
                  </div>

                  <div className="col-span-1 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-700 font-medium">
                        {post.author}
                      </span>
                      {post.authorLevel && (
                        <span className="text-xs text-gray-500">
                          Lv.{post.authorLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-1 text-center text-sm text-gray-500">
                    {post.date}
                  </div>

                  <div className="col-span-1 text-center text-sm text-gray-500 flex items-center justify-center">
                    <MessageSquare className="h-3 w-3 mr-1 text-gray-400" />
                    {post.comments}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-center border-t border-gray-200 bg-gray-50">
            <nav
              className="flex items-center space-x-2"
              aria-label="Pagination"
            >
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
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg"
        >
          <Edit className="h-6 w-6" />
        </motion.button>
      </main>
    </div>
  );
}
