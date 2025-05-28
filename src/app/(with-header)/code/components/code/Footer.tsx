"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Footer() {
  const [showHint, setShowHint] = useState(false);
  const [typingStep, setTypingStep] = useState(0);

  const handleHintClick = () => {
    setShowHint(!showHint);
    if (!showHint) {
      setTypingStep(1);
    } else {
      setTypingStep(0);
    }
  };

  const handleStepComplete = () => {
    setTypingStep((prev) => prev + 1);
  };

  return (
    <footer className="w-full fixed bottom-0 left-0 border-t bg-white py-2 px-8 flex items-center justify-between">
      {/* 왼쪽 (이전/다음 버튼) */}
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
                      <div className="relative">
                        <div className="absolute -left-2 top-3 w-3 h-3 bg-blue-100 transform rotate-45" />
                        <div className="bg-blue-100 rounded-lg p-4 space-y-3 w-[300px]">
                          {typingStep >= 1 && (
                            <p className="text-md font-semibold text-gray-700 leading-relaxed">
                              <TypewriterText
                                text="이 문제는 이진 탐색(Binary Search)을 사용하면 효율적으로 해결할 수 있어요! 다음과 같은 접근 방법을 고려해보세요:"
                                delay={30}
                                onComplete={handleStepComplete}
                              />
                            </p>
                          )}
                          {typingStep >= 2 && (
                            <ul className="text-md text-gray-700 space-y-2 list-disc pl-4">
                              <li>
                                <TypewriterText
                                  text="숫자 카드 배열을 먼저 정렬해주세요."
                                  delay={30}
                                  onComplete={handleStepComplete}
                                />
                              </li>
                              {typingStep >= 3 && (
                                <li>
                                  <TypewriterText
                                    text="이진 탐색을 사용하여 각 숫자가 배열에 존재하는지 확인하세요."
                                    delay={30}
                                    onComplete={handleStepComplete}
                                  />
                                </li>
                              )}
                              {typingStep >= 4 && (
                                <li>
                                  <TypewriterText
                                    text="시간 복잡도는 O(M * log N)이 됩니다. (M: 찾을 숫자 개수, N: 카드 개수)"
                                    delay={30}
                                    onComplete={handleStepComplete}
                                  />
                                </li>
                              )}
                              {typingStep >= 5 && (
                                <li>
                                  <TypewriterText
                                    text="선형 탐색을 사용하면 O(M * N)이 되어 시간 초과가 발생할 수 있어요."
                                    delay={30}
                                    onComplete={handleStepComplete}
                                  />
                                </li>
                              )}
                            </ul>
                          )}
                          {typingStep >= 6 && (
                            <p className="text-md text-gray-700 leading-relaxed">
                              <TypewriterText
                                text="이진 탐색의 기본 아이디어는 정렬된 배열에서 중간값을 기준으로 찾고자 하는 값이 왼쪽에 있는지 오른쪽에 있는지 판단하는 거예요!"
                                delay={30}
                              />
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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

      {/* 오른쪽 (코드 실행 / 제출 후 저장) */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md">
          코드 실행
        </button>
        <button className="px-4 py-3 bg-[#251B5B] text-white rounded-md">
          제출 후 리뷰받기
        </button>
      </div>
    </footer>
  );
}
