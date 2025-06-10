"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Searchbar from "./Search";
import Logo from "../icon/main-logo.svg";
import { useUserStore } from "../_store/use-userStore";
import { logoutApi } from "../_api/login/logout";

const menuItems = [
  { name: "추천 문제", path: "/recommend" },
  { name: "AI 리뷰", path: "/ai-review" },
  { name: "내 활동", path: "/mypage" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { picture, username } = useUserStore();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
      document.cookie = "accessToken=; Max-Age=0; Path=/; Domain=.al-going.com";
      clearUser();
      setIsProfileMenuOpen(false);
      window.location.href = "/login";
      console.error("로그아웃 성공");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 sm:px-8 lg:px-24 py-3 transition-all duration-300 bg-white dark:bg-neutral-900 border-b border-gray-100 dark:border-neutral-800`}
    >
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className=" transition relative group">
          <div>
            <Logo className="w-[160px] h-[50px]" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-1 lg:gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="relative px-3 py-2 group"
            >
              <span
                className={`text-sm font-bold transition-colors duration-200 relative z-10 ${
                  pathname === item.path
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-gray-700 dark:text-gray-300 font-semibold"
                } group-hover:text-indigo-600 dark:group-hover:text-indigo-400`}
              >
                {item.name}
              </span>
              {pathname === item.path && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-indigo-50 rounded-md z-0"
                  initial={{ borderRadius: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      <button
        className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700  hover:bg-gray-100 rounded-full"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white  shadow-lg border-t border-gray-200 md:hidden py-4 px-6"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-base font-medium py-2 px-3 rounded-md transition-colors ${
                    pathname === item.path
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 "
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 "
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-gray-200 dark:border-neutral-700 pt-4 mt-2">
                <Link
                  href="/mypage"
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50  py-2 px-3 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />내 프로필
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50  py-2 px-3 rounded-md transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <Searchbar />

        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="relative group flex items-center gap-2 hover:opacity-95 transition-all duration-200 p-1 rounded-full hover:bg-gray-50 "
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <Image
                src={picture || "/profile5.png"}
                alt="프로필"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-white  shadow-sm object-cover"
              />
              <span className="absolute inset-0 rounded-full ring-2 ring-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </motion.div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500  transition-transform duration-200 ${
                isProfileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100 ">
                  <div className="flex items-center gap-3">
                    <Image
                      src={picture || "/profile5.png"}
                      alt="프로필"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 ">
                        {username || "사용자"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/mypage"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100  transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />내 프로필
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
