/**
 * code-executor.ts — Judge Engine Entry Point
 *
 * Routes submissions to the correct judge backend based on environment:
 *   - USE_DOCKER=true  → DockerJudge  (Linux production, full sandbox isolation)
 *   - USE_DOCKER=false → NativeJudge  (Windows development, no isolation)
 *
 * The rest of the application only imports from this file and never
 * needs to know which judge is active.
 */
import { NativeJudge } from "./judge/native";
import { DockerJudge } from "./judge/docker";
import type { IJudge, Language, TestCase } from "./judge/types";

// Re-export types for backward compatibility with routes.ts
export type { ExecutionResult, TestCase } from "./judge/types";

const useDocker = process.env.USE_DOCKER === "true";

const judge: IJudge = useDocker ? new DockerJudge() : new NativeJudge();

console.log(`[Judge] Mode: ${useDocker ? "🐳 Docker (sandboxed)" : "⚙️  Native (dev only)"}`);

export async function executeCode(
  submissionId: string,
  code: string,
  language: Language,
  testCases: TestCase[],
  timeLimit: number,
  memoryLimit: number = 256
) {
  return judge.execute(submissionId, code, language, testCases, timeLimit, memoryLimit);
}
