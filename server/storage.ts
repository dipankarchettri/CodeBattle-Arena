import {
  type User,
  type UserPublic,
  type InsertUser,
  type Problem,
  type InsertProblem,
  type Submission,
  type InsertSubmission,
  type LeaderboardEntry,
  type Contest,
  type InsertContest,
  users,
  problems,
  submissions,
  solvedProblems,
  contests,
  contestProblems,
  contestParticipants,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, count, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserPublic(id: string): Promise<UserPublic | undefined>;

  // Problems
  getAllProblems(): Promise<Problem[]>;
  getProblem(id: string): Promise<Problem | undefined>;
  createProblem(problem: InsertProblem): Promise<Problem>;
  getProblemCount(): Promise<number>;
  updateProblem(id: string, problem: Partial<InsertProblem>): Promise<Problem | undefined>;
  deleteProblem(id: string): Promise<void>;

  // Submissions
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmissionResult(
    id: string,
    status: string,
    output: string,
    executionTime: number
  ): Promise<void>;
  getUserSubmissions(userId: string): Promise<Submission[]>;
  getSubmission(id: string): Promise<Submission | undefined>;

  // Solved Problems
  markProblemSolved(userId: string, problemId: string): Promise<void>;
  hasUserSolvedProblem(userId: string, problemId: string): Promise<boolean>;

  // Leaderboard
  getLeaderboard(): Promise<LeaderboardEntry[]>;

  // ✅ NEW CONTEST METHODS
  createContest(contest: InsertContest): Promise<Contest>;
  getAllContests(): Promise<Contest[]>;
  getContestById(id: string): Promise<Contest | undefined>;
  updateContest(id: string, data: Partial<InsertContest>): Promise<Contest | undefined>;
  deleteContest(id: string): Promise<void>;
  addProblemsToContest(contestId: string, problemIds: string[]): Promise<void>;
  getContestWithProblems(id: string): Promise<(Contest & { problemIds: string[] }) | undefined>;
}

export class DbStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getUserPublic(id: string): Promise<UserPublic | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    const { password, ...publicUser } = user;
    return publicUser;
  }

  // Problems
  async getAllProblems(): Promise<Problem[]> {
    return db.select().from(problems).orderBy(problems.createdAt);
  }

  async getProblem(id: string): Promise<Problem | undefined> {
    const [problem] = await db.select().from(problems).where(eq(problems.id, id));
    return problem;
  }

  async createProblem(problem: InsertProblem): Promise<Problem> {
    const [newProblem] = await db.insert(problems).values(problem).returning();
    return newProblem;
  }

  async getProblemCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(problems);
    return result.count;
  }

  async updateProblem(id: string, problem: Partial<InsertProblem>): Promise<Problem | undefined> {
    const [updatedProblem] = await db.update(problems).set(problem).where(eq(problems.id, id)).returning();
    return updatedProblem;
  }

  async deleteProblem(id: string): Promise<void> {
    await db.delete(problems).where(eq(problems.id, id));
  }

  // ✅ NEW CONTEST METHOD IMPLEMENTATIONS
  async createContest(contest: InsertContest): Promise<Contest> {
    const [newContest] = await db.insert(contests).values(contest).returning();
    return newContest;
  }

  async getAllContests(): Promise<Contest[]> {
    return db.select().from(contests).orderBy(desc(contests.startTime));
  }

  async getContestById(id: string): Promise<Contest | undefined> {
    const [contest] = await db.select().from(contests).where(eq(contests.id, id));
    return contest;
  }

  async updateContest(id: string, data: Partial<InsertContest>): Promise<Contest | undefined> {
    const [updatedContest] = await db.update(contests).set(data).where(eq(contests.id, id)).returning();
    return updatedContest;
  }

  async deleteContest(id: string): Promise<void> {
    await db.delete(contests).where(eq(contests.id, id));
  }

  async addProblemsToContest(contestId: string, problemIds: string[]): Promise<void> {
    // This is a "replace all" strategy: delete existing, then insert new.
    await db.delete(contestProblems).where(eq(contestProblems.contestId, contestId));
    if (problemIds.length > 0) {
      const values = problemIds.map(problemId => ({ contestId, problemId }));
      await db.insert(contestProblems).values(values);
    }
  }

  async getContestWithProblems(id: string): Promise<(Contest & { problemIds: string[] }) | undefined> {
    const contest = await this.getContestById(id);
    if (!contest) return undefined;

    const problems = await db.select({ problemId: contestProblems.problemId }).from(contestProblems).where(eq(contestProblems.contestId, id));
    const problemIds = problems.map(p => p.problemId);
    
    return { ...contest, problemIds };
  }

  // Submissions
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db
      .insert(submissions)
      .values({
        ...submission,
        status: "pending",
      })
      .returning();
    return newSubmission;
  }

  async updateSubmissionResult(
    id: string,
    status: string,
    output: string,
    executionTime: number
  ): Promise<void> {
    await db
      .update(submissions)
      .set({ status, output, executionTime })
      .where(eq(submissions.id, id));
  }

  async getUserSubmissions(userId: string): Promise<Submission[]> {
    return db
      .select()
      .from(submissions)
      .where(eq(submissions.userId, userId))
      .orderBy(desc(submissions.createdAt));
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
    return submission;
  }

  // Solved Problems
  async markProblemSolved(userId: string, problemId: string): Promise<void> {
    const alreadySolved = await this.hasUserSolvedProblem(userId, problemId);
    if (!alreadySolved) {
      await db.insert(solvedProblems).values({ userId, problemId });
    }
  }

  async hasUserSolvedProblem(userId: string, problemId: string): Promise<boolean> {
    const [solved] = await db
      .select()
      .from(solvedProblems)
      .where(
        sql`${solvedProblems.userId} = ${userId} AND ${solvedProblems.problemId} = ${problemId}`
      );
    return !!solved;
  }

  // Leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const result = await db
      .select({
        userId: users.id,
        username: users.username,
        problemsSolved: sql<number>`count(distinct ${solvedProblems.problemId})`,
        firstSolvedAt: sql<Date>`min(${solvedProblems.firstSolvedAt})`,
      })
      .from(users)
      .leftJoin(solvedProblems, eq(users.id, solvedProblems.userId))
      .groupBy(users.id, users.username)
      .orderBy(
        desc(sql`count(distinct ${solvedProblems.problemId})`),
        sql`min(${solvedProblems.firstSolvedAt})`
      );

    return result as LeaderboardEntry[];
  }
}

export const storage = new DbStorage();

export { db, users };