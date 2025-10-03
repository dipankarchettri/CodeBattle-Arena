import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Clock } from "lucide-react";

interface ProblemCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  timeLimit: string;
  onSolve: () => void;
}

export default function ProblemCard({ title, difficulty, description, timeLimit, onSolve }: ProblemCardProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Easy":
        return "bg-primary text-primary-foreground";
      case "Medium":
        return "bg-chart-2 text-white";
      case "Hard":
        return "bg-destructive text-destructive-foreground";
    }
  };

  return (
    <Card className="p-6 hover-elevate transition-all duration-300 hover:scale-105">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          <Badge className={getDifficultyColor()}>{difficulty}</Badge>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{timeLimit}</span>
          </div>
          <Button size="sm" onClick={onSolve} data-testid="button-solve-problem">
            Solve Problem
          </Button>
        </div>
      </div>
    </Card>
  );
}
