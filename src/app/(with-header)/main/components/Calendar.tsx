"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { cn } from "@/app/_lib/utils";
import { formatDate } from "@/app/_util/date";
import { getGitHubColorClass } from "@/app/_util/color-class";
import { useContributions } from "@/app/hook/user/use-contributions";

export default function ContributionCalendar({
  userId,
  year,
  month,
}: {
  userId: number;
  year: number;
  month: number;
}) {
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const { contributions, isLoading, activeDays, maxStreak } =
    useContributions(userId);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = Array(42)
    .fill(null)
    .map((_, index) => {
      const day = index - firstDay + 1;
      if (day > 0 && day <= daysInMonth) {
        const dateObj = new Date(currentYear, currentMonth - 1, day);
        const dateStr = formatDate(dateObj);
        const contribution = contributions.find((c) => c.date === dateStr);
        return {
          day,
          count: contribution?.count || 0,
          date: dateStr,
        };
      }
      return null;
    });

  const weeks: Array<
    Array<{ day: number; count: number; date: string } | null>
  > = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(calendarDays.slice(i * 7, (i + 1) * 7));
  }

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white/50 rounded-xl p-6 border border-gray-200/70 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <h2 className="text-base font-semibold text-gray-900">
          {currentYear}년 {currentMonth}월
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-end text-xs text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <CalendarCheck className="w-4 h-4" />
          <span>
            {" "}
            활동일수 {activeDays}일 · 최대 연속 {maxStreak}일{" "}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-8">
          <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2" />
          로딩 중...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="relative space-y-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn(
                      "aspect-square rounded-md transition-all duration-200 flex items-center justify-center text-xs font-medium cursor-pointer relative",
                      day ? getGitHubColorClass(day.count) : "opacity-0"
                    )}
                    onMouseEnter={() => day && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {day?.day}

                    {day && hoveredDay?.date === day.date && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg shadow-lg z-20 whitespace-nowrap">
                        <div className="font-semibold">
                          {day.count}개 제출 성공
                        </div>
                        <div className="text-gray-300 dark:text-gray-600">
                          {day.date}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>적음</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-200" />
                <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-200" />
                <div className="w-3 h-3 rounded-sm bg-green-300 border border-green-400" />
                <div className="w-3 h-3 rounded-sm bg-green-500 border border-green-600" />
                <div className="w-3 h-3 rounded-sm bg-green-900 border border-green-900" />
              </div>
              <span>많음</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
