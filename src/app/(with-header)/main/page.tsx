"use client";

import Link from "next/link";
import ContributionCalendar from "./components/Calendar";
import Progress from "./components/Progress";
import RecommendedProblems from "./components/Recommend";
import { FaCode, FaChartLine } from "react-icons/fa";
import Image from "next/image";
import { useMyInfo } from "@/app/hook/user/useLoadUser";
import { useEffect } from "react";
import { useUserStore } from "@/app/_store/use-userStore";
import { useLatestReviewedProblem } from "@/app/hook/problem/use-latest-reivewed-1";
import { useSolvedProblems } from "@/app/hook/mypage/use-solved";

export default function UserDashboard() {
  const { data: myInfo } = useMyInfo();
  const setUser = useUserStore((state) => state.setUser);
  const { data } = useSolvedProblems(3);

  useEffect(() => {
    console.log("✅ useEffect 진입");
    if (myInfo) {
      console.log("✅ /myinfo 응답값:", myInfo);
      setUser(myInfo); // Zustand store에 저장
    }
  }, [myInfo, setUser]);

  const { data: latestReview } = useLatestReviewedProblem(3);
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
                <span className="font-semibold">{data?.length}</span>
                <span>문제 해결</span>
              </div>
            </div>

            <Progress userId={3} />
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col gap-3 mt-6">
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
              <h3 className="text-sm font-semibold mb-3">최근 AI 코드 리뷰</h3>

              {latestReview ? (
                <Link href={`/ai-review?id=${latestReview.id}`}>
                  <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-2 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        문제 #{latestReview.problemNum}
                      </span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded-md">
                        {latestReview.language}
                      </span>
                    </div>

                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium line-clamp-2">
                      {latestReview.summary}
                    </p>

                    <div className="flex justify-end text-xs text-gray-400 dark:text-gray-500">
                      {new Date(latestReview.createdAt).toLocaleDateString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="text-sm text-gray-400 dark:text-gray-600">
                  최근 리뷰가 없습니다.
                </div>
              )}
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
