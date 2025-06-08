"use client";

import { useState, useRef } from "react";
import StatsCards from "./components/stats-cards";
import ActivityChart from "./components/activity-chart";
import { ProblemTabs } from "./components/problem-tabs";
import MypageIntroSection from "./components/intro-section";
import { PerformanceChart } from "./components/performance-chart";
import { useSolvedProblems } from "@/app/hook/mypage/use-solved";
import { useReviewedProblems } from "@/app/hook/mypage/use-reviewed";
import { useBookmarkedProblems } from "@/app/hook/mypage/use-bookmarked";
import { useZandi } from "@/app/hook/useZandi";
import { PageLoading } from "@/app/_components/loading";
import type { ContributionDay } from "@/app/hook/useZandi";

function getRecentActivityData(zandi: ContributionDay[]) {
  const today = new Date();
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const count = zandi.find((c) => c.date === dateStr)?.count ?? 0;
    const day = d.toLocaleDateString("ko-KR", { weekday: "short" });
    return {
      date: dateStr,
      count,
      day,
    };
  });
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("submitted");
  const problemsSectionRef = useRef<HTMLDivElement>(null);

  const userId = 3;

  const { data: solvedProblems = [], isLoading: isSolvedLoading } =
    useSolvedProblems(userId);
  const { data: reviewedProblems = [], isLoading: isReviewedLoading } =
    useReviewedProblems(userId);
  const { data: bookmarkedProblems = [], isLoading: isBookmarkedLoading } =
    useBookmarkedProblems(userId);
  const { data: zandi = [], isLoading: isZandiLoading } = useZandi(userId);

  if (
    !userId ||
    isSolvedLoading ||
    isReviewedLoading ||
    isBookmarkedLoading ||
    isZandiLoading
  ) {
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

  const activityData: { date: string; count: number; day: string }[] =
    getRecentActivityData(zandi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MypageIntroSection />
        <StatsCards
          solvedCount={solvedProblems.length}
          reviewedCount={reviewedProblems.length}
          bookmarkedCount={bookmarkedProblems.length}
          onClickTab={scrollToProblems}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ActivityChart activityData={activityData} />
          <PerformanceChart userId={userId} />
        </div>
        <div ref={problemsSectionRef}>
          <ProblemTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            solvedProblems={solvedProblems}
            reviewedProblems={reviewedProblems}
            bookmarkedProblems={bookmarkedProblems}
          />
        </div>
      </div>
    </div>
  );
}
