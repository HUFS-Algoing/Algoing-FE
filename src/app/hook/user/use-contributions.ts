import calculateMaxStreak from "@/app/_util/calculate-max-streak";
import { useZandi } from "@/app/hook/use-zandi";

export function useContributions(userId: number) {
  const { data: contributions = [], isLoading } = useZandi(userId);

  const totalSolved = contributions.reduce((sum, c) => sum + c.count, 0);

  const activeDays = contributions.filter((c) => c.count > 0).length;

  const maxStreak = calculateMaxStreak(contributions);

  return {
    contributions,
    isLoading,
    totalSolved,
    activeDays,
    maxStreak,
  };
}
