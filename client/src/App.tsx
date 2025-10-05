import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
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
import AdminRoute from "@/components/AdminRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import ProblemEditor from "@/pages/ProblemEditor";
import AdminContestsDashboard from "@/pages/AdminContestsDashboard";
import ContestEditor from "@/pages/ContestEditor";
import ContestsPage from "@/pages/ContestsPage";
import ContestLobby from "@/pages/ContestLobby";

import FadeSlideWrapper from "@/components/FadeSlideWrapper";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        {/* Public Routes */}
        <Route path="/" component={() => <FadeSlideWrapper><Home /></FadeSlideWrapper>} />
        <Route path="/problems" component={() => <FadeSlideWrapper><Problems /></FadeSlideWrapper>} />
        <Route path="/leaderboard" component={() => <FadeSlideWrapper><Leaderboard /></FadeSlideWrapper>} />
        <Route path="/submissions" component={() => <FadeSlideWrapper><Submissions /></FadeSlideWrapper>} />
        <Route path="/contests" component={() => <FadeSlideWrapper><ContestsPage /></FadeSlideWrapper>} />
        <Route path="/contests/:id">
          {(params) => <FadeSlideWrapper><ContestLobby  /></FadeSlideWrapper>}
        </Route>
        <Route path="/login" component={() => <FadeSlideWrapper><Login /></FadeSlideWrapper>} />
        <Route path="/register" component={() => <FadeSlideWrapper><Register /></FadeSlideWrapper>} />

        {/* ✅ THIS IS THE FIX: The path is now consistent with your links. */}
        <Route path="/problems/:id">
          {(params) => (
            <FadeSlideWrapper>
              <SolveProblem params={params} />
            </FadeSlideWrapper>
          )}
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" nest>
          <AdminRoute>
            <Switch>
              <Route path="/" component={() => <FadeSlideWrapper><AdminDashboard /></FadeSlideWrapper>} />
              <Route path="/contests" component={() => <FadeSlideWrapper><AdminContestsDashboard /></FadeSlideWrapper>} />
              <Route path="/contest/new" component={() => <FadeSlideWrapper><ContestEditor params={{}} /></FadeSlideWrapper>} />
              <Route path="/contest/:id/edit">
                {(params) => <FadeSlideWrapper><ContestEditor params={params} /></FadeSlideWrapper>}
              </Route>
              <Route path="/problem/new" component={() => <FadeSlideWrapper><ProblemEditor params={{}} /></FadeSlideWrapper>} />
              <Route path="/problem/:id/edit">
                {(params) => <FadeSlideWrapper><ProblemEditor params={params} /></FadeSlideWrapper>}
              </Route>
            </Switch>
          </AdminRoute>
        </Route>

        {/* Not Found */}
        <Route component={() => <FadeSlideWrapper><NotFound /></FadeSlideWrapper>} />
      </Switch>
    </AnimatePresence>
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

