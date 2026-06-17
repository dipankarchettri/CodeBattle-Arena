import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";
import type { IJudge, ExecutionResult, Language, TestCase, Verdict } from "./types";
import { getDriver } from "./drivers";

const MAX_OUTPUT_LENGTH = 10000;
const DOCKER_IMAGE = process.env.SANDBOX_IMAGE || "codebattle-sandbox";
const SANDBOX_BASE_DIR = "/tmp/codebattle";

function truncate(s: string): string {
  return s.length > MAX_OUTPUT_LENGTH
    ? s.substring(0, MAX_OUTPUT_LENGTH) + "\n[Output truncated...]"
    : s;
}

function normalizeOutput(raw: string): string {
  return raw
    .trim()
    .split("\n")
    .map(l => l.trim())
    .filter((l, i, arr) => l !== "" || i < arr.length - 1)
    .join("\n")
    .toLowerCase()
    .replace(/,\s+/g, ",")
    .replace(/\[\s+/g, "[")
    .replace(/\s+\]/g, "]");
}

function outputsMatch(actual: string, expected: string): boolean {
  const a = normalizeOutput(actual);
  const e = normalizeOutput(expected);
  if (a === e) return true;
  const fa = parseFloat(a);
  const fe = parseFloat(e);
  if (!isNaN(fa) && !isNaN(fe)) return Math.abs(fa - fe) < 1e-6;
  return false;
}

function makeResult(verdict: Verdict, status: ExecutionResult["status"], output: string, ms: number, tc?: number): ExecutionResult {
  return { verdict, status, output: truncate(output), executionTime: ms, failedTestCase: tc };
}

/**
 * Runs a Docker container with strict resource limits and no network access.
 * Writes the code to a host temp directory, mounts it read-only into the container.
 */
function runInDocker(
  hostSrcDir: string,
  dockerCmd: string[],
  stdin: string,
  timeLimit: number,
  memoryMb: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const dockerArgs = [
      "run", "--rm",
      "--network", "none",               // No internet access
      "--memory", `${memoryMb}m`,        // Memory limit
      "--memory-swap", `${memoryMb}m`,   // Disable swap
      "--cpus", "0.5",                   // CPU limit
      "--read-only",                     // Read-only root filesystem
      "--tmpfs", "/tmp:size=64m",        // Writable /tmp for compile artifacts
      "--tmpfs", "/sandbox:size=64m",    // Writable /sandbox for code
      "--security-opt", "no-new-privileges",  // Can't escalate privileges
      "--cap-drop", "ALL",               // Drop all Linux capabilities
      "-v", `${hostSrcDir}:/src:ro`,     // Mount source read-only
      DOCKER_IMAGE,
      ...dockerCmd
    ];

    const child = spawn("docker", dockerArgs, { timeout: timeLimit + 5000 });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", d => { stdout += d.toString(); });
    child.stderr.on("data", d => { stderr += d.toString(); });

    child.on("close", (code, signal) => {
      if (signal === "SIGTERM") {
        const err: any = new Error("Time Limit Exceeded");
        err.isTLE = true;
        return reject(err);
      }
      // Docker exit code 137 = OOM kill (memory limit exceeded)
      if (code === 137) {
        const err: any = new Error("Memory Limit Exceeded");
        err.isMLE = true;
        return reject(err);
      }
      if (code !== 0) {
        const err: any = new Error(stderr.trim() || `Container exited with code ${code}`);
        err.isRE = true;
        return reject(err);
      }
      resolve(stdout);
    });

    child.on("error", reject);

    if (stdin) child.stdin.write(stdin);
    child.stdin.end();
  });
}

