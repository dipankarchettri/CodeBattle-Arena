import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";
import type { IJudge, ExecutionResult, Language, TestCase, Verdict } from "./types";
import { getDriver } from "./drivers";

const MAX_OUTPUT_LENGTH = 10000;

function truncate(s: string): string {
  return s.length > MAX_OUTPUT_LENGTH
    ? s.substring(0, MAX_OUTPUT_LENGTH) + "\n[Output truncated...]"
    : s;
}

/**
 * Normalize output before comparison:
 * - Trim leading/trailing whitespace on every line
 * - Remove empty trailing lines
 * - Collapse spaces in list-like outputs
 * - Handle boolean casing differences
 */
function normalizeOutput(raw: string): string {
  return raw
    .trim()
    .split("\n")
    .map(l => l.trim())
    .filter((l, i, arr) => l !== "" || i < arr.length - 1)
    .join("\n")
    .toLowerCase() // handles True/true, False/false
    .replace(/,\s+/g, ",") // [0, 1] → [0,1]
    .replace(/\[\s+/g, "[")
    .replace(/\s+\]/g, "]");
}

function outputsMatch(actual: string, expected: string): boolean {
  const a = normalizeOutput(actual);
  const e = normalizeOutput(expected);
  if (a === e) return true;

  // Try float comparison on single-value outputs
  const fa = parseFloat(a);
  const fe = parseFloat(e);
  if (!isNaN(fa) && !isNaN(fe)) {
    return Math.abs(fa - fe) < 1e-6;
  }

  return false;
}

/**
 * Runs a command and returns stdout. Rejects with an error that includes
 * the exit signal and stderr so callers can distinguish TLE/RE/CE.
 */
function runProcess(
  cmd: string,
  args: string[],
  stdin: string,
  timeoutMs: number,
  cwd?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      timeout: timeoutMs,
      cwd,
      shell: false,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => { stdout += d.toString(); });
    child.stderr.on("data", (d) => { stderr += d.toString(); });

    child.on("close", (code, signal) => {
      if (signal === "SIGTERM") {
        const err: any = new Error("Time Limit Exceeded");
        err.isTLE = true;
        return reject(err);
      }
      if (code !== 0) {
        const err: any = new Error(stderr.trim() || `Process exited with code ${code}`);
        err.isRE = true;
        err.stderr = stderr;
        return reject(err);
      }
      resolve(stdout);
    });

    child.on("error", (err: any) => {
      if (err.code === "ENOENT") {
        err.isCE = true;
        err.message = `Command not found: '${cmd}'. Make sure it is installed and in your PATH.`;
      }
      reject(err);
    });

    if (stdin) child.stdin.write(stdin);
    child.stdin.end();
  });
}

function makeResult(verdict: Verdict, status: ExecutionResult["status"], output: string, ms: number, tc?: number): ExecutionResult {
  return { verdict, status, output: truncate(output), executionTime: ms, failedTestCase: tc };
}

/**
 * Runs Python and JavaScript code. These are available on both Windows and Linux.
 */
