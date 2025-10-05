import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import type { Contest } from "@shared/schema";

interface ContestCardProps {
  contest: Contest;
  status: 'active' | 'upcoming' | 'past';
}

export default function ContestCard({ contest, status }: ContestCardProps) {
  const getBadgeVariant = () => {
    if (status === 'active') return 'default';
    if (status === 'upcoming') return 'secondary';
    return 'outline';
  };

  const getButtonText = () => {
    if (status === 'active') return 'Enter Contest';
    if (status === 'upcoming') return 'View Details';
    return 'View Results';
  };

  return (
    <Card className="flex flex-col bg-background-elevated hover:-translate-y-1 transition-transform duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{contest.title}</CardTitle>
          <Badge variant={getBadgeVariant()} className="capitalize">{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Calendar className="w-4 h-4" />
          <span>Starts: {format(new Date(contest.startTime), 'MMM d, yyyy h:mm a')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock className="w-4 h-4" />
          <span>Ends: {format(new Date(contest.endTime), 'MMM d, yyyy h:mm a')}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          {/* Note: This link will eventually go to a dedicated contest lobby page */}
          <Link href={`/contests/${contest.id}`}>{getButtonText()}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

