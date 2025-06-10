"use client";

import { useMemo, useState } from "react";
import { Send, Bookmark } from "lucide-react";
import { groupProblemsById } from "@/app/_util/group-problem-id";
import ProblemModal from "./(problem-tabs)/problem-modal";
import { SolvedProblem } from "@/app/_api/mypage/solved";
import { BookmarkedProblem } from "@/app/_api/mypage/bookmarks";
import BookmarkedProblemTab from "./(problem-tabs)/bookmarked-card";
import SubmittedProblemTab from "./(problem-tabs)/submitted-card";
interface ProblemTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  solvedProblems: SolvedProblem[];
  bookmarkedProblems: BookmarkedProblem[];
}

export default function ProblemTabs({
  activeTab,
  setActiveTab,
  solvedProblems,
  bookmarkedProblems,
}: ProblemTabsProps) {
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setCopied] = useState(false);

  const groupProblems = useMemo(
    () => groupProblemsById(solvedProblems),
    [solvedProblems]
  );

  const openModal = (problem: any) => {
    if (!problem) return;
    setSelectedProblem({
      ...problem,
      code: problem.answer || "",
      url: `https://www.acmicpc.net/problem/${problem.problemId}`,
      currentSubmissionIndex: 0,
    });
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProblem(null);
    setCopied(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        <div className="border-b bg-gradient-to-r from-gray-50 to-gray-100">
          <nav className="flex">
            {[
              {
                key: "submitted",
                label: "제출한 문제",
                icon: <Send className="w-4 h-4" />,
                count: solvedProblems.length,
              },
              {
                key: "bookmarked",
                label: "북마크한 문제",
                icon: <Bookmark className="w-4 h-4" />,
                count: bookmarkedProblems.length,
              },
            ].map(({ key, label, icon, count }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-4 text-sm font-semibold border-b-3 transition-all duration-300 ${
                  activeTab === key
                    ? "border-indigo-500 text-indigo-600 bg-white shadow-sm"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {icon}
                  {label} ({count})
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "submitted" ? (
            <SubmittedProblemTab problems={groupProblems} onClick={openModal} />
          ) : (
            <BookmarkedProblemTab problems={bookmarkedProblems} />
          )}
        </div>
      </div>

      {isModalOpen && selectedProblem && (
        <ProblemModal problem={selectedProblem} onClose={closeModal} />
      )}
    </>
  );
}
