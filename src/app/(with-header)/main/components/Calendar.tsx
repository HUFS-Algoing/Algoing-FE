"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useZandi } from "@/app/hook/use-zandi";

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

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = Array(42)
    .fill(null)
    .map((_, index) => {
      const day = index - firstDay + 1;
      if (day > 0 && day <= daysInMonth) {
        const dateObj = new Date(currentYear, currentMonth - 1, day);
        const dateStr = dateObj.toLocaleDateString("sv-SE");

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
    <div className="text-sm">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {currentYear}.{currentMonth}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500">로딩 중...</div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn(
                      "aspect-square rounded-lg transition-all duration-200 flex items-center justify-center text-xs font-medium",
                      day ? getColorClass(day.count) : "opacity-0"
                    )}
                  >
                    {day?.day}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <LegendItem color="bg-green-100" label="1 solved" />
            <LegendItem color="bg-green-200" label="2~3 solved" />
            <LegendItem color="bg-green-400" label="4+ solved" />
          </div>
        </>
      )}
    </div>
  );
}

function getColorClass(count: number) {
  if (count === 0) return "bg-gray-100 text-gray-400 border border-gray-200";
  if (count === 1) return "bg-green-100 text-green-700 border border-green-200";
  if (count <= 3) return "bg-green-200 text-green-800 border border-green-300";
  return "bg-green-400 text-white border border-green-500";
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-sm ${color}`} />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}
