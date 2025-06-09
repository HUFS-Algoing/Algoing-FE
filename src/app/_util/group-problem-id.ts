interface Submission {
  problemId?: number;
  title: string;
  level: number;
  language: string;
  submittedDate: string;
  submittedProblemId?: string;
  answer?: string;
  description?: string;
}

interface GroupedProblem {
  title: string;
  level: number;
  language: string;
  submittedDate: string;
  submittedProblemId?: string;
  answer?: string;
  description?: string;
  problemId?: number;
  submissionCount: number;
  submissions: Submission[];
}

export function groupProblemsById(
  solvedProblems: Submission[]
): GroupedProblem[] {
  const grouped: Record<string, GroupedProblem> = solvedProblems.reduce(
    (acc, problem) => {
      const problemKey = problem.problemId?.toString() || problem.title;

      if (!acc[problemKey]) {
        acc[problemKey] = {
          ...problem,
          submissions: [problem],
          submissionCount: 1,
        };
      } else {
        acc[problemKey].submissions.push(problem);
        acc[problemKey].submissionCount += 1;

        const latestDate = new Date(problem.submittedDate);
        const currentDate = new Date(acc[problemKey].submittedDate);

        if (latestDate > currentDate) {
          acc[problemKey] = {
            ...problem,
            submissions: acc[problemKey].submissions,
            submissionCount: acc[problemKey].submissionCount,
          };
        }
      }

      return acc;
    },
    {}
  );

  return Object.values(grouped);
}
