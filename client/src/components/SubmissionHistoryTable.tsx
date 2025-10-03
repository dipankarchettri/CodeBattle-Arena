import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Submission, Problem } from "@shared/schema";

interface SubmissionWithProblem extends Submission {
  problemTitle?: string;
}

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
  const getStatusBadge = (status: Submission["status"]) => {
    switch (status) {
      case "correct":
        return (
          <Badge className="bg-primary text-primary-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        );
      case "incorrect":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <XCircle className="w-3 h-3 mr-1" />
            Wrong Answer
          </Badge>
        );
      case "error":
        return (
          <Badge className="bg-chart-2 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="bg-card border-b border-border">
          <tr>
            <th className="text-left p-4 font-semibold">Problem</th>
            <th className="text-left p-4 font-semibold">Language</th>
            <th className="text-left p-4 font-semibold">Status</th>
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
                <Badge variant="outline">{submission.language}</Badge>
              </td>
              <td className="p-4">{getStatusBadge(submission.status)}</td>
              <td className="p-4 text-muted-foreground" data-testid={`text-time-${submission.id}`}>
                {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