async function runPythonInDocker(code: string, testCases: TestCase[], timeLimit: number, memoryMb: number): Promise<ExecutionResult> {
  const start = Date.now();
  const id = crypto.randomUUID();
  const hostDir = path.join(SANDBOX_BASE_DIR, id);

  try {
    await fs.mkdir(hostDir, { recursive: true });
    const driver = getDriver("python", code);
    await fs.writeFile(path.join(hostDir, "solution.py"), driver, "utf-8");

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const output = await runInDocker(hostDir, ["python3", "/src/solution.py"], tc.input, timeLimit, memoryMb);
        if (!outputsMatch(output, tc.expectedOutput)) {
          return makeResult("WA", "incorrect",
            `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
            Date.now() - start, i + 1);
        }
      } catch (err: any) {
        if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        if (err.isMLE) return makeResult("MLE", "error", `Memory Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
      }
    }
    return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
  } finally {
    await fs.rm(hostDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function runJavaScriptInDocker(code: string, testCases: TestCase[], timeLimit: number, memoryMb: number): Promise<ExecutionResult> {
  const start = Date.now();
  const id = crypto.randomUUID();
  const hostDir = path.join(SANDBOX_BASE_DIR, id);

  try {
    await fs.mkdir(hostDir, { recursive: true });
    const driver = getDriver("javascript", code);
    await fs.writeFile(path.join(hostDir, "solution.js"), driver, "utf-8");

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const output = await runInDocker(hostDir, ["node", "/src/solution.js"], tc.input, timeLimit, memoryMb);
        if (!outputsMatch(output, tc.expectedOutput)) {
          return makeResult("WA", "incorrect",
            `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
            Date.now() - start, i + 1);
        }
      } catch (err: any) {
        if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        if (err.isMLE) return makeResult("MLE", "error", `Memory Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
      }
    }
    return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
  } finally {
    await fs.rm(hostDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function runCppInDocker(code: string, testCases: TestCase[], timeLimit: number, memoryMb: number): Promise<ExecutionResult> {
  const start = Date.now();
  const id = crypto.randomUUID();
  const hostDir = path.join(SANDBOX_BASE_DIR, id);

  try {
    await fs.mkdir(hostDir, { recursive: true });
    await fs.writeFile(path.join(hostDir, "solution.cpp"), code, "utf-8");

    // Compile step inside Docker
    try {
      await runInDocker(hostDir,
        ["sh", "-c", "g++ -O2 -std=c++17 -o /tmp/solution /src/solution.cpp"],
        "", 15000, 512);
    } catch (err: any) {
      return makeResult("CE", "error", `Compile Error:\n${err.message}`, Date.now() - start);
    }

    // We need to compile into tmpfs and run — compile separately, then copy binary
    // This is done via a two-step sh -c command
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const output = await runInDocker(hostDir,
          ["sh", "-c", "g++ -O2 -std=c++17 -o /tmp/sol /src/solution.cpp && /tmp/sol"],
          tc.input, timeLimit + 10000, memoryMb);
        if (!outputsMatch(output, tc.expectedOutput)) {
          return makeResult("WA", "incorrect",
            `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
            Date.now() - start, i + 1);
        }
      } catch (err: any) {
        if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        if (err.isMLE) return makeResult("MLE", "error", `Memory Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        // Check if compile error embedded in stderr
        if (err.message?.includes("error:")) return makeResult("CE", "error", `Compile Error:\n${err.message}`, Date.now() - start);
        return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
      }
    }
    return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
  } finally {
    await fs.rm(hostDir, { recursive: true, force: true }).catch(() => {});
  }
}

async function runJavaInDocker(code: string, testCases: TestCase[], timeLimit: number, memoryMb: number): Promise<ExecutionResult> {
  const start = Date.now();
  const id = crypto.randomUUID();
  const hostDir = path.join(SANDBOX_BASE_DIR, id);

  try {
    await fs.mkdir(hostDir, { recursive: true });
    await fs.writeFile(path.join(hostDir, "Solution.java"), code, "utf-8");

    // Verify compile first
    try {
      await runInDocker(hostDir,
        ["sh", "-c", "javac -d /tmp /src/Solution.java"],
        "", 15000, 512);
    } catch (err: any) {
      return makeResult("CE", "error", `Compile Error:\n${err.message}`, Date.now() - start);
    }

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const output = await runInDocker(hostDir,
          ["sh", "-c", "javac -d /tmp /src/Solution.java && java -cp /tmp Solution"],
          tc.input, timeLimit + 10000, memoryMb);
        if (!outputsMatch(output, tc.expectedOutput)) {
          return makeResult("WA", "incorrect",
            `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
            Date.now() - start, i + 1);
        }
      } catch (err: any) {
        if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        if (err.isMLE) return makeResult("MLE", "error", `Memory Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
      }
    }
    return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
  } finally {
    await fs.rm(hostDir, { recursive: true, force: true }).catch(() => {});
  }
}

/**
 * DockerJudge — runs user code inside an isolated Docker container.
 * Requires Docker and the 'codebattle-sandbox' image to be built.
 * USE_DOCKER=true must be set in the environment.
 */
export class DockerJudge implements IJudge {
  async execute(
    _submissionId: string,
    code: string,
    language: Language,
    testCases: TestCase[],
    timeLimit: number,
    memoryLimit: number
  ): Promise<ExecutionResult> {
    if (!code?.trim()) return makeResult("RE", "error", "No code submitted.", 0);
    if (!testCases?.length) return makeResult("RE", "error", "No test cases configured.", 0);

    const memMb = memoryLimit || 256;

    // Ensure the base sandbox directory exists
    await fs.mkdir(SANDBOX_BASE_DIR, { recursive: true }).catch(() => {});

    switch (language) {
      case "python":      return runPythonInDocker(code, testCases, timeLimit, memMb);
      case "javascript":  return runJavaScriptInDocker(code, testCases, timeLimit, memMb);
      case "cpp":         return runCppInDocker(code, testCases, timeLimit, memMb);
      case "java":        return runJavaInDocker(code, testCases, timeLimit, memMb);
      default:            return makeResult("RE", "error", `Unsupported language: ${language}`, 0);
    }
  }
}
