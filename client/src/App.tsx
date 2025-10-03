import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Problems from "@/pages/Problems";
import Leaderboard from "@/pages/Leaderboard";
import Submissions from "@/pages/Submissions";
import SolveProblem from "@/pages/SolveProblem";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/problems" component={Problems} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/submissions" component={Submissions} />
      <Route path="/solve/:id" component={SolveProblem} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
