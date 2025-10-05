import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import ProblemCard from "@/components/ProblemCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Problem } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Problems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const { data: problems = [], isLoading } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/problems");
      if (!res.ok) throw new Error("Failed to fetch problems");
      return res.json();
    }
  });

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSolveProblem = (problemId: string) => {
    setLocation(`/problems/${problemId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Problem Set</h1>
          <p className="text-muted-foreground mb-6">
            Choose a problem to solve and test your coding skills.
          </p>
          
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search problems..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-problems"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading problems...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  title={problem.title}
                  // ✅ THIS IS THE FIX ✅
                  // We use a type assertion to tell TypeScript that this string
                  // is one of the specific allowed values, resolving the type error.
                  difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"}
                  description={problem.description}
                  timeLimit={`${problem.timeLimit / 1000} second${problem.timeLimit !== 1000 ? 's' : ''}`}
                  onSolve={() => handleSolveProblem(problem.id)}
                />
              ))}
            </div>

            {filteredProblems.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No problems found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

