"use client";

const mockProblems = [
  {
    tier: "실버 2",
    id: 11729,
    title: "하노이 탑 이동 순서",
    exp: 120,
  },
  {
    tier: "골드 5",
    id: 1916,
    title: "최소비용 구하기",
    exp: 240,
  },
  {
    tier: "플래티넘 4",
    id: 12852,
    title: "숨바꼭질 2",
    exp: 450,
  },
];

export default function RecommendedProblems() {
  return (
    <div className="flex flex-col gap-3">
      {mockProblems.map((problem) => (
        <div
          key={problem.id}
          className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-2 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {problem.tier}
            </span>
            <span className="text-xs text-purple-500 dark:text-purple-400 font-semibold">
              +{problem.exp} EXP
            </span>
          </div>

          <p className="text-sm font-semibold mt-1 truncate">
            {problem.id}. {problem.title}
          </p>
        </div>
      ))}
    </div>
  );
}
