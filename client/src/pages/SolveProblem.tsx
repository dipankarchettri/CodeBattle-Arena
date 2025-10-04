import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Problem } from "@shared/schema";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import AntiCheatWarning from "@/components/AntiCheatWarning";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Type definition for the example cases array for type safety
interface ExampleCase {
  input: string;
  output: string;
  explanation?: string;
}

export default function SolveProblem({ params }: { params: { id: string } }) {
  const { id: problemId } = params;

  // --- Anti-Cheating State ---
  const [infractions, setInfractions] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const maxInfractions = 3;

  // --- Robust Data Fetching ---
  const { data: problem, isLoading, isError } = useQuery<Problem>({
    queryKey: ["/api/problems", problemId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/problems/${problemId}`);
      if (!res.ok) throw new Error("Problem not found");
      return res.json();
    },
    retry: false,
  });

  // --- Robust Anti-Cheating Logic ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isLocked) {
        setInfractions(prev => {
          const newCount = prev + 1;
          setShowWarning(true);
          if (newCount >= maxInfractions) {
            setIsLocked(true);
          }
          return newCount;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLocked]);

  const handleDismissWarning = () => {
    setShowWarning(false);
  };

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (isError || !problem) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Problem Not Found</h2>
            <p className="text-muted-foreground mb-6">We couldn't find the problem you were looking for.</p>
            <Button asChild variant="outline">
              <Link href="/problems">Back to Problems</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Helper for difficulty badge colors
  const getDifficultyVariant = (difficulty: string): "default" | "secondary" | "destructive" => {
    switch (difficulty) {
      case "Easy": return "default";
      case "Medium": return "secondary";
      case "Hard": return "destructive";
      default: return "default";
    }
  };

  // --- Polished Layout & UI ---
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <AntiCheatWarning
        isVisible={showWarning}
        warningCount={infractions}
        maxWarnings={maxInfractions}
        onDismiss={handleDismissWarning}
      />

      {isLocked && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="max-w-md p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Submission Locked</h2>
            <p className="text-muted-foreground">
              You have exceeded the maximum number of tab switches ({maxInfractions}). Please contact the event organizers.
            </p>
          </Card>
        </div>
      )}

      <div className="flex-1 grid lg:grid-cols-2 gap-0 overflow-hidden">
        {/* Left Side: Problem Description */}
        <div className="border-r border-border">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold">{problem.title}</h1>
                  <Badge variant={getDifficultyVariant(problem.difficulty)}>{problem.difficulty}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Time Limit: {problem.timeLimit}ms | Memory Limit: {problem.memoryLimit}MB
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Problem Description</h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap">
                    {problem.description}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Examples</h2>
                  <div className="space-y-4">
                    {(problem.exampleCases as ExampleCase[]).map((example, index) => (
                      <Card key={index} className="p-4 bg-background-elevated">
                        <p className="font-medium mb-2 text-sm">Example {index + 1}:</p>
                        <pre className="font-mono text-sm text-text-secondary bg-background-deep p-3 rounded-md">
                          <code>
                            {`Input: ${example.input}\nOutput: ${example.output}${example.explanation ? `\nExplanation: ${example.explanation}` : ''}`}
                          </code>
                        </pre>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Constraints</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {problem.constraints.map((constraint: string, index: number) => (
                      <li key={index} className="font-mono text-sm">{constraint}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right Side: Code Editor */}
        <div className="h-full">
          <CodeEditor
            problemId={problem.id}
            isLocked={isLocked}
            boilerplatePython={problem.boilerplatePython}
            boilerplateJavascript={problem.boilerplateJavascript}
          />
        </div>
      </div>
    </div>
  );
}

