"use client";

import { useState } from "react";
import { Modal } from "@/app/(with-header)/ai-review/components/modal";
import { Badge } from "@/app/_components/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(with-header)/code/components/code/Card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getLanguageForHighlighter } from "@/app/_util/get-language-highlight";

import { Code, Bot, Calendar, Hash, Copy, Check } from "lucide-react";
import { getLanguageColor } from "@/app/_util/get-language-color";
import { getTierColor } from "@/app/_util/get-tier-color";
import { getTierName } from "@/app/_util/get-tier-name";

interface Submission {
  id: number;
  userId: number;
  problemNum: number;
  summary: string;
  createdAt: string;
  code: string;
  language: string;
}

interface CodeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    id: number;
    problemNum: number;
    title?: string;
    baekjoonTier?: string;
    algorithmType?: string;
    level?: number;
    submissionCount: number;
    submissions: Submission[];
  } | null;
}

export function CodeReviewModal({
  isOpen,
  onClose,
  review,
}: CodeReviewModalProps) {
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!review) return null;

  const currentSubmission = review.submissions[currentSubmissionIndex];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="flex flex-col h-full max-h-[90vh]">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex gap-2">
                {review.title || `문제 #${review.problemNum}`}
                {typeof review.level === "number" && (
                  <Badge className={getTierColor(review.level)}>
                    {getTierName(review.level)}
                  </Badge>
                )}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(currentSubmission.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Hash className="h-4 w-4" />
                  <span>문제 {review.problemNum}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">
                    총 {review.submissionCount}회 제출
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mr-2">
              <Badge className={getLanguageColor(currentSubmission.language)}>
                <Code className="h-3 w-3 mr-1" />
                {currentSubmission.language.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* 제출 내역 탭 */}
          {review.submissions.length > 1 && (
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-700">제출 내역</h4>
              <div className="flex gap-2">
                {review.submissions.map((submission, idx) => (
                  <button
                    key={submission.id}
                    onClick={() => setCurrentSubmissionIndex(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                      currentSubmissionIndex === idx
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-label={`${idx + 1}번째 제출 보기`}
                    aria-pressed={currentSubmissionIndex === idx}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Code Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      제출한 코드
                      {review.submissions.length > 1 && (
                        <span className="text-sm font-normal text-gray-600">
                          ({currentSubmissionIndex + 1}번째 제출)
                        </span>
                      )}
                    </CardTitle>
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      onClick={() =>
                        copyToClipboard(currentSubmission.code || "")
                      }
                    >
                      {copied ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {copied ? "복사됨" : "복사"}
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={getLanguageForHighlighter(
                        currentSubmission.language || "text"
                      )}
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                        borderRadius: "0",
                        background: "transparent",
                      }}
                      showLineNumbers={true}
                      lineNumberStyle={{
                        color: "#6b7280",
                        fontSize: "0.75rem",
                        paddingRight: "1rem",
                        minWidth: "2.5rem",
                      }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {currentSubmission.code || ""}
                    </SyntaxHighlighter>
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
                    {review.submissions.length > 1 && (
                      <span className="text-sm font-normal text-gray-600">
                        ({currentSubmissionIndex + 1}번째 제출)
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Overall Summary */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      전체 평가
                    </h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {currentSubmission.summary}
                    </p>
                  </div>
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
