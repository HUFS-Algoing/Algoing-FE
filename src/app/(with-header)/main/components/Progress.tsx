"use client";

interface ProgressProps {
  value: number;
  className?: string;
}

export default function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div
      className={`relative w-full h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-neutral-700 shadow-inner ${className}`}
    >
      <div
        className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 dark:from-purple-700 dark:via-pink-600 dark:to-indigo-700 shadow-md transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
