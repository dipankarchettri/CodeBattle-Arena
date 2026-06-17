// Shared types for the judge engine
// Both NativeJudge and DockerJudge implement the same IJudge interface
// so the rest of the app never needs to know which one is active.

export type Language = "python" | "javascript" | "cpp" | "java";

export type Verdict =
  | "AC"    // Accepted — all test cases passed
  | "WA"    // Wrong Answer — output mismatch
  | "TLE"   // Time Limit Exceeded
  | "MLE"   // Memory Limit Exceeded
  | "RE"    // Runtime Error — crashed during execution
  | "CE";   // Compile Error — failed to compile (C++/Java)

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ExecutionResult {
  // Legacy compatibility — used by routes and storage
  status: "correct" | "incorrect" | "error";
  // New rich verdict
  verdict: Verdict;
  output: string;
  executionTime: number; // total ms across all test cases
  failedTestCase?: number; // 1-indexed number of the first failing test
}

export interface IJudge {
  execute(
    submissionId: string,
    code: string,
    language: Language,
    testCases: TestCase[],
    timeLimit: number,
    memoryLimit: number
  ): Promise<ExecutionResult>;
}
