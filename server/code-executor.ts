import { spawn } from "child_process";

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ExecutionResult {
  status: "correct" | "incorrect" | "error";
  output: string;
  executionTime: number;
}

const MAX_OUTPUT_LENGTH = 10000;

function sanitizeOutput(output: string) {
  if (output.length > MAX_OUTPUT_LENGTH) {
    return output.substring(0, MAX_OUTPUT_LENGTH) + "\n[Output truncated...]";
  }
  return output;
}

/**
 * Executes a command in a child process, handling stdin, stdout, stderr, and timeouts.
 */
function executeInChildProcess(
  command: string,
  args: string[],
  testCaseInput: string,
  timeLimit: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { timeout: timeLimit });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => { stdout += data.toString(); });
    child.stderr.on("data", (data) => { stderr += data.toString(); });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `Process exited with code ${code}`));
      } else {
        resolve(stdout.trim());
      }
    });

    child.on("error", (err) => {
      reject(err);
    });

    if (testCaseInput) {
      child.stdin.write(testCaseInput);
    }
    child.stdin.end();
  });
}

/**
 * Executes Python code against a set of test cases.
 */
async function executePython(
  code: string,
  testCases: TestCase[],
  timeLimit: number
): Promise<ExecutionResult> {
  const startTime = Date.now();
  const pythonCmd = process.platform === "win32" ? "python" : "python3";

  try {
    for (const testCase of testCases) {
      const driverCode = `
import sys
import ast
import traceback

# --- User's code is injected here ---
${code}
# --- End of user's code ---

try:
    lines = sys.stdin.readlines()
    if lines:
        parsed_args = [ast.literal_eval(line.strip()) for line in lines]
        result = solve(*parsed_args)
        
        if isinstance(result, list):
            print(str(result).replace(" ", ""))
        else:
            print(result)
except Exception:
    traceback.print_exc(file=sys.stderr)
`;
      
      const output = await executeInChildProcess(pythonCmd, ["-c", driverCode], testCase.input, timeLimit);

      if (output.trim() !== testCase.expectedOutput.trim()) {
        // ✅ UPDATED: Provide detailed feedback on failure
        return {
          status: "incorrect",
          output: sanitizeOutput(
            `Test Case Failed\n\nInput:\n${testCase.input}\n\nExpected Output:\n${testCase.expectedOutput}\n\nYour Output:\n${output}`
          ),
          executionTime: Date.now() - startTime,
        };
      }
    }

    return {
      status: "correct",
      output: "All test cases passed!",
      executionTime: Date.now() - startTime,
    };
  } catch (error: any) {
    const isTimeout = error.signal === "SIGTERM" || error.message?.includes("ETIMEDOUT");
    return {
      status: "error",
      output: sanitizeOutput(isTimeout ? "Time Limit Exceeded" : `Runtime Error:\n${error.message}`),
      executionTime: Date.now() - startTime,
    };
  }
}

/**
 * ✅ NEW: Executes JavaScript code against a set of test cases.
 */
async function executeJavaScript(
  code: string,
  testCases: TestCase[],
  timeLimit: number
): Promise<ExecutionResult> {
  const startTime = Date.now();

  try {
    for (const testCase of testCases) {
      const driverCode = `
// --- User's code is injected here ---
${code}
// --- End of user's code ---

const fs = require('fs');
try {
    const input = fs.readFileSync(0, 'utf-8'); // Read all of stdin
    const lines = input.trim().split('\\n');
    const parsedArgs = lines.map(line => JSON.parse(line));
    
    const result = solve(...parsedArgs);
    
    // Print result in a consistent, judge-friendly format
    console.log(JSON.stringify(result));
} catch (e) {
    console.error(e.message); // Send errors to stderr
}
`;
      
      const output = await executeInChildProcess("node", ["-e", driverCode], testCase.input, timeLimit);

      if (output.trim() !== testCase.expectedOutput.trim()) {
        // ✅ UPDATED: Provide detailed feedback on failure
        return {
          status: "incorrect",
          output: sanitizeOutput(
            `Test Case Failed\n\nInput:\n${testCase.input}\n\nExpected Output:\n${testCase.expectedOutput}\n\nYour Output:\n${output}`
          ),
          executionTime: Date.now() - startTime,
        };
      }
    }

    return {
      status: "correct",
      output: "All test cases passed!",
      executionTime: Date.now() - startTime,
    };
  } catch (error: any) {
    const isTimeout = error.signal === "SIGTERM" || error.message?.includes("ETIMEDOUT");
    return {
      status: "error",
      output: sanitizeOutput(isTimeout ? "Time Limit Exceeded" : `Runtime Error:\n${error.message}`),
      executionTime: Date.now() - startTime,
    };
  }
}

/**
 * Main entry point for code execution.
 */
export async function executeCode(
  submissionId: string,
  code: string,
  language: "python" | "javascript",
  testCases: TestCase[],
  timeLimit: number
): Promise<ExecutionResult> {
  if (!code || !testCases?.length) {
    return { status: "error", output: "No code or test cases provided", executionTime: 0 };
  }
  
  // ✅ UPDATED: Route to the correct executor based on language
  if (language === "python") {
    return executePython(code, testCases, timeLimit);
  } else if (language === "javascript") {
    return executeJavaScript(code, testCases, timeLimit);
  } else {
    return { status: "error", output: `Unsupported language: ${language}`, executionTime: 0 };
  }
}

