"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "추천 문제", path: "/recommend" },
  { name: "리뷰 커뮤니티", path: "/community" },
  { name: "AI 리뷰", path: "/ai-review" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex justify-between items-center px-24 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-10">
        <Link href="/">
          <img src="/logo.png" alt="ALGOING Logo" className="h-8" />
        </Link>

        <nav className="flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium ${
                pathname === item.path ? "text-primary" : "text-gray-700"
              } hover:text-primary hover:font-bold transition`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="문제번호, 제목, 키워드"
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 focus:outline-none"
        />
        <img
          src="/profile-icon.png"
          alt="프로필"
          className="w-8 h-8 rounded-full border-2 border-yellow-300"
        />
      </div>
    </header>
  );
}
