import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContestLobbyData } from "@shared/schema";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Countdown from "@/components/Countdown";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ListChecks, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function ContestLobby() {
  const params = useParams<{ id: string }>();
  const contestId = params.id!;
  const { toast } = useToast();
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  
  const { user, isLoading: isAuthLoading } = useAuth();

  // ✅ THIS IS THE CRITICAL DEBUGGING STEP ✅
  // This will log on every render and show us the exact state of our auth variables.
  console.log({
    isAuthLoading,
    isUserPresent: !!user,
    isQueryEnabled: !!contestId && !isAuthLoading && !!user
  });

  const { data: contest, isLoading: isContestLoading, isError, refetch } = useQuery<ContestLobbyData>({
    queryKey: ["/api/contests/lobby", contestId, user?.id],
    queryFn: async () => {
      console.log("Making API call to /api/contests/:id/lobby..."); // We want to see this
      const res = await apiRequest("GET", `/api/contests/${contestId}/lobby`);
      if (!res.ok) {
        setErrorStatus(res.status);
        throw new Error("Failed to fetch contest data");
      }
      const data = await res.json();
      console.log("Data received from API:", data);
      return data;
    },
    enabled: !!contestId && !isAuthLoading && !!user,
    retry: false,
  });

  const registerMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/contests/${contestId}/register`),
    onSuccess: () => {
      toast({ title: "Registration Successful!", description: "You have joined the contest." });
      queryClient.invalidateQueries({ queryKey: ["/api/contests/lobby", contestId] });
    },
    onError: (error: Error) => {
      toast({ title: "Registration Failed", description: error.message, variant: "destructive" });
    }
  });

  const isLoading = isAuthLoading || isContestLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container py-8 flex-grow text-center">
          <p className="text-muted-foreground">Loading Contest...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="container py-8 flex-grow text-center">
                <div>
                    <LogIn className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                    <p className="text-muted-foreground mb-6">You must be logged in to view this contest.</p>
                    <Button asChild>
                        <Link href={`/login?redirect=/contests/${contestId}`}>Login</Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
  }

  if (isError || !contest) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="container py-8 flex-grow text-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contest Not Found</h2>
              <p className="text-muted-foreground mb-6">We couldn't find the contest you were looking for.</p>
              <Button asChild variant="outline">
                <Link href="/contests">Back to All Contests</Link>
              </Button>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  const now = new Date();
  const contestStartTime = new Date(contest.startTime);
  const contestEndTime = new Date(contest.endTime);
  const isUpcoming = contestStartTime > now;
  const isActive = contestStartTime <= now && contestEndTime > now;
  const hasEnded = contestEndTime <= now;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container py-8 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">{contest.title}</h1>
          {isUpcoming && (
            <div className="my-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-brand">Contest Starts In</h2>
              <div className="flex justify-center">
                <Countdown targetDate={new Date(contest.startTime).toISOString()} onComplete={refetch} />
              </div>
            </div>
          )}
          {isActive && <p className="text-xl text-primary-brand font-semibold my-6">Contest is LIVE!</p>}
          {hasEnded && <p className="text-xl text-muted-foreground my-6">This contest has ended.</p>}
          <div className="flex justify-center items-center gap-6 my-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>{contest.participantCount} Registered</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ListChecks className="w-5 h-5" />
              <span>{(isActive || hasEnded) ? `${contest.problems.length} Problems` : `Problems Locked`}</span>
            </div>
          </div>
          {isUpcoming && !contest.isRegistered && (
            <Button onClick={() => registerMutation.mutate()} disabled={registerMutation.isPending} size="lg">
              {registerMutation.isPending ? "Registering..." : "Register Now"}
            </Button>
          )}
          {isUpcoming && contest.isRegistered && (
            <p className="font-semibold text-primary-brand text-lg">✅ You are registered!</p>
          )}
        </div>
        {(isActive || hasEnded) && (
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Contest Problems</h2>
            <div className="space-y-4">
              {contest.problems.map(problem => (
                <Link key={problem.id} href={`/problems/${problem.id}`}>
                  <a className="block">
                    <Card className="hover:border-primary-brand transition-colors cursor-pointer">
                      <CardHeader>
                        <CardTitle>{problem.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
