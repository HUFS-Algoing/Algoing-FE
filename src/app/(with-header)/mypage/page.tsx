"use client";

import { useState } from "react";
import {
  Trophy,
  Target,
  BookOpen,
  Code,
  TrendingUp,
  Star,
  ChevronRight,
  Calendar,
  Zap,
  Award,
  FlameIcon as Fire,
} from "lucide-react";
import { motion } from "framer-motion";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("solved");

  // Mock user data
  const userData = {
    name: "준호",
    level: 3,
    profileImage: "/placeholder.svg?height=80&width=80",
    stats: {
      solved: 5,
      attempted: 15,
      reviewed: 3,
    },
    streak: 7,
    totalPoints: 1250,
  };

  // Mock solved problems
  const solvedProblems = [
    {
      id: 1,
      title: "두 수의 합",
      difficulty: 1,
      tags: ["해시", "배열"],
      solvedDate: "2024-01-15",
      language: "Python",
    },
    {
      id: 2,
      title: "최단경로",
      difficulty: 3,
      tags: ["그래프", "다익스트라"],
      solvedDate: "2024-01-14",
      language: "Java",
    },
    {
      id: 3,
      title: "이진 탐색",
      difficulty: 2,
      tags: ["이분탐색"],
      solvedDate: "2024-01-13",
      language: "C++",
    },
    {
      id: 4,
      title: "동적 계획법",
      difficulty: 4,
      tags: ["DP"],
      solvedDate: "2024-01-12",
      language: "Python",
    },
  ];

  // Mock reviewed problems
  const reviewedProblems = [
    {
      id: 101,
      title: "백트래킹 알고리즘",
      difficulty: 3,
      tags: ["백트래킹", "재귀"],
      reviewDate: "2024-01-10",
      reviewer: "AI 리뷰어",
      score: 85,
    },
    {
      id: 102,
      title: "트리 순회",
      difficulty: 2,
      tags: ["트리", "DFS"],
      reviewDate: "2024-01-08",
      reviewer: "김개발",
      score: 92,
    },
    {
      id: 103,
      title: "그리디 알고리즘",
      difficulty: 3,
      tags: ["그리디"],
      reviewDate: "2024-01-05",
      reviewer: "AI 리뷰어",
      score: 78,
    },
  ];

  // Activity data for chart (mock)
  const activityData = [
    { date: "01-09", problems: 1, day: "월" },
    { date: "01-10", problems: 2, day: "화" },
    { date: "01-11", problems: 0, day: "수" },
    { date: "01-12", problems: 3, day: "목" },
    { date: "01-13", problems: 1, day: "금" },
    { date: "01-14", problems: 2, day: "토" },
    { date: "01-15", problems: 1, day: "일" },
  ];

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1:
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case 2:
        return "bg-sky-100 text-sky-700 border-sky-200";
      case 3:
        return "bg-amber-100 text-amber-700 border-amber-200";
      case 4:
        return "bg-orange-100 text-orange-700 border-orange-200";
      case 5:
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "Python":
        return "bg-blue-50 text-blue-600 border border-blue-200";
      case "Java":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      case "C++":
        return "bg-purple-50 text-purple-600 border border-purple-200";
      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  const maxProblems = Math.max(...activityData.map((d) => d.problems));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 text-white overflow-hidden shadow-2xl">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-lg opacity-50"></div>
                  <img
                    src={userData.profileImage || "/placeholder.svg"}
                    alt="프로필"
                    className="relative w-20 h-20 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 border-3 border-white rounded-full shadow-lg">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                </motion.div>
                <div>
                  <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold flex items-center gap-2"
                  >
                    {userData.name}님!{" "}
                    <span className="text-red-300 animate-pulse">❤️</span>
                  </motion.h1>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-indigo-100 mt-1 flex items-center gap-2"
                  >
                    <Fire className="h-4 w-4 text-orange-300" />
                    Level {userData.level} • {userData.streak}일 연속 학습 중
                  </motion.p>
                </div>
              </div>
              <div className="flex-1"></div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-right bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="text-3xl font-bold flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-300" />
                  {userData.totalPoints.toLocaleString()}
                </div>
                <div className="text-indigo-200 text-sm">총 포인트</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-200/30 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-emerald-700 font-semibold">푼 문제</h3>
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-emerald-900 mb-2">
                {userData.stats.solved}개
              </div>
              <div className="text-sm text-emerald-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2 이번 주
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-blue-700 font-semibold">도전한 문제</h3>
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-900 mb-2">
                {userData.stats.attempted}개
              </div>
              <div className="text-sm text-blue-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +5 이번 주
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-purple-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-purple-700 font-semibold">
                  리뷰 받은 문제
                </h3>
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Code className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-900 mb-2">
                {userData.stats.reviewed}개
              </div>
              <div className="text-sm text-purple-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +1 이번 주
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Chart */}
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

            {/* Line Chart */}
            <div className="relative h-48 mb-4">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                {/* Grid lines */}
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

                {/* Area fill */}
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop
                      offset="100%"
                      stopColor="#6366f1"
                      stopOpacity="0.05"
                    />
                  </linearGradient>
                </defs>

                <path
                  d={`M 40 ${200 - (activityData[0].problems / maxProblems) * 120 - 40} ${activityData
                    .map((point, index) => {
                      const x = 40 + index * 50;
                      const y = 200 - (point.problems / maxProblems) * 120 - 40;
                      return `L ${x} ${y}`;
                    })
                    .join(" ")} L 390 160 L 40 160 Z`}
                  fill="url(#areaGradient)"
                />

                {/* Line */}
                <path
                  d={`M 40 ${200 - (activityData[0].problems / maxProblems) * 120 - 40} ${activityData
                    .map((point, index) => {
                      const x = 40 + index * 50;
                      const y = 200 - (point.problems / maxProblems) * 120 - 40;
                      return `L ${x} ${y}`;
                    })
                    .join(" ")}`}
                  stroke="#6366f1"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data points */}
                {activityData.map((point, index) => {
                  const x = 40 + index * 50;
                  const y = 200 - (point.problems / maxProblems) * 120 - 40;
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

                {/* X-axis labels */}
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
                총 {activityData.reduce((sum, day) => sum + day.problems, 0)}
                문제 해결
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                문제 수
              </span>
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                난이도별 해결률
              </h3>
              <Award className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {[
                {
                  level: "Level 1",
                  solved: 3,
                  total: 5,
                  color: "from-emerald-400 to-emerald-600",
                  bgColor: "bg-emerald-50",
                },
                {
                  level: "Level 2",
                  solved: 1,
                  total: 4,
                  color: "from-blue-400 to-blue-600",
                  bgColor: "bg-blue-50",
                },
                {
                  level: "Level 3",
                  solved: 1,
                  total: 4,
                  color: "from-amber-400 to-amber-600",
                  bgColor: "bg-amber-50",
                },
                {
                  level: "Level 4",
                  solved: 0,
                  total: 2,
                  color: "from-orange-400 to-orange-600",
                  bgColor: "bg-orange-50",
                },
                {
                  level: "Level 5",
                  solved: 0,
                  total: 0,
                  color: "from-red-400 to-red-600",
                  bgColor: "bg-red-50",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.level}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-4 p-3 rounded-xl ${item.bgColor} border border-gray-100`}
                >
                  <span className="text-sm font-medium text-gray-700 w-16">
                    {item.level}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width:
                          item.total > 0
                            ? `${(item.solved / item.total) * 100}%`
                            : "0%",
                      }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full shadow-sm`}
                    ></motion.div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-12">
                    {item.solved}/{item.total}
                  </span>
                  <span className="text-xs text-gray-500 w-12">
                    {item.total > 0
                      ? Math.round((item.solved / item.total) * 100)
                      : 0}
                    %
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Problems Section */}
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
                onClick={() => setActiveTab("solved")}
                className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
                  activeTab === "solved"
                    ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  내가 푼 문제 ({solvedProblems.length})
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
                  내가 출창한 문제 ({reviewedProblems.length})
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "solved" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {solvedProblems.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {problem.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)} shadow-sm`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-md font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2 py-1 rounded-md font-medium ${getLanguageColor(problem.language)}`}
                      >
                        {problem.language}
                      </span>
                      <span className="text-gray-500 font-medium">
                        {problem.solvedDate}
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
                        {problem.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)} shadow-sm`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600 font-medium">
                        리뷰어: {problem.reviewer}
                      </span>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-bold text-yellow-700">
                          {problem.score}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {problem.reviewDate}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* View More Button */}
          <div className="border-t border-gray-100 p-4 text-center bg-gradient-to-r from-gray-50 to-gray-100">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md border border-indigo-200"
            >
              더보기
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
