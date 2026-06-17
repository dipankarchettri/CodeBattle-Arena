import { z } from "zod";

// --- VALIDATION & INSERT SCHEMAS ---

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertProblemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  timeLimit: z.number().default(1000),
  memoryLimit: z.number().default(256),
  testCases: z.array(
    z.object({
      input: z.string(),
      expectedOutput: z.string(),
    })
  ),
  exampleCases: z.array(
    z.object({
      input: z.string(),
      output: z.string(),
      explanation: z.string().optional(),
    })
  ),
  constraints: z.array(z.string()),
  boilerplatePython: z.string().default(''),
  boilerplateJavascript: z.string().default(''),
  boilerplateCpp: z.string().default(''),
  boilerplateJava: z.string().default(''),
});

export const insertSubmissionSchema = z.object({
  userId: z.string(),
  problemId: z.string(),
  code: z.string().min(1, "Code cannot be empty"),
  language: z.string().min(1, "Language is required"),
});

// We tell the validation schema to coerce the date strings from the
// frontend into proper Date objects before validation.
export const insertContestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

// --- TYPES ---

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
};

export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  timeLimit: number;
  memoryLimit: number;
  testCases: Array<{ input: string; expectedOutput: string }>;
  exampleCases: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  boilerplatePython: string;
  boilerplateJavascript: string;
  boilerplateCpp: string;
  boilerplateJava: string;
  createdAt: Date;
};

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: string;
  // Rich verdict: AC | WA | TLE | MLE | RE | CE | pending
  verdict: string | null;
  output: string | null;
  executionTime: number | null;
  createdAt: Date;
};

export type SolvedProblem = {
  id: string;
  userId: string;
  problemId: string;
  firstSolvedAt: Date;
};

export type InsertContest = z.infer<typeof insertContestSchema>;
export type Contest = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
};

export type ContestProblem = {
  contestId: string;
  problemId: string;
};

export type ContestParticipant = {
  contestId: string;
  userId: string;
};

// --- EXTENDED TYPES ---

export type UserPublic = Omit<User, "password">;

export type LeaderboardEntry = {
  userId: string;
  username: string;
  problemsSolved: number;
  lastSubmissionTime: string | null;
};

export type ContestLobbyData = Contest & {
  participantCount: number;
  isRegistered: boolean;
  problems: Array<{ id: string; title: string }>;
};
