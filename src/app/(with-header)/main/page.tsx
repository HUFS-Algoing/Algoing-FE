"use client";

import Link from "next/link";
import ContributionCalendar from "./components/Calendar";
import Progress from "./components/Progress";
import RecommendedProblems from "./components/Recommend";
import { FaCode } from "react-icons/fa";

export default function UserDashboard() {
  const contributions = [
    { date: "2025-03-17", count: 1 },
    { date: "2025-03-18", count: 3 },
    { date: "2025-03-19", count: 5 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-16">
        <Link href="/profile" className="w-20 h-20">
          <img
            src="/profile5.png"
            alt="프로필"
            className="w-20 h-20 rounded-full  dark:border-neutral-700 shadow-md bg-gray-black dark:bg-neutral-700 shrink-0 object-cover"
          />
        </Link>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <h2 className="text-2xl font-bold">ahr0205</h2>
            <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-md">
              Lv. 5
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            134 문제 해결
          </p>
          <Progress
            value={60}
            className="mt-3 h-3 bg-gray-200 dark:bg-neutral-700"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold text-sm shadow-md hover:opacity-90 transition">
            성장 그래프
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:opacity-90 transition">
            <FaCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <div className="border dark:border-gray-700 rounded-xl p-4">
          <ContributionCalendar
            year={2025}
            month={3}
            contributions={contributions}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="border dark:border-gray-700 rounded-xl p-4 h-[190px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-3">
                새로 추가된 코드 리뷰 요청
              </h3>

              <div className="bg-gray-50 dark:bg-neutral-800 p-3 rounded-lg border dark:border-gray-700 text-sm flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-md bg-yellow-200 text-yellow-800 dark:bg-yellow-300 dark:text-yellow-900">
                    골드 5
                  </span>
                </div>

                <p className="text-sm font-semibold mt-1 line-clamp-1">
                  1916. 최소비용 구하기
                </p>

                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  시간초과가 계속 발생하는데 어떻게 해야할까요ㅠㅠ
                </p>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-blue-500 dark:text-blue-400">
                    #그래프이론
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    2025.03.25
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 추천 문제 */}
          <div className="border dark:border-gray-700 rounded-xl p-4 h-[360px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-3">오늘의 추천문제</h3>
              <RecommendedProblems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
