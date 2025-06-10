"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useHint } from "@/app/hook/problem/use-getHint";

interface FooterProps {
  onSubmitForReview: () => void;
  onExecuteOnly: () => void;
}

const MAX_HINTS = 3;

export default function Footer({
  onExecuteOnly,
  onSubmitForReview,
}: FooterProps) {
  const [showHint, setShowHint] = useState(false);
  const [hintOrder, setHintOrder] = useState(1);
  const [hintLogs, setHintLogs] = useState<string[]>([]);

  const params = useParams();
  const problemId = Number(params?.id);
  const userId = 3;

  const { refetch, isLoading } = useHint(problemId, hintOrder, userId);

  const handleHintClick = async () => {
    const open = !showHint;
    setShowHint(open);

    if (open && hintOrder <= MAX_HINTS) {
      const { data } = await refetch();
      if (data?.content) {
        setHintLogs((prev) => [...prev, data.content]);
        setHintOrder((prev) => prev + 1);
      }
    }
  };

  return (
    <footer className="w-full fixed bottom-0 left-0 border-t bg-white py-2 px-8 flex items-center justify-between z-10">
      <div className="relative">
        <button
          onClick={handleHintClick}
          className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          힌트 보기 ({hintLogs.length}/{MAX_HINTS})
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
                <div className="bg-white rounded-lg p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="flex flex-col gap-3">
                    {hintLogs.map((hint, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-blue-100 rounded-lg p-4 text-sm text-gray-800 leading-relaxed"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-300 text-white flex items-center justify-center font-bold flex-shrink-0">
                          🤖
                        </div>
                        <span className="flex-1">{hint}</span>
                      </div>
                    ))}
                    {isLoading && (
                      <p className="text-sm text-gray-600">
                        힌트 불러오는 중...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExecuteOnly}
          className="px-4 py-3 bg-gray-200 text-gray-700 rounded-md"
        >
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
