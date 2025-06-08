"use client";

import { Badge } from "@/app/_components/Badge";

interface ProblemCardProps {
  id: number;
  title: string;
  level: number;
  tags: string[];
  isSolved: boolean;
  onClick?: () => void;
}

const ProblemCard = ({
  title,
  level,
  tags,
  isSolved,
  onClick,
}: ProblemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-bold text-gray-900 line-clamp-1">
          {title}
        </h3>
        <div
          className={`flex items-center justify-center w-15 h-8 rounded-md whitespace-nowrap`}
        >
          <Badge variant="secondary">Lv. {level}</Badge>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      {isSolved && (
        <div className="mt-2 flex items-center text-green-600 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          해결됨
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
