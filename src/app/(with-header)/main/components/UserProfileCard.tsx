"use client";

import Image from "next/image";
import { FaChartLine, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import ProgressFromSolved from "./Progress";
import { getTierName } from "@/app/_util/get-tier-name";
import { getTierColor } from "@/app/_util/get-tier-color";
import { Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContributions } from "@/app/hook/user/use-contributions";
import { useUserStore } from "@/app/_store/use-userStore";

export default function UserProfileCard({ user }: { user: any }) {
  const { userId } = useUserStore();
  const tierName = getTierName(user.tier);
  const tierColor = getTierColor(user.tier);
  const router = useRouter();

  const handleClick = () => {
    router.push("/mypage");
  };

  const { totalSolved } = useContributions(userId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50  rounded-2xl p-8 mb-10   shadow-md overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-24 h-24">
          <Image
            src={user.picture || "/profile5.png"}
            alt="프로필"
            width={96}
            height={96}
            className="rounded-full border-4 border-white dark:border-gray-700 shadow-md object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user.nickname}
            </h2>
            <span
              className={`text-xs px-2 py-1 rounded-full font-semibold shadow-sm ${tierColor}`}
            >
              <Sparkle className="inline-block mr- w-4" /> {tierName}
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
            <div className="flex items-center gap-2">
              <FaCode className="text-blue-500" />
              <span className="font-semibold">총 {totalSolved} 문제 해결</span>
            </div>

            <div className="text-xs text-gray-400">
              가입일: {new Date(user.createdAt).toLocaleDateString("ko-KR")}
            </div>
          </div>

          <div className="mt-4">
            <ProgressFromSolved userId={user.userId} />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-18 md:mt-0">
          <button
            onClick={handleClick}
            className="group relative px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold text-sm shadow hover:shadow-xl hover:scale-105 transition-all"
          >
            <FaChartLine className="inline-block mr-2" />내 활동
          </button>
        </div>
      </div>
    </motion.div>
  );
}
