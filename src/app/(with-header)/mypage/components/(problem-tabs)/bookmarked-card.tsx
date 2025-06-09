"use client";

import React from "react";

interface BookmarkedProblemProps {
  problems: any[];
}

export default function BookmarkedProblem({
  problems,
}: BookmarkedProblemProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {problems.map((problem) => (
        <a
          key={problem.problemId}
          href={`https://www.acmicpc.net/problem/${problem.problemId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 border border-gray-200 group cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {problem.title}
            </h4>
            <div className="text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.063 4.185a.563.563 0 00.424.307l4.605.669a.563.563 0 01.312.96l-3.33 3.245a.563.563 0 00-.162.498l.786 4.582a.563.563 0 01-.818.593l-4.115-2.163a.563.563 0 00-.523 0l-4.115 2.163a.563.563 0 01-.818-.593l.786-4.582a.563.563 0 00-.162-.498l-3.33-3.245a.563.563 0 01.312-.96l4.605-.669a.563.563 0 00.424-.307l2.063-4.185z"
                />
              </svg>
            </div>
          </div>
          <div className="text-sm text-gray-500">{problem.problemId}</div>
        </a>
      ))}
    </div>
  );
}
