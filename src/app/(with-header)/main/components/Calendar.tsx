"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useZandi } from "@/app/hook/use-zandi";
import { formatDate } from "@/app/_util/date";
import { getGitHubColorClass } from "@/app/_util/color-class";

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

  const { data: contributions = [], isLoading } = useZandi(userId);

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

  const weeks = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(calendarDays.slice(i * 7, (i + 1) * 7));
  }

  const totalSolved = contributions.reduce((sum, c) => sum + c.count, 0);
  const activeDays = contributions.filter((c) => c.count > 0).length;
  const maxStreak = calculateMaxStreak(contributions);

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
    <div className="bg-white /50 rounded-xl p-6 border border-gray-200/70 shadow-sm">
      <div className="flex items-center justify-evenly  mb-6">
        <div className="grid grid-cols-3 items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="justify-self-start p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600 " />
          </button>
          <h2 className="text-center text-base font-semibold text-gray-900 ">
            {currentYear}년 {currentMonth}월
          </h2>
          <button
            onClick={handleNextMonth}
            className="justify-self-end p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600 " />
          </button>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-600  mb-4">
        <div className="flex items-center gap-1">
          <CalendarCheck className="w-4 h-4" />
          <span>총 {totalSolved}일</span>
        </div>
        <div>
          활동일수 {activeDays}일 · 최대 연속 {maxStreak}일
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
                className="text-center text-xs font-medium text-gray-500  py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1 relative">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn(
                      "aspect-square rounded-md transition-all duration-200 flex items-center justify-center text-xs font-medium cursor-pointer relative group",
                      day ? getGitHubColorClass(day.count) : "opacity-0"
                    )}
                  >
                    {day?.day}
                    {day && (
                      <div className="absolute inset-0 rounded-md border-2 border-transparent  transition-colors"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200/50">
            <div className="flex items-center gap-2 text-xs text-gray-600 ">
              <span>적음</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-100  border border-gray-200 " />
                <div className="w-3 h-3 rounded-sm bg-green-100  border border-green-200 " />
                <div className="w-3 h-3 rounded-sm bg-green-300  border border-green-400 " />
                <div className="w-3 h-3 rounded-sm bg-green-500  border border-green-600 " />
                <div className="w-3 h-3 rounded-sm bg-green-900  border border-green-900 " />
              </div>
              <span>많음</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 최대 연속 활동일 계산
function calculateMaxStreak(
  contributions: Array<{ date: string; count: number }>
) {
  let maxStreak = 0;
  let currentStreak = 0;

  const sorted = contributions
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  for (const c of sorted) {
    if (c.count > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
}
