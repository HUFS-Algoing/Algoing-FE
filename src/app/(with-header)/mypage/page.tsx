"use client";

import { useState, useRef } from "react";
import StatsCards from "./components/stats-cards";
import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { useReviewedProblems } from "@/app/hook/mypage/use-reviewed";
import { useBookmarkedProblems } from "@/app/hook/mypage/use-bookmarked";
import { PageLoading } from "@/app/_components/loading";
import { useSnapshotHistory } from "@/app/hook/use-snapshot";
import dynamic from "next/dynamic";
import SkeletonTabs from "./components/skelaton-tab";

const CodeAnalysisChart = dynamic(() => import("./components/code-chart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});

const PerformanceChart = dynamic(() => import("./components/tag-chart"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />,
});
const ProblemTabs = dynamic(() => import("./components/problem-tabs"), {
  ssr: false,
  loading: () => <SkeletonTabs />,
});

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("submitted");
  const problemsSectionRef = useRef<HTMLDivElement>(null);
  const userId = 3;
  const { data: snapshotresult } = useSnapshotHistory(userId);

  const { data: solvedProblems = [], isLoading: isSolvedLoading } =
    useSolvedProblems(userId);
  const { data: reviewedProblems = [], isLoading: isReviewedLoading } =
    useReviewedProblems(userId);
  const { data: bookmarkedProblems = [], isLoading: isBookmarkedLoading } =
    useBookmarkedProblems(userId);

  if (!userId || isSolvedLoading || isReviewedLoading || isBookmarkedLoading) {
    return <PageLoading />;
  }

  const scrollToProblems = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      problemsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pl-4 lex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              내 활동 분석
            </h1>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              제출한 문제와 북마크한 문제 목록부터, 가장 많이 푼 태그와 코드
              품질 분석까지. <br />
              지금까지의 활동을 한 눈에 확인하고, 나의 성장 흐름을 파악해보세요
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <StatsCards
          solvedCount={solvedProblems.length}
          reviewedCount={reviewedProblems.length}
          bookmarkedCount={bookmarkedProblems.length}
          onClickTab={scrollToProblems}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CodeAnalysisChart data={snapshotresult} />

          <PerformanceChart userId={userId} />
        </div>
        <div ref={problemsSectionRef}>
          <ProblemTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            solvedProblems={solvedProblems}
            bookmarkedProblems={bookmarkedProblems}
          />
        </div>
      </div>
    </div>
  );
}
