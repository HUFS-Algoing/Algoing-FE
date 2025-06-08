"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (value: string) => void;
  language?: string;
}

export default function CodeEditor({
  code,
  setCode,
  language,
}: CodeEditorProps) {
  return (
    <div className="w-full h-[650px] relative overflow-hidden border border-gray-300">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}
