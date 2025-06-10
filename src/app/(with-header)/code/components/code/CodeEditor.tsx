"use client";

import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (value: string) => void;
  language?: string;
}

export default function ResizableCodeEditor({
  code,
  setCode,
  language,
}: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState(500);
  const [isResizing, setIsResizing] = useState(false);
  const [activeTab, setActiveTab] = useState<"output">("output");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      const offsetTop = containerRef.current.getBoundingClientRect().top;
      const newHeight = e.clientY - offsetTop;
      if (newHeight >= 300 && newHeight <= 1000) {
        setEditorHeight(newHeight);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div
      ref={containerRef}
      className="w-full border border-gray-300 rounded overflow-hidden bg-white"
    >
      {/* 코드 에디터 */}
      <Editor
        height={editorHeight}
        defaultLanguage={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
      />

      {/* 리사이저 */}
      <div
        onMouseDown={() => setIsResizing(true)}
        className="h-2 bg-gray-200 cursor-row-resize hover:bg-gray-400"
      />

      {/* 탭 헤더 */}
      <div className="flex border-t bg-gray-100 text-sm font-medium text-gray-700">
        <button
          onClick={() => setActiveTab("output")}
          className={`px-4 py-2 border-r ${
            activeTab === "output"
              ? "bg-white border-b-2 border-blue-500 text-blue-600"
              : "hover:bg-gray-200"
          }`}
        >
          실행 결과
        </button>
      </div>

      <div className="h-60 p-4 text-sm text-gray-800 overflow-y-auto whitespace-pre-wrap bg-white">
        {activeTab === "output" && <>결과 출력 영역입니다.</>}
      </div>
    </div>
  );
}
