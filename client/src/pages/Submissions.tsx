import Navbar from "@/components/Navbar";
import SubmissionHistoryTable from "@/components/SubmissionHistoryTable";
import { Card } from "@/components/ui/card";
import { History } from "lucide-react";

export default function Submissions() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <History className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">My Submissions</h1>
          </div>
          <p className="text-muted-foreground">
            Track all your coding submissions and their results
          </p>
        </div>

        <Card>
          <SubmissionHistoryTable />
        </Card>
      </div>
    </div>
  );
}
