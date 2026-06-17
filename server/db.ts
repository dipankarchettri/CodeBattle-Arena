import mongoose from "mongoose";
import crypto from "crypto";

// Ensure .env is configured
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to create your .env or atlas-credentials.env file?"
  );
}

if (dbUrl.includes("<db_username>")) {
  throw new Error(
    "DATABASE_URL contains the '<db_username>' placeholder. Please replace it with your actual database user username in '.env' or 'atlas-credentials.env'."
  );
}

// Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => console.log("✅ Successfully connected to MongoDB Atlas!"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --- SCHEMAS & MODELS ---

const UserSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true, index: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
}, { collection: "users" });

const ProblemSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true },
  timeLimit: { type: Number, default: 1000 },
  memoryLimit: { type: Number, default: 256 },
  testCases: { type: Array, required: true },
  exampleCases: { type: Array, required: true },
  constraints: { type: [String], required: true },
  boilerplatePython: { type: String, default: "" },
  boilerplateJavascript: { type: String, default: "" },
  boilerplateCpp: { type: String, default: "" },
  boilerplateJava: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
}, { collection: "problems" });

const SubmissionSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true, index: true },
  userId: { type: String, required: true },
  problemId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, default: "pending" },
  verdict: { type: String, default: null },
  output: { type: String, default: null },
  executionTime: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now },
}, { collection: "submissions" });

const SolvedProblemSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true, index: true },
  userId: { type: String, required: true },
  problemId: { type: String, required: true },
  firstSolvedAt: { type: Date, default: Date.now },
}, { collection: "solved_problems" });

const ContestSchema = new mongoose.Schema({
  id: { type: String, default: () => crypto.randomUUID(), unique: true, index: true },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  problemIds: { type: [String], default: [] },
  participantIds: { type: [String], default: [] },
}, { collection: "contests" });

// Create Mongoose models
export const UserModel = mongoose.model("User", UserSchema);
export const ProblemModel = mongoose.model("Problem", ProblemSchema);
export const SubmissionModel = mongoose.model("Submission", SubmissionSchema);
export const SolvedProblemModel = mongoose.model("SolvedProblem", SolvedProblemSchema);
export const ContestModel = mongoose.model("Contest", ContestSchema);
export const db = mongoose.connection;

