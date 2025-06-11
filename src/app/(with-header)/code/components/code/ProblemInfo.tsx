"use client";

import { useParams } from "next/navigation";
import { useProblemDetail } from "@/app/hook/problem/use-getProblemInfo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(with-header)/code/components/code/Card";

import { Clock, MemoryStick, Tag, Trophy, Star } from "lucide-react";
import { Badge } from "@/app/_components/Badge";
import { useToggleBookmark } from "@/app/hook/problem/use-bookmark";
import { useState } from "react";
import { useUserStore } from "@/app/_store/use-userStore";

export default function ProblemInfo() {
  const params = useParams();
  const problemId = Number(params?.id);
  const { userId } = useUserStore();

  const { data, isLoading, isError } = useProblemDetail(problemId);

  const [isBookmarked, setIsBookmarked] = useState(false); // 로컬 상태로만 관리

  const toggleBookmarkMutation = useToggleBookmark();

  const handleBookmarkToggle = () => {
    toggleBookmarkMutation.mutate(
      { userId: userId, problemId },
      {
        onSuccess: (res) => {
          setIsBookmarked(res.result); // 서버에서 리턴된 등록 여부 기반으로 상태 반영
        },
      }
    );
  };
  if (isLoading) {
    return (
      <aside className="w-2/5 py-6 px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </aside>
    );
  }

  if (isError || !data) {
    return (
      <aside className="w-2/5 py-6 px-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              문제를 불러올 수 없습니다.
            </p>
          </CardContent>
        </Card>
      </aside>
    );
  }

  const getDifficultyColor = (level: number) => {
    if (level <= 5) return "bg-green-500";
    if (level <= 10) return "bg-yellow-500";
    if (level <= 15) return "bg-orange-500";
    if (level <= 20) return "bg-red-500";
    return "bg-purple-500";
  };

  const getDifficultyText = (level: number) => {
    if (level <= 5) return "Bronze";
    if (level <= 10) return "Silver";
    if (level <= 15) return "Gold";
    if (level <= 20) return "Platinum";
    return "Diamond";
  };

  return (
    <aside className="w-2/5 flex-shrink-0 overflow-y-auto max-h-screen pb-24 py-6 border-r px-6 bg-gray-50/50">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {data.problemId}. {data.title}
              </h1>
              <Badge
                variant="secondary"
                className={`${getDifficultyColor(data.level)} text-white border-0`}
              >
                <Trophy className="w-3 h-3 mr-1" />
                {getDifficultyText(data.level)} {data.level}
              </Badge>
            </div>{" "}
            <button
              onClick={handleBookmarkToggle}
              disabled={toggleBookmarkMutation.isPending}
              className={`ml-3 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isBookmarked
                  ? "text-yellow-500 hover:text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                  : "text-gray-400 hover:text-yellow-500 bg-gray-50 hover:bg-yellow-50"
              } ${toggleBookmarkMutation.isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              title={isBookmarked ? "북마크 제거" : "북마크 추가"}
            >
              <Star
                className={`w-7 h-7 transition-all duration-200 ${isBookmarked ? "fill-current" : "fill-none"}`}
              />
            </button>
          </div>

          {/* Constraints */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{data.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MemoryStick className="w-4 h-4" />
              <span>{data.memory}</span>
            </div>
          </div>

          {/* Tags */}
          {data.tagNames && (
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-1">
                {data.tagNames.split(",").map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Problem Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">문제</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </CardContent>
        </Card>

        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">입력</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{data.input}</p>
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">출력</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{data.output}</p>
          </CardContent>
        </Card>

        {/* Sample Input/Output */}
        {(data.sampleInput1 || data.sampleOutput1) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">예제</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.sampleInput1 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                    예제 입력 1
                  </h4>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {data.sampleInput1}
                    </pre>
                  </div>
                </div>
              )}
              {data.sampleOutput1 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                    예제 출력 1
                  </h4>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {data.sampleOutput1}
                    </pre>
                  </div>
                </div>
              )}
              {data.sampleInput2 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                    예제 입력 2
                  </h4>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {data.sampleInput2}
                    </pre>
                  </div>
                </div>
              )}
              {data.sampleOutput2 && (
                <div>
                  <h4 className="font-medium text-sm mb-2 text-muted-foreground">
                    예제 출력 2
                  </h4>
                  <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {data.sampleOutput2}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Additional Info */}
        {data.limit && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">제한</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{data.limit}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </aside>
  );
}
