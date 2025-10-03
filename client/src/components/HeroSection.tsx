import { Button } from "@/components/ui/button";
import { Code, Zap } from "lucide-react";

export default function HeroSection() {
  const handleRegister = () => {
    console.log("Register clicked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewLeaderboard = () => {
    console.log("View leaderboard clicked");
    const leaderboardSection = document.getElementById("leaderboard");
    leaderboardSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/Hero_background_coding_visualization_45355549.png)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Live Coding Competitions
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Compete. <span className="text-primary">Code.</span> Conquer.
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              Master debugging challenges and competitive programming. Real-time
              judging, live leaderboards, and fair play guaranteed.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={handleRegister}
                data-testid="button-hero-register"
                className="text-lg px-8"
              >
                <Code className="w-5 h-5 mr-2" />
                Register for Event
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleViewLeaderboard}
                data-testid="button-hero-leaderboard"
                className="text-lg px-8 bg-background/50 backdrop-blur-sm"
              >
                View Leaderboard
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-card-border rounded-lg p-8 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-chart-2" />
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-muted-foreground ml-2">
                    solution.py
                  </span>
                </div>
                <pre className="text-foreground/90">
                  <code>{`def solve(n):
    if n <= 1:
        return n
    return solve(n-1) + solve(n-2)

# Test case
print(solve(10))  # Output: 55`}</code>
                </pre>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-xs">
                      Status: Accepted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
