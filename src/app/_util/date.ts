// 오늘 날짜 문자열
export function getTodayString() {
  const today = new Date();
  return formatDate(today);
}

// YYYY-MM-DD 포맷
export function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
