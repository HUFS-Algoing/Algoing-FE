"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchProblems } from "@/app/hook/problem/use-search-problems";
import { Search, Code, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Searchbar() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(keyword, 300);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { data, isLoading } = useSearchProblems(
    debouncedKeyword,
    !!debouncedKeyword
  );

  const searchResults = data?.result || data;
  const hasResults = Array.isArray(searchResults) && searchResults.length > 0;
  const shouldShowDropdown = isSearchFocused && keyword.trim().length > 0;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={wrapperRef}
      className={`relative transition-all duration-300 ${isSearchFocused ? "w-64 lg:w-72" : "w-48 lg:w-60"}`}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={(e) => {
          requestAnimationFrame(() => {
            const active = document.activeElement;
            if (
              e.currentTarget &&
              e.currentTarget.parentElement &&
              !e.currentTarget.parentElement.contains(active)
            ) {
              setIsSearchFocused(false);
            }
          });
        }}
        placeholder="문제 번호, 제목, 키워드 ⏎ "
        className={`text-sm pl-10 pr-4 py-2 rounded-full border w-full transition-all duration-300 focus:outline-none text-gray-700 dark:text-gray-100 ${
          isSearchFocused
            ? "border-indigo-300 dark:border-indigo-700 bg-white dark:bg-neutral-800 shadow-sm ring-2 ring-indigo-100 dark:ring-indigo-900/30"
            : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800/70"
        }`}
      />

      <AnimatePresence>
        {shouldShowDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 w-full bg-white border border-gray-200  shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent"
            onMouseDown={(e) => e.preventDefault()}
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {isLoading ? (
              <div className="p-6 flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <Loader2 className="h-5 w-5 animate-spin mb-2" />
                <span>검색 중...</span>
              </div>
            ) : hasResults ? (
              <div className="py-2">
                {searchResults.map((problem, index) => (
                  <Link
                    key={problem.problemId}
                    href={`/code/${problem.problemId}`}
                    onClick={() => {
                      setKeyword("");
                      setIsSearchFocused(false);
                    }}
                    className="block px-4 py-3 hover:bg-indigo-50/70 dark:hover:bg-neutral-800/70 transition-colors"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <Code
                            size={15}
                            className="text-indigo-600 dark:text-indigo-400"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {problem.title}
                          </div>
                          {problem.problemId && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              #{problem.problemId}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                          Lv.{problem.level}
                        </span>
                      </div>
                    </div>
                    {index < searchResults.length - 1 && (
                      <div className="mt-3 border-b border-gray-100 dark:border-neutral-800"></div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                <AlertCircle className="h-5 w-5 mb-2" />
                <span>&quot;{keyword}&quot; 검색 결과가 없습니다.</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
