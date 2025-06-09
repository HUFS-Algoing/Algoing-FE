"use client";

import { Modal } from "@/app/(with-header)/ai-review/components/modal";
import { Badge } from "@/app/_components/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(with-header)/code/components/code/Card";

import {
  Code,
  Bot,
  Calendar,
  Hash,
  Award,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

interface CodeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    id: number;
    userId: number;
    problemNum: number;
    summary: string;
    createdAt: string;
    code: string;
    language: string;
    title?: string;
    baekjoonTier?: string;
    algorithmType?: string;
  } | null;
}

export function CodeReviewModal({
  isOpen,
  onClose,
  review,
}: CodeReviewModalProps) {
  if (!review) return null;

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: "bg-yellow-100 text-yellow-800",
      python: "bg-blue-100 text-blue-800",
      java: "bg-red-100 text-red-800",
      cpp: "bg-purple-100 text-purple-800",
      c: "bg-gray-100 text-gray-800",
    };
    return colors[language.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseAISummary = (summary: string) => {
    // AI 리뷰를 섹션별로 파싱 (실제 구현에서는 더 정교한 파싱이 필요할 수 있음)
    const sections = {
      strengths: [] as string[],
      improvements: [] as string[],
      suggestions: [] as string[],
      overall: summary,
    };

    // 간단한 파싱 로직 (실제로는 AI 응답 형식에 맞춰 조정 필요)
    if (summary.includes("장점") || summary.includes("잘한 점")) {
      sections.strengths.push("코드 구조가 깔끔합니다");
      sections.strengths.push("알고리즘 선택이 적절합니다");
    }

    if (summary.includes("개선") || summary.includes("수정")) {
      sections.improvements.push("변수명을 더 명확하게 작성해보세요");
      sections.improvements.push("주석을 추가하여 가독성을 높여보세요");
    }

    sections.suggestions.push("시간 복잡도를 고려한 최적화를 시도해보세요");
    sections.suggestions.push("엣지 케이스 처리를 강화해보세요");

    return sections;
  };

  const aiAnalysis = parseAISummary(review.summary);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex gap-2">
                {review.title || `문제 #${review.problemNum}`}
                {review.baekjoonTier && (
                  <Badge variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    {review.baekjoonTier}
                  </Badge>
                )}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(review.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-4 w-4" />
                  <span>문제 {review.problemNum}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mr-8">
              <Badge className={getLanguageColor(review.language)}>
                <Code className="h-3 w-3 mr-1" />
                {review.language.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Code Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    제출한 코드
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                      <code>{review.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Review Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    AI 코드 리뷰
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Overall Summary */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">
                      전체 평가
                    </h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {review.summary}
                    </p>
                  </div>

                  {/* Strengths */}
                  {aiAnalysis.strengths.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-medium text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        잘한 점
                      </h4>
                      <ul className="space-y-1">
                        {aiAnalysis.strengths.map((strength, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-1">•</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {aiAnalysis.improvements.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-medium text-orange-700">
                        <AlertCircle className="h-4 w-4" />
                        개선점
                      </h4>
                      <ul className="space-y-1">
                        {aiAnalysis.improvements.map((improvement, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <span className="text-orange-500 mt-1">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  {aiAnalysis.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 font-medium text-purple-700">
                        <Lightbulb className="h-4 w-4" />
                        제안사항
                      </h4>
                      <ul className="space-y-1">
                        {aiAnalysis.suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start gap-2"
                          >
                            <span className="text-purple-500 mt-1">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-8 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:from-indigo-600 hover:to-purple-600 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
