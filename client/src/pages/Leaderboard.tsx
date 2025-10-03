import Navbar from "@/components/Navbar";
import LeaderboardTable from "@/components/LeaderboardTable";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Live Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">
            Real-time rankings updated as participants solve problems. Tie-breakers based on submission time.
          </p>
        </div>

        <Card id="leaderboard">
          <LeaderboardTable />
        </Card>
      </div>
    </div>
  );
}
