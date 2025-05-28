"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState<string>("// 여기에 코드를 입력하세요");

  return (
    <div className="w-full h-[650px] relative overflow-hidden border border-gray-300">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}
