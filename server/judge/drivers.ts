import type { Language } from "./types";

/**
 * Per-language driver harness templates.
 * Each template wraps user code in a runner that:
 *   1. Reads stdin line by line
 *   2. Parses each line as the argument for solve()
 *   3. Calls the user's solve() function
 *   4. Prints the result in a normalized format
 *
 * The user only needs to define `solve()` — the driver handles I/O.
 */

export function buildPythonDriver(userCode: string): string {
  return `
import sys
import ast
import json
import traceback

${userCode}

try:
    lines = [l.strip() for l in sys.stdin.read().strip().split('\\n') if l.strip()]
    parsed_args = []
    for line in lines:
        try:
            parsed_args.append(ast.literal_eval(line))
        except Exception:
            parsed_args.append(line)

    result = solve(*parsed_args)

    if isinstance(result, list):
        # Normalize list output: remove spaces for consistent comparison
        print(str(result).replace(', ', ',').replace('[ ', '[').replace(' ]', ']'))
    elif isinstance(result, bool):
        print(str(result).lower())
    elif result is None:
        pass
    else:
        print(result)
except Exception:
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)
`;
}

export function buildJavaScriptDriver(userCode: string): string {
  return `
'use strict';
${userCode}

const chunks = [];
process.stdin.on('data', d => chunks.push(d));
process.stdin.on('end', () => {
    try {
        const lines = chunks.join('').trim().split('\\n').filter(l => l.trim());
        const parsedArgs = lines.map(line => {
            try { return JSON.parse(line); } catch { return line; }
        });
        const result = solve(...parsedArgs);
        if (Array.isArray(result)) {
            process.stdout.write(JSON.stringify(result) + '\\n');
        } else if (typeof result === 'boolean') {
            process.stdout.write(String(result) + '\\n');
        } else if (result !== undefined && result !== null) {
            process.stdout.write(String(result) + '\\n');
        }
    } catch(e) {
        process.stderr.write(e.message + '\\n');
        process.exit(1);
    }
});
`;
}

export function buildCppDriver(userCode: string): string {
  return `
#include <bits/stdc++.h>
using namespace std;

${userCode}

int main() {
    // The user's solve() function must handle its own I/O via cin/cout.
    // If solve() does not, you can wire it up here.
    solve();
    return 0;
}
`;
}

export function buildCppStandaloneDriver(userCode: string): string {
  // For C++, we trust the user to write a complete solution including main()
  // or a solve() function that reads from cin and writes to cout.
  // We wrap it minimally.
  return userCode;
}

export function buildJavaDriver(userCode: string): string {
  // For Java, the user writes a class named Solution with a solve() method.
  // The driver wraps it in a main method that reads stdin.
  return userCode;
}

export function getDriver(language: Language, userCode: string): string {
  switch (language) {
    case "python":      return buildPythonDriver(userCode);
    case "javascript":  return buildJavaScriptDriver(userCode);
    case "cpp":         return buildCppStandaloneDriver(userCode);
    case "java":        return buildJavaDriver(userCode);
    default:            throw new Error(`Unsupported language: ${language}`);
  }
}
