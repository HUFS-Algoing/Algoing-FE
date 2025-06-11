"use client";

import { useState } from "react";
import ResizableCodeEditor from "@/app/(with-header)/code/components/code/ResizableCodeEditor";
import Footer from "@/app/(with-header)/code/components/code/Footer";
import CodeReview from "@/app/(with-header)/code/components/code/CodeReview";
import ProblemInfo from "@/app/(with-header)/code/components/code/ProblemInfo";
import { useProblemSubmit } from "@/app/hook/problem/use-problem-submit";
import { useParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "@/app/_store/use-userStore";

interface ExecutionResult {
  message: string;
  correct: boolean;
  executionTime?: number;
  memoryUsage?: number;
  testCases?: {
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }[];
}

export default function Code() {
  const [showReview, setShowReview] = useState(false);
  const [language, setLanguage] = useState("node.js");
  const initialCode = "// 여기에 코드를 입력하세요";
  const [code, setCode] = useState(initialCode);
  const [executionResult, setExecutionResult] =
    useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const { userId } = useUserStore();

  const { id } = useParams();
  const problemNum = Number(id);

  const recommendationSessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("recommendationSessionId") || ""
      : "";

  const { mutate: submitCode } = useProblemSubmit();

  const handleResetCode = () => {
    if (window.confirm("코드를 초기화하시겠습니까?")) {
      setCode(initialCode);
      setExecutionResult(null);
      toast.success("코드가 초기화되었습니다.");
    }
  };

  const languageOptions = [
    "node.js",
    "Python 3",
    "C++17",
    "PyPy3",
    "C99",
    "Java 11",
    "Ruby",
    "Kotlin (JVM)",
    "Swift",
  ];

  const languageMap: Record<string, string> = {
    "node.js": "javascript",
    "Python 3": "python",
    "C++17": "cpp",
    PyPy3: "python",
    C99: "c",
    "Java 11": "java",
    Ruby: "ruby",
    "Kotlin (JVM)": "kotlin",
    Swift: "swift",
  };

  const monacoLang = languageMap[language];

  return (
    <div className="flex flex-col h-screen relative bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {showReview ? (
          <CodeReview
            onClose={() => setShowReview(false)}
            problemNum={problemNum}
            language={language}
            code={code}
          />
        ) : (
          <ProblemInfo />
        )}

        <main className="flex flex-col flex-1 overflow-hidden bg-white">
          {/* 상단 툴바 */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              {/* 언어 선택 */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  언어:
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* 리셋 버튼 */}
              <button
                onClick={handleResetCode}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                title="코드 초기화"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 p-4 overflow-hidden">
            <ResizableCodeEditor
              code={code}
              setCode={setCode}
              language={monacoLang}
              executionResult={executionResult}
              isExecuting={isExecuting}
              onExecute={() => {}}
            />
          </div>
        </main>
      </div>

      {/* Footer 제출 버튼 */}
      <Footer
        onExecuteOnly={() => {
          if (!code.trim() || code === initialCode) {
            toast.error("제출할 코드를 입력해주세요.");
            return;
          }

          setIsExecuting(true);
          submitCode(
            {
              userId,
              problemNum,
              language,
              code,
              recommendationSessionId,
            },
            {
              onSuccess: (data: any) => {
                toast.success("코드 제출 성공!");
                setExecutionResult(data.result ?? null);
                setIsExecuting(false);
              },
              onError: (error) => {
                console.error("Submit error:", error);
                toast.error("코드 제출 실패!");
                setIsExecuting(false);
              },
            }
          );
        }}
        onSubmitForReview={() => {
          if (!code.trim() || code === initialCode) {
            toast.error("제출할 코드를 입력해주세요.");
            return;
          }

          setIsExecuting(true);
          submitCode(
            {
              userId,
              problemNum,
              language,
              code,
              recommendationSessionId,
            },
            {
              onSuccess: (data: any) => {
                toast.success("제출 성공! 리뷰를 생성합니다.");
                setShowReview(true);
                setExecutionResult(data.result ?? null);
                setIsExecuting(false);
              },
              onError: (error) => {
                console.error("Submit error:", error);
                toast.error("제출 실패!");
                setIsExecuting(false);
              },
            }
          );
        }}
      />
    </div>
  );
}
