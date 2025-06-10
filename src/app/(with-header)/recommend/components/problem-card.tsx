"use client";

import { Badge } from "@/app/_components/Badge";
import { getTierColor } from "@/app/_util/get-tier-color";
import { getTierName } from "@/app/_util/get-tier-name";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ProblemCardProps {
  id: number;
  title: string;
  level: number;
  tags: string[];
  isSolved: boolean;
  onClick?: () => void;
}

const ProblemCard = ({
  id,
  title,
  level,
  tags,
  isSolved,
  onClick,
}: ProblemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white/80 backdrop-blur-sm border border-gray-200/50  rounded-xl p-5  transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 "></div>

      <div className="relative">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-gray-500 0">#{id}</span>
              {isSolved && <CheckCircle className="h-4 w-4 text-green-500" />}
            </div>
            <h3 className="text-base font-bold text-gray-900  line-clamp-2 leading-tight  transition-colors">
              {title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${getTierColor(level)}`}
            >
              {getTierName(level)}
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400 " />
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs bg-gray-50 "
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-gray-100  text-gray-600 "
              >
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemCard;
