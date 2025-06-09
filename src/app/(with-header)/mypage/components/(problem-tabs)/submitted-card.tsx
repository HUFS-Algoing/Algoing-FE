"use client";

import { getLanguageColor } from "@/app/_util/get-language-color";
import React from "react";

interface SubmittedProblemProps {
  problems: any[];
  onClick: (problem: any) => void;
}

export default function SubmittedProblem({
  problems,
  onClick,
}: SubmittedProblemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {problems.map((problem, index) => (
        <div
          key={problem.submittedProblemId ?? `${problem.title}-${index}`}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 group cursor-pointer"
          onClick={() => onClick(problem)}
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {problem.title}
            </h4>
            <span className="px-2 py-1 text-xs font-bold rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200">
              Lv. {problem.level}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span
              className={`px-2 py-1 rounded-md font-medium ${getLanguageColor(
                problem.language
              )}`}
            >
              {problem.language}
            </span>
            <div className="flex items-center gap-1">
              {problem.submissionCount > 1 && (
                <span className="px-2 py-1 rounded-md bg-indigo-100 text-indigo-700">
                  {problem.submissionCount}회 제출
                </span>
              )}
              <span className="text-gray-500 font-medium">
                {problem.submittedDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
