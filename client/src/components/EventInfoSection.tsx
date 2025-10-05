import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import type { Contest } from "@shared/schema";
import Autoplay from "embla-carousel-autoplay";

interface ContestsData {
  upcoming: Contest[];
  active: Contest[];
  past: Contest[];
}

export default function EventInfoSection() {
  const { data, isLoading } = useQuery<ContestsData>({
    queryKey: ["/api/public/contests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/public/contests");
      return res.json();
    },
  });

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const relevantContests = [...(data?.active || []), ...(data?.upcoming || [])];

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-elevated">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Loading Events...</h2>
        </div>
      </section>
    );
  }
  
  if (relevantContests.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-elevated">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Tuned!</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our next coding event is being planned. Check back soon for details.
          </p>
          <Button asChild>
            <Link href="/contests">View Past Contests</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-elevated">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Upcoming & Active <span className="text-primary-brand">Events</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join a competition, prove your skills, and climb the leaderboard.
          </p>
        </div>

        <Carousel 
          opts={{ loop: true }} 
          className="w-full max-w-4xl mx-auto relative"
          plugins={[plugin.current]}
          // ✅ THIS IS THE FIX ✅
          // We wrap the plugin calls in arrow functions. These new functions match the
          // type that React's onMouseEnter/onMouseLeave props expect.
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
        >
          <CarouselContent>
            {relevantContests.map((contest) => (
              <CarouselItem key={contest.id}>
                <div className="p-1">
                  <Card className="bg-background-subtle border-border/50 shadow-lg hover:-translate-y-1 hover:shadow-accent-competitive/20 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-2xl">{contest.title}</CardTitle>
                        <Badge variant={data?.active.some(c => c.id === contest.id) ? 'default' : 'secondary'}>
                          {data?.active.some(c => c.id === contest.id) ? 'Active Now' : 'Upcoming'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
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
                        <Link href={`/contests/${contest.id}`}>
                          {data?.active.some(c => c.id === contest.id) ? 'Enter Contest' : 'View Details'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-12 hidden md:flex" />
          <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-12 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}

