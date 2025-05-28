"use client";

import type React from "react";

import { useState } from "react";
import {
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  AtSign,
  FileText,
} from "lucide-react";

export default function CommentEditor() {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting comment:", comment);
    // Here you would typically send the comment to your API
    setComment("");
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 mb-2">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "write"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("write")}
        >
          Write
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "preview"
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {activeTab === "write" ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-2 border-b border-gray-200 pb-2">
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Code"
              >
                <Code className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Link"
              >
                <Link className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Bulleted List"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="Mention"
              >
                <AtSign className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100"
                title="File"
              >
                <FileText className="h-4 w-4" />
              </button>
            </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={5}
              placeholder="Leave a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Attach files by dragging & dropping, selecting or pasting them.
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="border border-gray-300 rounded-md p-3 min-h-[150px] text-gray-700">
          {comment ? (
            <div dangerouslySetInnerHTML={{ __html: comment }} />
          ) : (
            <div className="text-gray-400 italic">Nothing to preview</div>
          )}
        </div>
      )}
    </div>
  );
}
