import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "wouter";
import type { Problem } from "@shared/schema";

export default function AdminDashboard() {
  const { data: problems, isLoading } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/problems");
      return res.json();
    },
  });

  if (isLoading) return <div>Loading problems...</div>;

  return (
    <div className="card max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Problems</h1>
        <div className="space-x-4">
          <Button asChild variant="secondary">
            {/* ✅ Link is now relative */}
            <Link href="/contests">Manage Contests</Link>
          </Button>
          <Button asChild>
            {/* ✅ Link is now relative */}
            <Link href="/problem/new">Create New Problem</Link>
          </Button>
        </div>
      </div>
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
                <Button variant="outline" size="sm" asChild>
                  {/* ✅ Link is now relative */}
                  <Link href={`/problem/${problem.id}/edit`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

