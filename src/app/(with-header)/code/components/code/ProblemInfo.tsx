"use client";

import { useParams } from "next/navigation";
import { useProblemDetail } from "@/app/hook/problem/use-getProblemInfo";
import { Badge } from "@/app/(with-header)/code/components/code/Badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(with-header)/code/components/code/Card";

import { Clock, MemoryStick, Tag, Trophy } from "lucide-react";

export default function ProblemInfo() {
  const params = useParams();
  const problemId = Number(params?.id);

  const { data, isLoading, isError } = useProblemDetail(problemId);

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
    <aside className="w-2/5 h-full min-h-0 py-6 border-r overflow-y-auto px-6 bg-gray-50/50">
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
            </div>
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
