import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Contest } from "@shared/schema";
import ContestCard from "@/components/ContestCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ContestsData {
  upcoming: Contest[];
  active: Contest[];
  past: Contest[];
}

export default function ContestsPage() {
  const { data, isLoading } = useQuery<ContestsData>({
    queryKey: ["/api/public/contests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/public/contests");
      if (!res.ok) throw new Error("Failed to fetch contests");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container py-8 flex-grow text-center">
          <p className="text-muted-foreground">Loading contests...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container py-8 flex-grow">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Competitions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse upcoming, active, and past events. Join a competition and prove your skills.
          </p>
        </div>

        {/* Active Contests Section */}
        {data?.active && data.active.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">Active Now</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.active.map(contest => <ContestCard key={contest.id} contest={contest} status="active" />)}
            </div>
          </section>
        )}

        {/* Upcoming Contests Section */}
        {data?.upcoming && data.upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">Upcoming</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.upcoming.map(contest => <ContestCard key={contest.id} contest={contest} status="upcoming" />)}
            </div>
          </section>
        )}

        {/* Past Contests Section */}
        {data?.past && data.past.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">Past Contests</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.past.map(contest => <ContestCard key={contest.id} contest={contest} status="past" />)}
            </div>
          </section>
        )}
        
        {/* Fallback Message */}
        {!isLoading && !data?.active.length && !data?.upcoming.length && (
           <div className="text-center py-12">
             <p className="text-muted-foreground text-lg">No active or upcoming contests right now. Stay tuned!</p>
           </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
