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
  type ContestLobbyData,
} from "@shared/schema";
import {
  UserModel,
  ProblemModel,
  SubmissionModel,
  SolvedProblemModel,
  ContestModel
} from "./db";

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
    verdict: string,
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

  // Contests
  createContest(contest: InsertContest): Promise<Contest>;
  getAllContests(): Promise<Contest[]>;
  getContestById(id: string): Promise<Contest | undefined>;
  updateContest(id: string, data: Partial<InsertContest>): Promise<Contest | undefined>;
  deleteContest(id: string): Promise<void>;
  addProblemsToContest(contestId: string, problemIds: string[]): Promise<void>;
  getContestWithProblems(id: string): Promise<(Contest & { problemIds: string[] }) | undefined>;
  getContestLobbyData(id: string, userId: string): Promise<ContestLobbyData | undefined>;
  registerForContest(contestId: string, userId: string): Promise<void>;
}

// Helper function to convert Mongoose documents to plain objects of type T,
// removing MongoDB metadata fields like _id and __v.
function toCleanObject<T>(doc: any): T {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : doc;
  delete obj._id;
  delete obj.__v;
  return obj as T;
}

export class DbStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ id }).lean();
    return user ? toCleanObject<User>(user) : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ username }).lean();
    return user ? toCleanObject<User>(user) : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ email }).lean();
    return user ? toCleanObject<User>(user) : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = new UserModel(insertUser);
    await user.save();
    return toCleanObject<User>(user);
  }

  async getUserPublic(id: string): Promise<UserPublic | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    const { password, ...publicUser } = user;
    return publicUser;
  }

  // Problems
  async getAllProblems(): Promise<Problem[]> {
    const list = await ProblemModel.find({}).sort({ createdAt: 1 }).lean();
    return list.map(p => toCleanObject<Problem>(p));
  }

  async getProblem(id: string): Promise<Problem | undefined> {
    const problem = await ProblemModel.findOne({ id }).lean();
    return problem ? toCleanObject<Problem>(problem) : undefined;
  }

  async createProblem(problem: InsertProblem): Promise<Problem> {
    const newProblem = new ProblemModel(problem);
    await newProblem.save();
    return toCleanObject<Problem>(newProblem);
  }

  async getProblemCount(): Promise<number> {
    return ProblemModel.countDocuments();
  }

  async updateProblem(id: string, problem: Partial<InsertProblem>): Promise<Problem | undefined> {
    const updated = await ProblemModel.findOneAndUpdate({ id }, { $set: problem }, { new: true }).lean();
    return updated ? toCleanObject<Problem>(updated) : undefined;
  }

  async deleteProblem(id: string): Promise<void> {
    await ProblemModel.deleteOne({ id });
  }

  // Contests
  async createContest(contest: InsertContest): Promise<Contest> {
    const newContest = new ContestModel(contest);
    await newContest.save();
    return toCleanObject<Contest>(newContest);
  }

  async getAllContests(): Promise<Contest[]> {
    const list = await ContestModel.find({}).sort({ startTime: -1 }).lean();
    return list.map(c => toCleanObject<Contest>(c));
  }

  async getContestById(id: string): Promise<Contest | undefined> {
    const contest = await ContestModel.findOne({ id }).lean();
    return contest ? toCleanObject<Contest>(contest) : undefined;
  }

  async updateContest(id: string, data: Partial<InsertContest>): Promise<Contest | undefined> {
    const updated = await ContestModel.findOneAndUpdate({ id }, { $set: data }, { new: true }).lean();
    return updated ? toCleanObject<Contest>(updated) : undefined;
  }

  async deleteContest(id: string): Promise<void> {
    await ContestModel.deleteOne({ id });
  }

  async addProblemsToContest(contestId: string, problemIds: string[]): Promise<void> {
    await ContestModel.updateOne({ id: contestId }, { $set: { problemIds } });
  }

  async getContestWithProblems(id: string): Promise<(Contest & { problemIds: string[] }) | undefined> {
    const contest = await this.getContestById(id);
    if (!contest) return undefined;
    
    const rawContest = await ContestModel.findOne({ id }).lean();
    const problemIds = rawContest?.problemIds || [];
    return { ...contest, problemIds };
  }

  async getContestLobbyData(id: string, userId: string): Promise<ContestLobbyData | undefined> {
    const contest = await this.getContestById(id);
    if (!contest) return undefined;

    const rawContest = await ContestModel.findOne({ id }).lean();
    const problemIds = rawContest?.problemIds || [];
    const participantIds = rawContest?.participantIds || [];

    const participantCount = participantIds.length;
    const isRegistered = participantIds.includes(userId);

    let contestProblemsList: Array<{ id: string, title: string }> = [];
    const now = new Date();
    if (new Date(contest.startTime) <= now) {
      const problemsList = await ProblemModel.find({ id: { $in: problemIds } }).lean();
      contestProblemsList = problemsList.map(p => ({ id: p.id, title: p.title }));
    }

    return {
      ...contest,
      participantCount,
      isRegistered,
      problems: contestProblemsList,
    };
  }

  async registerForContest(contestId: string, userId: string): Promise<void> {
    await ContestModel.updateOne({ id: contestId }, { $addToSet: { participantIds: userId } });
  }

  async getContestParticipants(contestId: string): Promise<Array<{ id: string, username: string, email: string }>> {
    const rawContest = await ContestModel.findOne({ id: contestId }).lean();
    if (!rawContest || !rawContest.participantIds || rawContest.participantIds.length === 0) return [];
    
    const participants = await UserModel.find({ id: { $in: rawContest.participantIds } }).lean();
    return participants.map(p => ({
      id: p.id,
      username: p.username,
      email: p.email
    }));
  }

  async getContestStats(contestId: string): Promise<any> {
    const rawContest = await ContestModel.findOne({ id: contestId }).lean();
    if (!rawContest) throw new Error("Contest not found");
    
    const participantIds = rawContest.participantIds || [];
    const participants = await UserModel.find({ id: { $in: participantIds } }).lean();
    
    const participantDetails = participants.map(p => ({
      id: p.id,
      username: p.username,
      email: p.email
    }));

    const contestStartTime = new Date(rawContest.startTime);
    const contestEndTime = new Date(rawContest.endTime);
    
    const submissions = await SubmissionModel.find({
      problemId: { $in: rawContest.problemIds || [] },
      createdAt: { $gte: contestStartTime, $lte: contestEndTime }
    }).lean();

    const statsMap = new Map<string, { username: string, score: number, timePenalty: number }>();
    
    for (const p of participants) {
      statsMap.set(p.id, { username: p.username, score: 0, timePenalty: 0 });
    }

    const solvedSet = new Set<string>();

    for (const sub of submissions) {
      if (sub.status === 'correct') {
        const userProbKey = `${sub.userId}-${sub.problemId}`;
        if (!solvedSet.has(userProbKey)) {
          solvedSet.add(userProbKey);
          
          let userStat = statsMap.get(sub.userId);
          if (!userStat) {
             const user = await UserModel.findOne({ id: sub.userId }).lean();
             userStat = { username: user?.username || 'Unknown', score: 0, timePenalty: 0 };
             statsMap.set(sub.userId, userStat);
          }
          
          userStat.score += 1;
          const timeToSolve = (new Date(sub.createdAt!).getTime() - contestStartTime.getTime()) / 1000;
          userStat.timePenalty += timeToSolve;
        }
      }
    }

    const leaderboard = Array.from(statsMap.values()).sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timePenalty - b.timePenalty; 
    });

    return {
      totalParticipants: participantDetails.length,
      participants: participantDetails,
      leaderboard,
      totalSubmissions: submissions.length,
    };
  }

  // Submissions
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const newSubmission = new SubmissionModel({ ...submission, status: "pending" });
    await newSubmission.save();
    return toCleanObject<Submission>(newSubmission);
  }

  async updateSubmissionResult(
    id: string,
    status: string,
    verdict: string,
    output: string,
    executionTime: number
  ): Promise<void> {
    await SubmissionModel.updateOne({ id }, { $set: { status, verdict, output, executionTime } });
  }

  async getUserSubmissions(userId: string): Promise<Submission[]> {
    const list = await SubmissionModel.find({ userId }).sort({ createdAt: -1 }).lean();
    return list.map(s => toCleanObject<Submission>(s));
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    const submission = await SubmissionModel.findOne({ id }).lean();
    return submission ? toCleanObject<Submission>(submission) : undefined;
  }

  // Solved Problems
  async markProblemSolved(userId: string, problemId: string): Promise<void> {
    const alreadySolved = await this.hasUserSolvedProblem(userId, problemId);
    if (!alreadySolved) {
      const solved = new SolvedProblemModel({ userId, problemId });
      await solved.save();
    }
  }

  async hasUserSolvedProblem(userId: string, problemId: string): Promise<boolean> {
    const solved = await SolvedProblemModel.findOne({ userId, problemId }).lean();
    return !!solved;
  }

  // Leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    // Aggregates users, performs a lookup on solved_problems to count solved problems
    // and extract the date when they first solved a problem.
    const result = await UserModel.aggregate([
      {
        $lookup: {
          from: "solved_problems",
          localField: "id",
          foreignField: "userId",
          as: "solved"
        }
      },
      {
        $lookup: {
          from: "submissions",
          localField: "id",
          foreignField: "userId",
          as: "submissions"
        }
      },
      {
        $project: {
          _id: 0,
          userId: "$id",
          username: "$username",
          problemsSolved: { $size: "$solved" },
          lastSubmissionTime: {
            $cond: {
              if: { $gt: [{ $size: "$submissions" }, 0] },
              then: { $max: "$submissions.createdAt" },
              else: null
            }
          }
        }
      },
      {
        $sort: {
          problemsSolved: -1,
          lastSubmissionTime: -1
        }
      }
    ]);
    return result as LeaderboardEntry[];
  }
}

export const storage = new DbStorage();
