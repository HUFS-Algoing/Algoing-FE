"use client";

import Link from "next/link";
import ContributionCalendar from "./components/Calendar";
import RecommendedProblems from "./components/Recommend";
import { useEffect } from "react";
import { useUserStore } from "@/app/_store/use-userStore";
import UserProfileCard from "./components/UserProfileCard";
import { useMyInfo } from "@/app/hook/user/useLoadUser";
import { useLatestReviewedProblem } from "@/app/hook/problem/use-latest-reivewed-1";
const isLocalEnvironment = () => {
  return (
    typeof window !== "undefined" && window.location.hostname === "localhost"
  );
};

export default function UserDashboard() {
  const mockMyInfo = {
    bio: "",
    bojId: "an290an",
    createdAt: "2025-06-02T07:56:17.346838",
    email: "ahr020532@gmail.com",
    handle: null,
    name: "google_103635454461245049460",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocK95eW6x4k42UvXsjHaSdg1WaU9wVAadFfURIs9m-zA-2fiXg=s96-c",
    role: "USER",
    solvedCount: 0,
    tier: 10,
    token: null,
    userId: 5,
    userPoint: 0,
  };

  const { data: apiMyInfo } = useMyInfo();
  // const { userId } = useUserStore();
  const setUser = useUserStore((state) => state.setUser);

  // 로컬 환경에서는 목데이터 사용, 배포 환경에서는 API 데이터 사용
  const myInfo = isLocalEnvironment() ? mockMyInfo : apiMyInfo;

  useEffect(() => {
    if (myInfo) {
      console.log("myinfo 데이터:", myInfo);
      console.log("로컬 환경:", isLocalEnvironment());
      setUser(myInfo); // Zustand store에 저장
    }
  }, [myInfo, setUser]);

  const { data: latestReview } = useLatestReviewedProblem(22);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {myInfo ? (
        <>
          <UserProfileCard user={myInfo} />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
            <div className="border dark:border-gray-700 rounded-xl p-4">
              <ContributionCalendar userId={22} year={2025} month={6} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="border dark:border-gray-700 rounded-xl p-4 h-[190px] flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    최근 AI 코드 리뷰
                  </h3>

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

                        <p className="text-sm text-gray-600 dark:text-gray-200 font-medium line-clamp-2">
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
                    <div className="text-sm text-center pt-8 text-gray-400 dark:text-gray-600">
                      최근 리뷰가 없습니다.
                    </div>
                  )}
                </div>
              </div>

              <div className="border dark:border-gray-700 rounded-xl p-4 h-[360px] flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold mb-3">
                    오늘의 추천문제
                  </h3>
                  <RecommendedProblems />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // 로딩 표시 또는 빈 div
        <div></div>
      )}
    </div>
  );
}
