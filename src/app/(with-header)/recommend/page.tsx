"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Code,
  TrendingUp,
  Award,
} from "lucide-react";
import Carousel from "./components/carousel";
import ProblemCard from "./components/problem-card";
interface RecommendationPageProps {
  username: string;
}

export default function RecommendationPage({
  username,
}: RecommendationPageProps) {
  const [showSolved, setShowSolved] = useState(false);

  // Mock data for recommended problems
  const recommendedProblems = [
    {
      id: 1,
      title: "생일파티 길찾기",
      level: 3,
      tags: ["그래디"],
      isSolved: false,
    },
    {
      id: 2,
      title: "생일파티 길찾기",
      level: 3,
      tags: [],
      isSolved: false,
    },
    {
      id: 3,
      title: "미로 탈출하기",
      level: 4,
      tags: ["BFS", "그래프"],
      isSolved: false,
    },
    {
      id: 4,
      title: "최단 경로 찾기",
      level: 2,
      tags: ["다익스트라"],
      isSolved: false,
    },
    {
      id: 5,
      title: "트리 순회하기",
      level: 3,
      tags: ["트리", "DFS"],
      isSolved: false,
    },
    {
      id: 6,
      title: "동전 교환 문제",
      level: 2,
      tags: ["DP", "그리디"],
      isSolved: false,
    },
    {
      id: 7,
      title: "문자열 패턴 매칭",
      level: 4,
      tags: ["문자열", "KMP"],
      isSolved: false,
    },
    {
      id: 8,
      title: "구간 합 구하기",
      level: 1,
      tags: ["누적합"],
      isSolved: false,
    },
  ];

  const similarProblems = [
    {
      id: 101,
      title: "그래프 탐색 문제",
      level: 3,
      tags: ["DFS", "그래프"],
      isSolved: false,
    },
    {
      id: 102,
      title: "최소 신장 트리",
      level: 4,
      tags: ["MST", "그래프"],
      isSolved: true,
    },
    {
      id: 103,
      title: "위상 정렬",
      level: 3,
      tags: ["그래프", "위상정렬"],
      isSolved: false,
    },
    {
      id: 104,
      title: "강한 연결 요소",
      level: 5,
      tags: ["그래프", "SCC"],
      isSolved: true,
    },
    {
      id: 105,
      title: "네트워크 플로우",
      level: 5,
      tags: ["그래프", "플로우"],
      isSolved: false,
    },
    {
      id: 106,
      title: "이분 매칭",
      level: 4,
      tags: ["그래프", "매칭"],
      isSolved: false,
    },
    {
      id: 107,
      title: "최소 공통 조상",
      level: 3,
      tags: ["트리", "LCA"],
      isSolved: true,
    },
    {
      id: 108,
      title: "세그먼트 트리",
      level: 4,
      tags: ["트리", "세그먼트 트리"],
      isSolved: false,
    },
  ];

  const recentCodeReviews = [
    {
      id: 201,
      title: "다익스트라 알고리즘 최적화",
      level: 3,
      tags: ["다익스트라", "최적화"],
      isSolved: true,
    },
    {
      id: 202,
      title: "BFS 구현 리팩토링",
      level: 2,
      tags: ["BFS", "리팩토링"],
      isSolved: true,
    },
    {
      id: 203,
      title: "DP 접근법 개선",
      level: 4,
      tags: ["DP", "최적화"],
      isSolved: false,
    },
    {
      id: 204,
      title: "그리디 알고리즘 분석",
      level: 3,
      tags: ["그리디", "분석"],
      isSolved: true,
    },
    {
      id: 205,
      title: "이진 탐색 구현 개선",
      level: 2,
      tags: ["이진탐색", "최적화"],
      isSolved: false,
    },
    {
      id: 206,
      title: "해시 테이블 충돌 해결",
      level: 4,
      tags: ["해시", "자료구조"],
      isSolved: true,
    },
    {
      id: 207,
      title: "트리 순회 알고리즘 분석",
      level: 3,
      tags: ["트리", "분석"],
      isSolved: false,
    },
    {
      id: 208,
      title: "문자열 매칭 최적화",
      level: 4,
      tags: ["문자열", "KMP"],
      isSolved: true,
    },
  ];

  const filteredSimilarProblems = showSolved
    ? similarProblems
    : similarProblems.filter((problem) => !problem.isSolved);

  const filteredCodeReviews = showSolved
    ? recentCodeReviews
    : recentCodeReviews.filter((review) => !review.isSolved);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                안녕하세요, <span className="text-indigo-200">{username}</span>
                님!
              </h1>
              <p className="mt-2 text-indigo-100 max-w-2xl">
                알고리즘 실력 향상을 위한 맞춤형 문제와 코드 리뷰를 추천해
                드립니다. 지금까지의 학습 패턴을 분석하여 최적의 학습 경로를
                제안합니다.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-3xl font-bold">42</div>
                    <div className="text-xs text-indigo-200">해결한 문제</div>
                  </div>
                  <div className="h-10 border-r border-white/20"></div>
                  <div className="mx-4">
                    <div className="text-3xl font-bold">3</div>
                    <div className="text-xs text-indigo-200">현재 레벨</div>
                  </div>
                  <div className="h-10 border-r border-white/20"></div>
                  <div className="ml-4">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-xs text-indigo-200">연속 학습일</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toggle Switch */}
        <div className="flex justify-end items-center mb-8">
          <span className="text-sm text-gray-600 mr-2">풀었던 문제 보기</span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              showSolved ? "bg-indigo-600" : "bg-gray-200"
            }`}
            onClick={() => setShowSolved(!showSolved)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showSolved ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Recommended Problems Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              다음으로 풀면 좋은 문제들이에요
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Carousel itemsPerPage={4}>
              {recommendedProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  id={problem.id}
                  title={problem.title}
                  level={problem.level}
                  tags={problem.tags}
                  isSolved={problem.isSolved}
                />
              ))}
            </Carousel>
          </div>
        </section>

        {/* Similar Problems Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              이런 유형의 문제를 많이 풀려요
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Carousel itemsPerPage={4}>
              {filteredSimilarProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  id={problem.id}
                  title={problem.title}
                  level={problem.level}
                  tags={problem.tags}
                  isSolved={problem.isSolved}
                />
              ))}
            </Carousel>
            {filteredSimilarProblems.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <TrendingUp className="h-12 w-12 mb-4 text-gray-300" />
                <p>풀지 않은 유사 문제가 없습니다.</p>
                <p className="text-sm mt-2">
                  토글을 켜서 풀었던 문제도 확인해보세요.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Code Reviews Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <Code className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              이런 유형의 코드리뷰를 받았어요
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Carousel itemsPerPage={4}>
              {filteredCodeReviews.map((review) => (
                <ProblemCard
                  key={review.id}
                  id={review.id}
                  title={review.title}
                  level={review.level}
                  tags={review.tags}
                  isSolved={review.isSolved}
                />
              ))}
            </Carousel>
            {filteredCodeReviews.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Award className="h-12 w-12 mb-4 text-gray-300" />
                <p>풀지 않은 코드 리뷰가 없습니다.</p>
                <p className="text-sm mt-2">
                  토글을 켜서 풀었던 코드 리뷰도 확인해보세요.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Weekly Challenge */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl overflow-hidden shadow-lg">
            <div className="p-8 md:p-10 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  이번 주 챌린지
                </h3>
                <p className="text-purple-100 mb-4">
                  그래프 알고리즘 마스터하기: 5개의 그래프 관련 문제를 풀고
                  특별한 배지를 획득하세요!
                </p>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full px-3 py-1 text-sm text-white">
                    진행률: 2/5 완료
                  </div>
                  <div className="ml-4">
                    <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      챌린지 보기
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 text-xl font-bold">
                        40%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section>
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">
              맞춤형 학습 경로
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <h3 className="font-medium">기초 다지기</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  기본 자료구조와 알고리즘에 대한 이해를 다집니다.
                </p>
                <div className="flex items-center text-green-600 text-sm">
                  <span className="mr-1">완료됨</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-1/3 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-bold">2</span>
                  </div>
                  <h3 className="font-medium">그래프 알고리즘</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  다양한 그래프 알고리즘을 학습하고 응용합니다.
                </p>
                <div className="flex items-center text-indigo-600 text-sm">
                  <span className="mr-1">진행 중</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="md:w-1/3 bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-bold">3</span>
                  </div>
                  <h3 className="font-medium">고급 알고리즘</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  복잡한 문제 해결을 위한 고급 알고리즘을 학습합니다.
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="mr-1">잠금됨</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
