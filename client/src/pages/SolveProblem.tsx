import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Navbar from "@/components/Navbar";
import CodeEditor from "@/components/CodeEditor";
import AntiCheatWarning from "@/components/AntiCheatWarning";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Problem } from "@shared/schema";

export default function SolveProblem() {
  const { id } = useParams<{ id: string }>();
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const maxWarnings = 3;

  const { data: problem, isLoading } = useQuery<Problem>({
    queryKey: ["/api/problems", id],
    enabled: !!id,
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && warningCount < maxWarnings && !isLocked) {
        setWarningCount((prev) => prev + 1);
        setShowWarning(true);
        
        if (warningCount + 1 >= maxWarnings) {
          setIsLocked(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [warningCount, isLocked]);

  if (isLoading || !problem) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading problem...</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-primary text-primary-foreground";
      case "Medium":
        return "bg-chart-2 text-white";
      case "Hard":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {showWarning && (
        <AntiCheatWarning
          warningCount={warningCount}
          maxWarnings={maxWarnings}
          onDismiss={() => setShowWarning(false)}
        />
      )}

      {isLocked && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="max-w-md p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Submission Locked</h2>
            <p className="text-muted-foreground">
              You have exceeded the maximum number of tab switches ({maxWarnings}). Please contact the event organizers.
            </p>
          </Card>
        </div>
      )}

      <div className="flex-1 grid lg:grid-cols-2 gap-0">
        <div className="border-r border-border">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold">{problem.title}</h1>
                  <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                </div>
                <p className="text-muted-foreground">
                  Time Limit: {problem.timeLimit / 1000} second{problem.timeLimit !== 1000 ? 's' : ''} | Memory Limit: {problem.memoryLimit} MB
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Problem Description</h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {problem.description}
                  </div>
                </div>

                {problem.exampleCases && problem.exampleCases.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Examples</h2>
                    <div className="space-y-4">
                      {problem.exampleCases.map((example: any, index: number) => (
                        <Card key={index} className="p-4 bg-card">
                          <p className="font-medium mb-2">Example {index + 1}:</p>
                          <pre className="font-mono text-sm text-muted-foreground">
                            <code>
                              {`Input: ${example.input}
Output: ${example.output}${example.explanation ? `\nExplanation: ${example.explanation}` : ''}`}
                            </code>
                          </pre>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {problem.constraints && problem.constraints.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Constraints</h2>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {problem.constraints.map((constraint: string, index: number) => (
                        <li key={index}>{constraint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="h-[calc(100vh-4rem)]">
          <CodeEditor problemId={problem.id} isLocked={isLocked} />
        </div>
      </div>
    </div>
  );
}
