"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useCodeReview } from "@/app/hook/review/use-review";
interface CodeReviewProps {
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
  const { data, mutate } = useCodeReview();
  const userId = 3;
  useEffect(() => {
    mutate({ problemNum, language, code, userId });
  }, [mutate, problemNum, language, code]);

  return (
    <aside className="w-2/5 py-6 border-r overflow-y-auto px-12 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm">🤖</span>
          </div>
          <h2 className="text-xl font-semibold">알고잉 코드 리뷰</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm text-sm text-gray-800 leading-relaxed">
        <p>{data?.result?.summary ?? "리뷰 내용을 불러오는 중입니다..."}</p>
      </div>
    </aside>
  );
}
