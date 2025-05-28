import type { FC } from "react";

interface ProblemCardProps {
  id: number;
  title: string;
  level: number;
  tags: string[];
  isSolved: boolean;
}

const ProblemCard: FC<ProblemCardProps> = ({
  id,
  title,
  level,
  tags,
  isSolved,
}) => {
  // Get level color based on difficulty
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-100 text-green-700";
      case 2:
        return "bg-blue-100 text-blue-700";
      case 3:
        return "bg-indigo-100 text-indigo-700";
      case 4:
        return "bg-purple-100 text-purple-700";
      case 5:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-medium text-gray-900 line-clamp-1">
          {title}
        </h3>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-md ${getLevelColor(level)}`}
        >
          <span className="font-semibold text-sm">{level}</span>
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
            >
              # {tag}
            </span>
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
