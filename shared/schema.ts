import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const problems = pgTable("problems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull(), // "Easy", "Medium", "Hard"
  timeLimit: integer("time_limit").notNull().default(1000), // milliseconds
  memoryLimit: integer("memory_limit").notNull().default(256), // MB
  testCases: jsonb("test_cases").notNull(), // array of {input: string, expectedOutput: string}
  exampleCases: jsonb("example_cases").notNull(), // array of {input: string, output: string, explanation?: string}
  constraints: text("constraints").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  problemId: varchar("problem_id").notNull().references(() => problems.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  language: text("language").notNull(), // "python" | "javascript"
  status: text("status").notNull(), // "correct" | "incorrect" | "error" | "pending"
  output: text("output"),
  executionTime: integer("execution_time"), // milliseconds
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const solvedProblems = pgTable("solved_problems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  problemId: varchar("problem_id").notNull().references(() => problems.id, { onDelete: "cascade" }),
  firstSolvedAt: timestamp("first_solved_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertProblemSchema = createInsertSchema(problems).omit({
  id: true,
  createdAt: true,
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  createdAt: true,
  status: true,
  output: true,
  executionTime: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;

export type SolvedProblem = typeof solvedProblems.$inferSelect;

// Extended types
export type UserPublic = Omit<User, "password">;

export type LeaderboardEntry = {
  userId: string;
  username: string;
  problemsSolved: number;
  firstSolvedAt: Date;
};
