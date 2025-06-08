"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useHint } from "@/app/hook/problem/use-getHint";

interface FooterProps {
  onSubmitForReview: () => void;
}

const TypewriterText = ({
  text,
  delay = 30,
  onComplete,
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateText = useCallback(() => {
    if (currentIndex < text.length) {
      setDisplayText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  useEffect(() => {
    const timeout = setTimeout(updateText, delay);
    return () => clearTimeout(timeout);
  }, [updateText, delay]);

  return <span>{displayText}</span>;
};

export default function Footer({ onSubmitForReview }: FooterProps) {
  const [showHint, setShowHint] = useState(false);

  const [hintContent, setHintContent] = useState(""); // 출력할 힌트
  const [hintOrder, setHintOrder] = useState(1); // 현재 요청 중인 순서

  const params = useParams();
  const problemId = Number(params?.id);
  const userId = 3;

  const { refetch, isLoading } = useHint(problemId, hintOrder, userId);

  const handleHintClick = async () => {
    const open = !showHint;
    setShowHint(open);

    if (open) {
      const { data } = await refetch();
      if (data) {
        setHintContent(data.content);
        setHintOrder(data.order + 1);
      }
    }
  };

  return (
    <footer className="w-full fixed bottom-0 left-0 border-t bg-white py-2 px-8 flex items-center justify-between z-10">
      {/* 왼쪽: 힌트 보기 버튼 */}
      <div className="relative">
        <button
          onClick={handleHintClick}
          className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          힌트 보기
        </button>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-[450px] bg-white rounded-lg shadow-lg border p-4 z-10"
            >
              <div className="relative">
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white transform rotate-45 border-b border-r" />
                <div className="bg-white rounded-lg p-4 h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-white font-bold flex-shrink-0">
                      🤖
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-100 rounded-lg p-4 space-y-3 w-[300px] text-sm text-gray-800 leading-relaxed">
                        {isLoading ? (
                          <p>힌트 불러오는 중...</p>
                        ) : hintContent ? (
                          <TypewriterText text={hintContent} delay={25} />
                        ) : (
                          <p>힌트가 없습니다.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 가운데: 이전 / 다음 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <button className="flex items-center gap-1 text-gray-700">
          <span>←</span>
          <span>이전</span>
        </button>
        <button className="flex items-center gap-1  text-gray-700">
          <span>다음</span>
          <span>→</span>
        </button>
      </div>

      {/* 오른쪽: 실행 / 제출 */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md">
          코드 실행
        </button>
        <button
          onClick={onSubmitForReview}
          className="px-4 py-3 bg-[#251B5B] text-white rounded-md"
        >
          제출 후 리뷰받기
        </button>
      </div>
    </footer>
  );
}
