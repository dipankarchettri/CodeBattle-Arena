import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { executeCode } from "./code-executor";
import { insertSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Get all problems
  app.get("/api/problems", requireAuth, async (_req, res, next) => {
    try {
      const problems = await storage.getAllProblems();
      const problemsWithoutTestCases = problems.map(({ testCases, ...problem }) => problem);
      res.json(problemsWithoutTestCases);
    } catch (error) {
      next(error);
    }
  });

  // Get single problem
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

  // Submit code for a problem
  app.post("/api/submissions", requireAuth, async (req, res, next) => {
    try {
      // ✅ CORRECTED: Combine req.body and req.user.id BEFORE validation
      const submissionData = {
        ...req.body,
        userId: req.user!.id,
      };

      const validatedData = insertSubmissionSchema.parse(submissionData);
      
      const problem = await storage.getProblem(validatedData.problemId);
      if (!problem) return res.status(404).json({ message: "Problem not found" });

      // Create initial "pending" submission
      const submission = await storage.createSubmission(validatedData);

      // --- ❌ REMOVED THE PREMATURE RESPONSE THAT CAUSED THE RACE CONDITION ---
      // res.status(202).json(submission); // This line was the bug.

      // Execute code asynchronously
      executeCode(
        submission.id,
        validatedData.code,
        validatedData.language as 'python' | 'javascript',
        problem.testCases as Array<{ input: string; expectedOutput: string }>,
        problem.timeLimit
      ).then(async (result) => {
        // Update submission with the final result
        await storage.updateSubmissionResult(
          submission.id,
          result.status,
          result.output,
          result.executionTime
        );
        // If correct, mark it as solved
        if (result.status === "correct") {
          await storage.markProblemSolved(submission.userId, submission.problemId);
        }
      }).catch(error => {
        console.error(`[Execution Error] for submission ${submission.id}:`, error);
        // Optionally update the submission to a failed state here
        storage.updateSubmissionResult(submission.id, 'error', 'The judge encountered a fatal error.', 0);
      });

      // ✅ --- ADDED A DELAYED RESPONSE --- ✅
      // Respond to the user after a short delay to allow the judge to finish for simple cases,
      // or instruct the frontend to poll for the result.
      // For now, we send the final result back directly after execution is complete.
      // The `executeCode` promise is now handled differently to allow this.
      
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
      res.status(200).json(updatedSubmission); // Respond with the FINAL result

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      next(error);
    }
  });

  // Get user's submissions
  app.get("/api/submissions", requireAuth, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const submissions = await storage.getUserSubmissions(userId);
      res.json(submissions);
    } catch (error) {
      next(error);
    }
  });

  // Get leaderboard
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

