import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import type { Problem } from "@shared/schema";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const { data: problems, isLoading } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/problems");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Problems</h1>
            <div className="space-x-4">
              <Button asChild variant="secondary">
                <Link href="/contests">Manage Contests</Link>
              </Button>
              <Button asChild>
                <Link href="/problem/new">Create New Problem</Link>
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading problems...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {problems?.map((problem) => (
                  <TableRow key={problem.id}>
                    <TableCell>{problem.title}</TableCell>
                    <TableCell>{problem.difficulty}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="secondary" size="sm" asChild>
                        <a href={`/problems/${problem.id}`}>View</a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/problem/${problem.id}/edit`}>Edit</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

