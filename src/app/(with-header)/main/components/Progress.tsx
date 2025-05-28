"use client";

import { motion } from "framer-motion";

interface ProgressProps {
  value: number;
  className?: string;
}

export default function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div
      className={`relative w-full h-[8px] rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-700 shadow-inner ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 dark:from-purple-600 dark:via-pink-500 dark:to-indigo-600 relative"
      >
        <div className="absolute inset-0 bg-white/20 w-full h-full bg-[length:10px_10px] bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent_100%)]" />
      </motion.div>
    </div>
  );
}
