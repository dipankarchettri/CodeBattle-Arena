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
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          {/* This link correctly points to the 'new' problem route, nested under /admin */}
          <Link href="/problem/new">Create New Problem</Link>
        </Button>
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
                  {/* ✅ THE FIX: The link is now relative to the nested "/admin" route. */}
                  {/* This will correctly generate a URL like /admin/problem/some-id/edit */}
                  <Link href={`/problem/${problem.id}/edit`}>Edit</Link>
                </Button>
                {/* Delete button can be added here with a confirmation modal */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

