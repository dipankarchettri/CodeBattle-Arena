import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ... (users, problems, submissions, solvedProblems tables are the same)
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
  difficulty: text("difficulty").notNull(),
  timeLimit: integer("time_limit").notNull().default(1000),
  memoryLimit: integer("memory_limit").notNull().default(256),
  testCases: jsonb("test_cases").notNull(),
  exampleCases: jsonb("example_cases").notNull(),
  constraints: text("constraints").array().notNull(),
  boilerplatePython: text("boilerplate_python").notNull().default(''),
  boilerplateJavascript: text("boilerplate_javascript").notNull().default(''),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  problemId: varchar("problem_id").notNull().references(() => problems.id, { onDelete: "cascade" }),
  code: text("code").notNull(),
  language: text("language").notNull(),
  status: text("status").notNull(),
  output: text("output"),
  executionTime: integer("execution_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const solvedProblems = pgTable("solved_problems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  problemId: varchar("problem_id").notNull().references(() => problems.id, { onDelete: "cascade" }),
  firstSolvedAt: timestamp("first_solved_at").defaultNow().notNull(),
});

export const contests = pgTable("contests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contestProblems = pgTable("contest_problems", {
  contestId: varchar("contest_id").notNull().references(() => contests.id, { onDelete: "cascade" }),
  problemId: varchar("problem_id").notNull().references(() => problems.id, { onDelete: "cascade" }),
}, (table) => {
  return { pk: primaryKey({ columns: [table.contestId, table.problemId] }) };
});

export const contestParticipants = pgTable("contest_participants", {
  contestId: varchar("contest_id").notNull().references(() => contests.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
}, (table) => {
  return { pk: primaryKey({ columns: [table.contestId, table.userId] }) };
});


// --- INSERT SCHEMAS ---

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

// ✅ THIS IS THE FIX ✅
// We now tell the validation schema to `coerce` (convert) the date strings from the
// frontend into proper Date objects before validation.
export const insertContestSchema = createInsertSchema(contests, {
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
}).omit({
  id: true,
  createdAt: true,
});


// --- TYPES ---

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;

export type SolvedProblem = typeof solvedProblems.$inferSelect;

export type InsertContest = z.infer<typeof insertContestSchema>;
export type Contest = typeof contests.$inferSelect;
export type ContestProblem = typeof contestProblems.$inferSelect;
export type ContestParticipant = typeof contestParticipants.$inferSelect;

// --- EXTENDED TYPES ---

export type UserPublic = Omit<User, "password">;

export type LeaderboardEntry = {
  userId: string;
  username: string;
  problemsSolved: number;
  firstSolvedAt: Date;
};

