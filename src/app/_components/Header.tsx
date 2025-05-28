"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkMode";
import { motion, AnimatePresence } from "framer-motion";
const menuItems = [
  { name: "추천 문제", path: "/recommend" },
  { name: "리뷰 커뮤니티", path: "/community" },
  { name: "AI 리뷰", path: "/ai-review" },
];

export default function Header() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-8 lg:px-24 py-3 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-neutral-900"
      }`}
    >
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className="hover:opacity-80 transition relative group">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src={isDarkMode ? "/DarkModeLogo.png" : "/LightModeLogo.png"}
              alt="ALGOING Logo"
              className="h-8 sm:h-9"
            />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
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

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu */}
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

      {/* Desktop Right Section */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        {/* Search */}
        <div
          className={`relative transition-all duration-300 ${isSearchFocused ? "w-64 lg:w-72" : "w-48 lg:w-60"}`}
        >
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-opacity ${
              isSearchFocused ? "opacity-100" : "opacity-70"
            }`}
          >
            <Search size={16} className="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="문제 번호, 제목, 키워드"
            className={`text-sm pl-10 pr-4 py-2 rounded-full border transition-all duration-300 w-full ${
              isSearchFocused
                ? "border-indigo-300 dark:border-indigo-700 bg-white dark:bg-neutral-800 shadow-sm ring-2 ring-indigo-100 dark:ring-indigo-900/30"
                : "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-neutral-800/70"
            } text-gray-700 dark:text-gray-100 focus:outline-none`}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <DarkModeToggle />
        </div>

        {/* Notification */}
        <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
          <Bell size={20} />
          {hasNotification && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full">
              <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-75"></span>
            </span>
          )}
        </button>

        {/* Profile */}
        <Link
          href="/mypage"
          className="relative group flex items-center justify-center hover:opacity-95 transition"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <img
              src="/profile2.jpg"
              alt="프로필"
              className="w-9 h-9 rounded-full border-2 border-white dark:border-neutral-800 shadow-sm object-cover"
            />
            <span className="absolute inset-0 rounded-full ring-2 ring-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}
