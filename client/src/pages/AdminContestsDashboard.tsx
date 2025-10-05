import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest , queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import type { Contest } from "@shared/schema";

export default function AdminContestsDashboard() {
  const { toast } = useToast();

  const { data: contests, isLoading } = useQuery<Contest[]>({
    queryKey: ["/api/contests"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/contests");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/contests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contests"] });
      toast({ title: "Contest Deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Deletion Failed", description: error.message, variant: "destructive" });
    }
  });

  if (isLoading) return <div>Loading contests...</div>;

  return (
    <div className="card max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Contests</h1>
        <Button asChild>
          {/* ✅ Link is now relative */}
          <Link href="/contest/new">Create New Contest</Link>
        </Button>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Start Time</TableHead><TableHead>End Time</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {contests?.map((contest) => (
            <TableRow key={contest.id}>
              <TableCell>{contest.title}</TableCell>
              <TableCell>{format(new Date(contest.startTime), 'PPpp')}</TableCell>
              <TableCell>{format(new Date(contest.endTime), 'PPpp')}</TableCell>
              <TableCell className="space-x-2">
                <Button variant="outline" size="sm" asChild>
                   {/* ✅ Link is now relative */}
                  <Link href={`/contest/${contest.id}/edit`}>Edit</Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${contest.title}"?`)) {
                    deleteMutation.mutate(contest.id);
                  }
                }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

