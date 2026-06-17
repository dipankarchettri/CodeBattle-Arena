import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { VerdictBadge } from "@/components/VerdictBadge";
import { formatDistanceToNow } from "date-fns";
import { Timer } from "lucide-react";
import type { Submission, Problem } from "@shared/schema";

export default function SubmissionHistoryTable() {
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery<Submission[]>({
    queryKey: ["/api/submissions"],
  });

  const { data: problems = [] } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
  });

  if (submissionsLoading) {
    return (
      <div className="w-full p-12 text-center">
        <p className="text-muted-foreground">Loading submissions...</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="w-full p-12 text-center">
        <p className="text-muted-foreground">No submissions yet. Start solving problems to see your history!</p>
      </div>
    );
  }

  const getProblemTitle = (problemId: string) => {
    const problem = problems.find(p => p.id === problemId);
    return problem?.title || "Unknown Problem";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="bg-card border-b border-border">
          <tr>
            <th className="text-left p-4 font-semibold">Problem</th>
            <th className="text-left p-4 font-semibold">Language</th>
            <th className="text-left p-4 font-semibold">Verdict</th>
            <th className="text-left p-4 font-semibold">Time</th>
            <th className="text-left p-4 font-semibold">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr
              key={submission.id}
              className="border-b border-border hover-elevate"
              data-testid={`row-submission-${submission.id}`}
            >
              <td className="p-4 font-medium" data-testid={`text-problem-${submission.id}`}>
                {getProblemTitle(submission.problemId)}
              </td>
              <td className="p-4">
                <Badge variant="outline" className="font-mono text-xs">
                  {submission.language}
                </Badge>
              </td>
              <td className="p-4">
                <VerdictBadge verdict={submission.verdict} status={submission.status} />
              </td>
              <td className="p-4 text-muted-foreground text-sm">
                {submission.executionTime != null ? (
                  <span className="flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {submission.executionTime}ms
                  </span>
                ) : (
                  <span className="text-muted-foreground/50">—</span>
                )}
              </td>
              <td className="p-4 text-muted-foreground text-sm" data-testid={`text-time-${submission.id}`}>
                {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
