"use client";

import { useEffect, useState } from "react";
import {
  X,
  Bot,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Code,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useCodeReview } from "@/app/hook/review/use-review";
import { useUserStore } from "@/app/_store/use-userStore";

export interface CodeReviewProps {
  onClose: () => void;
  problemNum: number;
  language: string;
  code: string;
}

export default function CodeReview({
  onClose,
  problemNum,
  language,
  code,
}: CodeReviewProps) {
  const { data, mutate, isPending } = useCodeReview();
  const { userId } = useUserStore();
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    mutate({ problemNum, language, code, userId });
  }, [mutate, problemNum, language, code, userId]);

  useEffect(() => {
    if (data?.result?.summary) {
      setIsTyping(true);
      setDisplayedText("");
      const text = data.result.summary;
      let index = 0;

      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [data?.result?.summary]);

  // 텍스트를 섹션별로 파싱하는 함수
  const parseReviewContent = (content: string) => {
    if (!content) return null;

    // 간단한 파싱 로직 (실제로는 더 정교하게 구현 가능)
    const sections = content
      .split(/\n\s*\n/)
      .filter((section) => section.trim());

    return sections.map((section, index) => {
      const lines = section.split("\n").filter((line) => line.trim());
      const title = lines[0];
      const content = lines.slice(1).join("\n");

      // 섹션 타입 결정
      let icon = <Code className="w-4 h-4" />;
      let bgColor = "bg-blue-50 dark:bg-blue-900/20";
      let borderColor = "border-blue-200 dark:border-blue-800";
      let iconColor = "text-blue-600 dark:text-blue-400";

      if (
        title.includes("개선") ||
        title.includes("문제") ||
        title.includes("수정")
      ) {
        icon = <AlertTriangle className="w-4 h-4" />;
        bgColor = "bg-amber-50 dark:bg-amber-900/20";
        borderColor = "border-amber-200 dark:border-amber-800";
        iconColor = "text-amber-600 dark:text-amber-400";
      } else if (
        title.includes("좋은") ||
        title.includes("잘") ||
        title.includes("우수")
      ) {
        icon = <CheckCircle className="w-4 h-4" />;
        bgColor = "bg-green-50 dark:bg-green-900/20";
        borderColor = "border-green-200 dark:border-green-800";
        iconColor = "text-green-600 dark:text-green-400";
      } else if (
        title.includes("제안") ||
        title.includes("추천") ||
        title.includes("팁")
      ) {
        icon = <Lightbulb className="w-4 h-4" />;
        bgColor = "bg-purple-50 dark:bg-purple-900/20";
        borderColor = "border-purple-200 dark:border-purple-800";
        iconColor = "text-purple-600 dark:text-purple-400";
      }

      return {
        id: index,
        title,
        content,
        icon,
        bgColor,
        borderColor,
        iconColor,
      };
    });
  };

  const reviewSections = parseReviewContent(displayedText);

  return (
    <aside className="w-2/5 py-6 border-r border-gray-200 dark:border-gray-700 overflow-y-auto px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            {isPending && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Loader2 className="w-2 h-2 text-white animate-spin" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              AI 코드 리뷰
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              문제 #{problemNum} · {language}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="리뷰 닫기"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* 리뷰 내용 */}
      <div className="space-y-4">
        {isPending ? (
          /* 로딩 상태 */
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  AI가 코드를 분석하고 있어요
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  잠시만 기다려주세요...
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        ) : reviewSections && reviewSections.length > 0 ? (
          /* 구조화된 리뷰 내용 */
          <>
            {/* 전체 요약 */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-indigo-900 dark:text-indigo-100">
                  AI 분석 결과
                </h3>
              </div>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                {displayedText.split(/\n\s*\n/)?.[0] ||
                  "코드 분석을 완료했습니다."}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>

            {/* 섹션별 내용 */}
            {reviewSections.slice(1).map((section) => (
              <div
                key={section.id}
                className={`${section.bgColor} rounded-xl p-5 border ${section.borderColor} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${section.iconColor} mt-0.5`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {section.title}
                    </h4>
                    {section.content && (
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                리뷰 결과
              </h3>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {displayedText || "리뷰 내용을 불러오는 중입니다..."}

              {isTyping && <span className="animate-pulse">|</span>}
            </div>
          </div>
        )}
      </div>

      {data?.result?.summary && !isPending && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>AI 분석 완료</span>
            <span>도움이 되셨나요?</span>
          </div>
        </div>
      )}
    </aside>
  );
}
