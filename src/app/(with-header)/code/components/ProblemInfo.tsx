"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProblemInfo() {
  const [showHint, setShowHint] = useState(false);

  return (
    <aside className="w-2/5 py-6 border-r overflow-y-auto px-12">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">숫자 카드</h2>
          <button
            onClick={() => setShowHint(!showHint)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border p-4 z-10"
                >
                  <div className="relative">
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l" />
                    <div className="bg-white rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          AI
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            이 문제는 이진 탐색을 사용하면 효율적으로 해결할 수
                            있어요! 정렬된 배열에서 특정 숫자를 찾는 것이
                            핵심이에요.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        <p>
          숫자 카드는 정수 하나가 적혀져 있는 카드이다. 상근이는 숫자 카드 N개를
          가지고 있다. 정수 M개가 주어졌을 때, 이 수가 적혀있는 숫자 카드를
          상근이가 가지고 있는지 아닌지를 구하는 프로그램을 작성하시오.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">입력</h2>
        <p className="mb-2">
          첫째 줄에 상근이가 가지고 있는 숫자 카드의 개수 N(1 ≤ N ≤ 500,000)이
          주어진다. 둘째 줄에는 숫자 카드에 적혀있는 정수가 주어진다. 숫자
          카드에 적혀있는 수는 -10,000,000보다 크거나 같고, 10,000,000보다
          작거나 같다. 두 숫자 카드에 같은 수가 적혀있는 경우는 없다.
        </p>
        <p>
          셋째 줄에는 M(1 ≤ M ≤ 500,000)이 주어진다. 넷째 줄에는 상근이가 가지고
          있는 숫자 카드인지 아닌지를 구해야 할 M개의 정수가 주어지며, 이 수는
          공백으로 구분되어져 있다. 이 수도 -10,000,000보다 크거나 같고,
          10,000,000보다 작거나 같다.
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">출력</h2>
        <p className="mb-2">
          첫째 줄에 입력으로 주어진 M개의 수에 대해서, 각 수가 적힌 숫자 카드를
          상근이가 가지고 있으면 1을, 아니면 0을 공백으로 구분해 출력한다.
        </p>
      </div>
    </aside>
  );
}
