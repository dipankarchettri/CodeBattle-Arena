import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContestLobbyData } from "@shared/schema";
import { Link, useParams } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <main className="container mx-auto py-8 flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <p className="text-muted-foreground font-medium">Loading Contest...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <Navbar />
            <main className="container mx-auto py-8 flex-grow flex items-center justify-center relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl p-12 rounded-2xl text-center max-w-md w-full"
                >
                    <div className="bg-primary/10 p-4 rounded-full inline-flex mb-6">
                      <LogIn className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Authentication Required</h2>
                    <p className="text-muted-foreground mb-8 text-lg">You must be logged in to view this contest.</p>
                    <Button asChild size="lg" className="w-full text-md font-semibold shadow-lg shadow-primary/20">
                        <Link href={`/login?redirect=/contests/${contestId}`}>Login to Continue</Link>
                    </Button>
                </motion.div>
            </main>
        </div>
    );
  }

  if (isError || !contest) {
    return (
      <div className="min-h-screen bg-background flex flex-col relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-destructive/10 rounded-full blur-[120px] pointer-events-none" />
        <Navbar />
        <main className="container mx-auto py-8 flex-grow flex items-center justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold mb-4">Contest Not Found</h2>
              <p className="text-muted-foreground text-lg mb-8">We couldn't find the contest you were looking for. It may have been removed.</p>
              <Button asChild variant="default" size="lg" className="shadow-lg">
                <Link href="/contests">Back to All Contests</Link>
              </Button>
            </motion.div>
        </main>
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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-chart-2/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Navbar />
      <main className="container mx-auto py-12 flex-grow relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Badge variant={isActive ? "default" : (isUpcoming ? "secondary" : "outline")} className="mb-6 text-sm py-1 px-4">
            {isActive ? "🔴 LIVE NOW" : (isUpcoming ? "UPCOMING EVENT" : "PAST EVENT")}
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            {contest.title}
          </h1>
          
          {isUpcoming && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="my-12 bg-card/40 backdrop-blur-2xl border border-border/50 p-10 rounded-3xl shadow-2xl shadow-primary/5"
            >
              <h2 className="text-xl font-medium mb-8 text-muted-foreground uppercase tracking-widest">Contest Starts In</h2>
              <div className="flex justify-center scale-110">
                <Countdown targetDate={new Date(contest.startTime).toISOString()} onComplete={refetch} />
              </div>
            </motion.div>
          )}
          
          {isActive && (
            <div className="my-12 py-8 bg-primary/10 border border-primary/20 rounded-3xl backdrop-blur-sm animate-pulse">
              <p className="text-3xl text-primary font-bold">The contest is currently running!</p>
            </div>
          )}
          
          {hasEnded && (
            <div className="my-12 py-8 bg-muted/30 border border-border rounded-3xl">
              <p className="text-2xl text-muted-foreground font-medium">This contest has concluded.</p>
            </div>
          )}
          
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 my-10">
            <div className="flex items-center gap-3 bg-card/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-border/50 shadow-sm">
              <div className="bg-primary/10 p-2 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground font-medium">Registered</div>
                <div className="text-xl font-bold">{contest.participantCount} Developers</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-card/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-border/50 shadow-sm">
              <div className="bg-chart-2/10 p-2 rounded-xl">
                <ListChecks className="w-6 h-6 text-chart-2" />
              </div>
              <div className="text-left">
                <div className="text-sm text-muted-foreground font-medium">Challenges</div>
                <div className="text-xl font-bold">{(isActive || hasEnded) ? `${contest.problems.length} Problems` : `Locked`}</div>
              </div>
            </div>
          </div>
          
          {isUpcoming && !contest.isRegistered && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => registerMutation.mutate()} 
                disabled={registerMutation.isPending} 
                size="lg"
                className="h-14 px-10 text-lg font-bold shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.7)] transition-shadow duration-300 rounded-full"
              >
                {registerMutation.isPending ? "Securing Your Spot..." : "Register Now"}
              </Button>
            </motion.div>
          )}
          
          {isUpcoming && contest.isRegistered && (
            <div className="inline-flex items-center gap-3 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-8 py-4 rounded-full">
              <span className="text-xl">✅</span>
              <span className="font-bold text-lg">You are registered and ready to go!</span>
            </div>
          )}
        </motion.div>

        {(isActive || hasEnded) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mt-24"
          >
            <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
              <h2 className="text-3xl font-bold tracking-tight">Contest Problems</h2>
              <Badge variant="outline" className="text-sm">{contest.problems.length} Challenges</Badge>
            </div>
            
            <div className="grid gap-4">
              {contest.problems.map((problem, idx) => (
                <Link key={problem.id} href={`/problems/${problem.id}`}>
                  <a className="block group">
                    <Card className="bg-card/40 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md hover:border-primary/40 hover:bg-card/80 transition-all duration-300">
                      <CardHeader className="py-5 px-6 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {idx + 1}
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">{problem.title}</CardTitle>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground rounded-full transition-all">
                          Solve
                        </Button>
                      </CardHeader>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
