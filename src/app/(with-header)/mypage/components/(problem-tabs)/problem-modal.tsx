"use client";

import { useState } from "react";
import { X, ExternalLink, Copy, Check } from "lucide-react";
import { getLanguageColor } from "@/app/_util/get-language-color";

interface ProblemModalProps {
  problem: any;
  onClose: () => void;
  copied: boolean;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
  setProblem: React.Dispatch<any>;
  closeModal: () => void;
}

export default function ProblemModal({ problem, onClose }: ProblemModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);

  const current = problem.submissions?.[currentSubmissionIndex] ?? problem;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-transparent" onClick={onClose} />
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200">
                Lv. {problem.level}
              </span>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${getLanguageColor(
                  current.language
                )}`}
              >
                {current.language}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-2">
              {problem.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              제출일: {current.submittedDate}
            </p>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {problem.submissions?.length > 1 && (
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-700">
                총 {problem.submissionCount}회 제출
              </h4>
              <div className="flex gap-2">
                {problem.submissions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSubmissionIndex(idx)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      currentSubmissionIndex === idx
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                제출한 코드
                {problem.submissions?.length > 1 && (
                  <span className="text-sm font-normal text-gray-500">
                    ({currentSubmissionIndex + 1}번째 제출)
                  </span>
                )}
              </h4>
              <button
                className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => copyToClipboard(current.answer ?? "")}
              >
                {copied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied ? "복사됨" : "복사"}
              </button>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-gray-100 font-mono text-sm">
                <code>{current.answer}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            {problem.submittedProblemId
              ? `제출 ID: ${problem.submittedProblemId}`
              : ""}
          </div>
          {problem.url && (
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              문제 보기
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
