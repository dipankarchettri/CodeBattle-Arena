import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { executeCode } from "./code-executor";
import { insertContestSchema, insertProblemSchema, insertSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import { requireAdmin } from "./middleware/requireAdmin";

/**
 * Middleware to ensure a user is authenticated.
 * If not, it rejects the request with a 401 Unauthorized status.
 */
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup all authentication-related routes (/api/login, /api/register, etc.)
  setupAuth(app);

  // --- PUBLIC & USER-FACING PROBLEM ROUTES ---

  // Get a list of all problems (without their secret test cases)
  app.get("/api/problems", requireAuth, async (_req, res, next) => {
    try {
      const problems = await storage.getAllProblems();
      const problemsWithoutTestCases = problems.map(({ testCases, ...problem }) => problem);
      res.json(problemsWithoutTestCases);
    } catch (error) {
      next(error);
    }
  });

  // Get a single problem by ID (also without secret test cases)
  app.get("/api/problems/:id", requireAuth, async (req, res, next) => {
    try {
      const problem = await storage.getProblem(req.params.id);
      if (!problem) return res.status(404).json({ message: "Problem not found" });
      const { testCases, ...problemWithoutTestCases } = problem;
      res.json(problemWithoutTestCases);
    } catch (error) {
      next(error);
    }
  });

  // --- CONTEST ROUTES ---


    app.get("/api/public/contests", requireAuth, async (_req, res, next) => {
    try {
      const allContests = await storage.getAllContests();
      const now = new Date();

      const upcoming = allContests.filter(c => new Date(c.startTime) > now);
      const active = allContests.filter(c => new Date(c.startTime) <= now && new Date(c.endTime) > now);
      const past = allContests.filter(c => new Date(c.endTime) <= now);

      res.json({ upcoming, active, past });
    } catch (error) {
      next(error);
    }
  });

    // Get all data for a specific contest lobby
  app.get("/api/contests/:id/lobby", requireAuth, async (req, res, next) => {
    try {
      const contest = await storage.getContestLobbyData(req.params.id, req.user!.id);
      if (!contest) return res.status(404).json({ message: "Contest not found" });
      res.json(contest);
    } catch (error) {
      next(error);
    }
  });

  // Register the current user for a contest
  app.post("/api/contests/:id/register", requireAuth, async (req, res, next) => {
    try {
      await storage.registerForContest(req.params.id, req.user!.id);
      res.sendStatus(200); // OK
    } catch (error) {
      next(error);
    }
  });

  // --- ADMIN-ONLY PROBLEM ROUTES ---

  // Get the full data for a single problem, including test cases (for the editor)
  app.get("/api/admin/problems/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const problem = await storage.getProblem(req.params.id);
      if (!problem) return res.status(404).json({ message: "Problem not found" });
      res.json(problem);
    } catch (error) {
      next(error);
    }
  });

  // Create a new problem
  app.post("/api/problems", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const validatedData = insertProblemSchema.parse(req.body);
      const newProblem = await storage.createProblem(validatedData);
      res.status(201).json(newProblem);
    } catch (error) {
      next(error);
    }
  });

  // Update an existing problem
  app.put("/api/problems/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const updatedProblem = await storage.updateProblem(req.params.id, req.body);
      if (!updatedProblem) return res.status(404).json({ message: "Problem not found" });
      res.json(updatedProblem);
    } catch (error) {
      next(error);
    }
  });

  // Delete a problem
  app.delete("/api/problems/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      await storage.deleteProblem(req.params.id);
      res.sendStatus(204); // No Content
    } catch (error) {
      next(error);
    }
  });
  
  // --- ADMIN-ONLY CONTEST ROUTES ---

  // Get all contests for the admin dashboard
  app.get("/api/contests", requireAuth, requireAdmin, async (_req, res, next) => {
    try {
      const allContests = await storage.getAllContests();
      res.json(allContests);
    } catch (error) {
      next(error);
    }
  });

  // Get a single contest with its associated problem IDs (for the edit form)
  app.get("/api/contests/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const contest = await storage.getContestWithProblems(req.params.id);
      if (!contest) return res.status(404).json({ message: "Contest not found" });
      res.json(contest);
    } catch (error) {
      next(error);
    }
  });

  // Create a new contest and associate problems with it
  app.post("/api/contests", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const validatedData = insertContestSchema.parse(req.body.contest);
      const newContest = await storage.createContest(validatedData);
      
      const problemIds = req.body.problemIds || [];
      await storage.addProblemsToContest(newContest.id, problemIds);

      res.status(201).json(newContest);
    } catch (error) {
      next(error);
    }
  });

  // Update an existing contest
  app.put("/api/contests/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      const contestId = req.params.id;
      // Use a partial schema to validate and coerce incoming data (like date strings)
      const validatedData = insertContestSchema.partial().parse(req.body.contest);

      const updatedContest = await storage.updateContest(contestId, validatedData);
      if (!updatedContest) return res.status(404).json({ message: "Contest not found" });
      
      const problemIds = req.body.problemIds || [];
      await storage.addProblemsToContest(contestId, problemIds);

      res.json(updatedContest);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      next(error);
    }
  });

  // Delete a contest
  app.delete("/api/contests/:id", requireAuth, requireAdmin, async (req, res, next) => {
    try {
      await storage.deleteContest(req.params.id);
      res.sendStatus(204); // No Content
    } catch (error) {
      next(error);
    }
  });

  // --- SUBMISSION & LEADERBOARD ROUTES ---

  // Submit code for a problem
  app.post("/api/submissions", requireAuth, async (req, res, next) => {
    try {
      const submissionData = { ...req.body, userId: req.user!.id };
      const validatedData = insertSubmissionSchema.parse(submissionData);
      
      const problem = await storage.getProblem(validatedData.problemId);
      if (!problem) return res.status(404).json({ message: "Problem not found" });

      const submission = await storage.createSubmission(validatedData);

      const result = await executeCode(
        submission.id,
        validatedData.code,
        validatedData.language as 'python' | 'javascript',
        problem.testCases as Array<{ input: string; expectedOutput: string }>,
        problem.timeLimit
      );

      await storage.updateSubmissionResult(
        submission.id,
        result.status,
        result.output,
        result.executionTime
      );

      if (result.status === "correct") {
        await storage.markProblemSolved(submission.userId, submission.problemId);
      }

      const updatedSubmission = await storage.getSubmission(submission.id);
      res.status(200).json(updatedSubmission);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      next(error);
    }
  });

  // Get the logged-in user's submission history
  app.get("/api/submissions", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const submissions = await storage.getUserSubmissions(userId);
      res.json(submissions);
    } catch (error) {
      next(error);
    }
  });

  // Get the public leaderboard
  app.get("/api/leaderboard", async (_req, res, next) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

