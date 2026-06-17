import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useParams, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import type { Contest } from "@shared/schema";
import { format } from "date-fns";
import { Users, Trophy, Code2, Clock } from "lucide-react";

interface ContestStats {
  totalParticipants: number;
  participants: Array<{ id: string; username: string; email: string }>;
  leaderboard: Array<{ username: string; score: number; timePenalty: number }>;
  totalSubmissions: number;
}

export default function AdminContestView() {
  const params = useParams<{ id: string }>();
  const contestId = params.id!;

  const { data: contest, isLoading: isContestLoading, error: contestError } = useQuery<Contest>({
    queryKey: ["/api/contests", contestId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/contests/${contestId}`);
      if (!res.ok) throw new Error("Failed to fetch contest");
      return res.json();
    },
  });

  const { data: stats, isLoading: isStatsLoading, error: statsError } = useQuery<ContestStats>({
    queryKey: ["/api/admin/contests", contestId, "stats"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/contests/${contestId}/stats`);
      if (!res.ok) throw new Error("Failed to fetch contest stats");
      return res.json();
    },
  });

  const isLoading = isContestLoading || isStatsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container mx-auto py-12 flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
             <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
             <p className="text-muted-foreground">Loading Contest Stats...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!contest || !stats) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container mx-auto py-12 flex-grow text-center">
          <h2 className="text-3xl font-bold mb-4">Contest Not Found</h2>
          <p className="text-muted-foreground mb-4">
            Debug Info: Contest: {contest ? 'Found' : 'Missing'} | Stats: {stats ? 'Found' : 'Missing'}
          </p>
          {contestError && <p className="text-destructive mb-2">Contest Error: {contestError.message}</p>}
          {statsError && <p className="text-destructive mb-4">Stats Error: {statsError.message}</p>}
          <Button asChild><Link href="/contests">Back to Contests</Link></Button>
        </main>
      </div>
    );
  }

  const now = new Date();
  const startTime = new Date(contest.startTime);
  const endTime = new Date(contest.endTime);
  const isFutureOrActive = endTime > now;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 w-full py-12 flex-grow">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">{contest.title}</h1>
            <div className="flex gap-4 text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {format(startTime, 'PPp')} - {format(endTime, 'p')}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {stats.totalParticipants} Registered</span>
            </div>
          </div>
          <Button variant="outline" asChild><Link href="/contests">Back</Link></Button>
        </div>

        {!isFutureOrActive ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border/50 p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-3xl font-bold">{stats.totalParticipants}</h3>
                <p className="text-muted-foreground">Participants</p>
              </div>
              <div className="bg-card border border-border/50 p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                <Code2 className="w-8 h-8 text-chart-2 mb-3" />
                <h3 className="text-3xl font-bold">{stats.totalSubmissions}</h3>
                <p className="text-muted-foreground">Submissions</p>
              </div>
              <div className="bg-card border border-border/50 p-6 rounded-xl shadow-sm flex flex-col items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
                <h3 className="text-3xl font-bold">{stats.leaderboard.filter(l => l.score > 0).length}</h3>
                <p className="text-muted-foreground">Solvers</p>
              </div>
            </div>

            <div className="card bg-card p-8 rounded-xl shadow-sm border border-border/50">
              <h2 className="text-2xl font-bold mb-6 border-b pb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" /> Contest Leaderboard
              </h2>
              {stats.leaderboard.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-muted/30 border-b">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Rank</th>
                        <th className="py-3 px-4 font-semibold">Username</th>
                        <th className="py-3 px-4 font-semibold text-center">Score (Solved)</th>
                        <th className="py-3 px-4 font-semibold text-right">Time Penalty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.leaderboard.map((entry, index) => (
                        <tr key={entry.username} className={`border-b hover:bg-muted/10 ${index < 3 ? 'bg-primary/5' : ''}`}>
                          <td className="py-4 px-4 font-medium text-lg">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                          </td>
                          <td className="py-4 px-4 font-bold">{entry.username}</td>
                          <td className="py-4 px-4 text-center font-bold text-primary">{entry.score}</td>
                          <td className="py-4 px-4 text-right text-muted-foreground">{Math.floor(entry.timePenalty / 60)} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                 <p className="text-muted-foreground py-8 text-center bg-muted/20 rounded-lg">No submissions yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="card bg-card p-8 rounded-xl shadow-sm border border-border/50">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" /> Registered Participants
            </h2>
            {stats.participants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.participants.map((p) => (
                  <div key={p.id} className="p-4 rounded-lg border border-border/50 bg-muted/20 flex flex-col">
                    <span className="font-bold text-lg">{p.username}</span>
                    <span className="text-muted-foreground text-sm">{p.email}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground py-8 text-center bg-muted/20 rounded-lg">No participants have registered yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
