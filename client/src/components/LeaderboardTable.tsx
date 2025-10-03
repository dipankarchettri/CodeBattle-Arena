import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface LeaderboardEntry {
  userId: string;
  username: string;
  email: string;
  problemsSolved: number;
  lastSubmissionTime: string | null;
}

export default function LeaderboardTable() {
  const { data: leaderboard = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  if (isLoading) {
    return (
      <div className="w-full p-12 text-center">
        <p className="text-muted-foreground">Loading leaderboard...</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="w-full p-12 text-center">
        <p className="text-muted-foreground">No submissions yet. Be the first to solve a problem!</p>
      </div>
    );
  }
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-chart-2" />
          <span className="font-bold text-lg">{rank}</span>
        </div>
      );
    }
    if (rank === 2 || rank === 3) {
      return (
        <div className="flex items-center gap-2">
          <Medal className={`w-5 h-5 ${rank === 2 ? "text-muted-foreground" : "text-chart-2/60"}`} />
          <span className="font-semibold">{rank}</span>
        </div>
      );
    }
    return <span className="font-medium">{rank}</span>;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-card border-b border-border">
          <tr>
            <th className="text-left p-4 font-semibold">Rank</th>
            <th className="text-left p-4 font-semibold">Participant</th>
            <th className="text-left p-4 font-semibold">Problems Solved</th>
            <th className="text-left p-4 font-semibold">Last Submission</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => {
            const rank = index + 1;
            return (
              <tr
                key={entry.userId}
                className={`border-b border-border hover-elevate ${
                  index % 2 === 1 ? "bg-card" : ""
                }`}
                data-testid={`row-leaderboard-${rank}`}
              >
                <td className="p-4">{getRankBadge(rank)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(entry.username)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium" data-testid={`text-name-${rank}`}>
                      {entry.username}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="secondary" data-testid={`text-problems-${rank}`}>
                    {entry.problemsSolved} solved
                  </Badge>
                </td>
                <td className="p-4 text-muted-foreground" data-testid={`text-time-${rank}`}>
                  {entry.lastSubmissionTime
                    ? formatDistanceToNow(new Date(entry.lastSubmissionTime), { addSuffix: true })
                    : "No submissions"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
