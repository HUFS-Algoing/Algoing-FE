"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkMode";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Searchbar from "./Search";

const menuItems = [
  { name: "추천 문제", path: "/recommend" },
  { name: "리뷰 커뮤니티", path: "/community" },
  { name: "AI 리뷰", path: "/ai-review" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-8 lg:px-24 py-3 transition-all duration-300 bg-white dark:bg-neutral-900`}
    >
      {/* 좌측 Logo & Nav */}
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className="hover:opacity-80 transition relative group">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src={"/DarkModeLogo.png"}
              alt="ALGOING Logo"
              width={100}
              height={36}
              className="h-8 sm:h-9 w-auto"
            />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex gap-1 lg:gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="relative px-3 py-2 group"
            >
              <span
                className={`text-sm font-medium transition-colors duration-200 relative z-10 ${
                  pathname === item.path
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300"
                } group-hover:text-indigo-600 dark:group-hover:text-indigo-400`}
              >
                {item.name}
              </span>
              {pathname === item.path && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-md z-0"
                  initial={{ borderRadius: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* 모바일 메뉴 버튼 */}
      <button
        className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* 모바일 메뉴 드롭다운 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 shadow-lg border-t border-gray-200 dark:border-neutral-800 md:hidden py-4 px-6"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                    pathname === item.path
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 py-2">
                  <DarkModeToggle />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    다크 모드
                  </span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 우측 검색/프로필 */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <Searchbar />

        <Link
          href="/mypage"
          className="relative group flex items-center justify-center hover:opacity-95 transition"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <Image
              src="/profile5.png"
              alt="프로필"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full border-2 border-white dark:border-neutral-800 shadow-sm object-cover"
            />
            <span className="absolute inset-0 rounded-full ring-2 ring-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}
