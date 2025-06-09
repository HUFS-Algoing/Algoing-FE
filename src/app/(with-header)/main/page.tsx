"use client";

import Link from "next/link";
import ContributionCalendar from "./components/Calendar";
import Progress from "./components/Progress";
import RecommendedProblems from "./components/Recommend";
import { FaCode, FaStar, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import Image from "next/image";
import { useMyInfo } from "@/app/hook/user/useLoadUser";
import { useEffect } from "react";
import { useUserStore } from "@/app/_store/use-userStore";

export default function UserDashboard() {
  const { data: myInfo } = useMyInfo();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    console.log("✅ useEffect 진입");
    if (myInfo) {
      console.log("✅ /myinfo 응답값:", myInfo);
      setUser(myInfo); // Zustand store에 저장
    }
  }, [myInfo, setUser]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-16 border border-purple-100 dark:border-purple-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl"></div>

        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* 프로필 이미지 섹션 */}
          <div className="relative">
            <Link href="/profile" className="block">
              <div className="relative w-24 h-24 group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Image
                  src={"/profile5.png"}
                  width={96}
                  height={96}
                  alt="프로필"
                  className="relative w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* 사용자 정보 섹션 */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  사용자
                </h2>
                <span className="text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full font-semibold shadow-md">
                  Lv. 5
                </span>
              </div>

              {/* 뱃지들 */}
              {/* <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                  <FaTrophy className="w-3 h-3" />
                  <span>골드</span>
                </div>
              </div> */}
            </div>

            {/* 통계 요약 */}
            <div className="flex items-center justify-center md:justify-start gap-6 mb-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <FaCode className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">142</span>
                <span>문제 해결</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <FaStar className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">1,250</span>
                <span>포인트</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <FaCalendarAlt className="w-4 h-4 text-green-500" />
                <span className="font-semibold">28</span>
                <span>일 활동</span>
              </div>
            </div>

            <Progress userId={3} />
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col gap-3 mt-8">
            <button className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <FaChartLine className="w-4 h-4 " />
                <span>내 활동</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 나머지 콘텐츠 */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <div className="border dark:border-gray-700 rounded-xl p-4">
          <ContributionCalendar userId={3} year={2025} month={6} />
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