async function runInterpreted(
  language: "python" | "javascript",
  code: string,
  testCases: TestCase[],
  timeLimit: number
): Promise<ExecutionResult> {
  const start = Date.now();
  const driverCode = getDriver(language, code);
  const cmd = language === "python"
    ? (process.platform === "win32" ? "python" : "python3")
    : "node";
  const args = language === "python" ? ["-c", driverCode] : ["-e", driverCode];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const output = await runProcess(cmd, args, tc.input, timeLimit);
      if (!outputsMatch(output, tc.expectedOutput)) {
        return makeResult("WA", "incorrect",
          `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
          Date.now() - start, i + 1
        );
      }
    } catch (err: any) {
      if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
      return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
    }
  }

  return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
}

/**
 * C++ judge: compile to a temp binary, then run per test case.
 * Requires g++ in PATH. On Windows, install MinGW-w64.
 * On Linux, install via: sudo apt-get install g++
 */
async function runCpp(
  code: string,
  testCases: TestCase[],
  timeLimit: number
): Promise<ExecutionResult> {
  const start = Date.now();
  const id = crypto.randomUUID();
  const tmpDir = os.tmpdir();
  const srcFile = path.join(tmpDir, `cb_${id}.cpp`);
  const binFile = path.join(tmpDir, `cb_${id}${process.platform === "win32" ? ".exe" : ""}`);

  try {
    await fs.writeFile(srcFile, code, "utf-8");
    // Compile
    try {
      await runProcess("g++", ["-O2", "-std=c++17", "-o", binFile, srcFile], "", 15000);
    } catch (err: any) {
      return makeResult("CE", "error", `Compile Error:\n${err.message}`, Date.now() - start);
    }

    // Run per test case
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const output = await runProcess(binFile, [], tc.input, timeLimit);
        if (!outputsMatch(output, tc.expectedOutput)) {
          return makeResult("WA", "incorrect",
            `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
            Date.now() - start, i + 1
          );
        }
      } catch (err: any) {
        if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
      }
    }

    return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
  } finally {
    // Clean up temp files
    await fs.unlink(srcFile).catch(() => {});
    await fs.unlink(binFile).catch(() => {});
  }
}

/**
 * Java judge: compile to a temp directory, then run.
 * Requires javac and java in PATH. Install JDK 17+.
 */
async function runJava(
  code: string,
  testCases: TestCase[],
  timeLimit: number
): Promise<ExecutionResult> {
  const start = Date.now();
  const id = crypto.randomUUID().replace(/-/g, "");
  const tmpDir = path.join(os.tmpdir(), `cb_java_${id}`);

  try {
    await fs.mkdir(tmpDir, { recursive: true });
    const srcFile = path.join(tmpDir, "Solution.java");
    await fs.writeFile(srcFile, code, "utf-8");

    // Compile
    try {
      await runProcess("javac", ["-d", tmpDir, srcFile], "", 15000);
    } catch (err: any) {
      return makeResult("CE", "error", `Compile Error:\n${err.message}`, Date.now() - start);
    }

    // Run per test case
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      try {
        const output = await runProcess("java", ["-cp", tmpDir, "Solution"], tc.input, timeLimit);
        if (!outputsMatch(output, tc.expectedOutput)) {
          return makeResult("WA", "incorrect",
            `Wrong Answer on Test Case ${i + 1}\n\nInput:\n${tc.input}\n\nExpected:\n${tc.expectedOutput}\n\nGot:\n${output.trim()}`,
            Date.now() - start, i + 1
          );
        }
      } catch (err: any) {
        if (err.isTLE) return makeResult("TLE", "error", `Time Limit Exceeded on Test Case ${i + 1}`, Date.now() - start, i + 1);
        return makeResult("RE", "error", `Runtime Error on Test Case ${i + 1}:\n${err.message}`, Date.now() - start, i + 1);
      }
    }

    return makeResult("AC", "correct", `Accepted — all ${testCases.length} test case(s) passed!`, Date.now() - start);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

/**
 * NativeJudge — runs directly on the host OS.
 * For development use only (no sandbox isolation).
 * C++ and Java require the respective compilers in PATH.
 */
export class NativeJudge implements IJudge {
  async execute(
    _submissionId: string,
    code: string,
    language: Language,
    testCases: TestCase[],
    timeLimit: number,
    _memoryLimit: number
  ): Promise<ExecutionResult> {
    if (!code?.trim()) {
      return makeResult("RE", "error", "No code submitted.", 0);
    }
    if (!testCases?.length) {
      return makeResult("RE", "error", "No test cases configured for this problem.", 0);
    }

    switch (language) {
      case "python":
      case "javascript":
        return runInterpreted(language, code, testCases, timeLimit);
      case "cpp":
        return runCpp(code, testCases, timeLimit);
      case "java":
        return runJava(code, testCases, timeLimit);
      default:
        return makeResult("RE", "error", `Unsupported language: ${language}`, 0);
    }
  }
}
