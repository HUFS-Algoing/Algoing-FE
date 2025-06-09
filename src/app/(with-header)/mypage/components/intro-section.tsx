"use client";

import { Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { userData } from "@/app/_mock/user-data";

export default function MypageIntroSection() {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-3xl shadow-xl overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-400 rounded-full blur-3xl opacity-20"></div>
          </div>

          <div className="relative px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-1 backdrop-blur-sm shadow-xl">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      width={128}
                      height={128}
                      src={"/profile5.png"}
                      alt="프로필"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                </div>
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 flex items-center justify-center md:justify-start gap-2">
                    {userData.name}
                    <motion.span
                      animate={{ rotate: [0, 15, -8, 15, -4, 10, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="text-2xl"
                    >
                      👋
                    </motion.span>
                  </h1>
                  <p className="text-violet-200 text-lg mb-4">
                    코딩 마스터가 되는 여정
                  </p>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <Trophy className="h-5 w-5 text-yellow-300" />
                    <span className="text-white font-medium">
                      Level {userData.level}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <div className="h-5 w-5 text-orange-400" />
                    <span className="text-white font-medium">
                      {userData.streak}일 연속 학습
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <Zap className="h-5 w-5 text-yellow-300" />
                    <span className="text-white font-medium">
                      {userData.totalPoints.toLocaleString()} 포인트
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Progress Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                className="hidden md:block"
              >
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />

                    {/* Progress Circle - 75% complete */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />

                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold text-white">75%</span>
                    <span className="text-xs text-violet-200">다음 레벨</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
