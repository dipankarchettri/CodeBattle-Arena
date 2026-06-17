import { storage } from "./storage";
import { insertProblemSchema } from "@shared/schema";

// ═══════════════════════════════════════════════════════════════
// 30 Coding Problems: 15 Easy · 10 Medium · 5 Hard
// Each has ≥10 test cases, correct boilerplate, real examples.
//
// Driver contract (Python / JS):
//   stdin is split by \n, each line is parsed (ast.literal_eval / JSON.parse),
//   then passed as positional args to solve().
//   The driver prints the return value.
//
// For C++ / Java the user writes standalone code with cin/cout.
// ═══════════════════════════════════════════════════════════════

const sampleProblems = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━  EASY (1-15)  ━━━━━━━━━━━━━━━━━━━━━━━━━

  // #1 ───────────────────────────────────────────────────────────────
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
      { input: "[3,3]\n6", expectedOutput: "[0,1]" },
      { input: "[1,2,3,4,5]\n9", expectedOutput: "[3,4]" },
      { input: "[0,4,3,0]\n0", expectedOutput: "[0,3]" },
      { input: "[-1,-2,-3,-4,-5]\n-8", expectedOutput: "[2,4]" },
      { input: "[1,5,5,11]\n10", expectedOutput: "[1,2]" },
      { input: "[2,5,11,15]\n13", expectedOutput: "[0,2]" },
      { input: "[100,200,300,400]\n700", expectedOutput: "[2,3]" },
      { input: "[1,3]\n4", expectedOutput: "[0,1]" },
    ],
    exampleCases: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0,1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1,2]." },
      { input: "nums = [3,3], target = 6", output: "[0,1]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹", "Only one valid answer exists."],
    boilerplatePython: `def solve(nums, target):
    # Return a list of two indices
    pass
`,
    boilerplateJavascript: `function solve(nums, target) {
    // Return an array of two indices
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #2 ───────────────────────────────────────────────────────────────
  {
    title: "Fibonacci Number",
    description: `The Fibonacci numbers, commonly denoted F(n), form a sequence called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.

Given n, calculate F(n).`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
      { input: "2", expectedOutput: "1" },
      { input: "3", expectedOutput: "2" },
      { input: "4", expectedOutput: "3" },
      { input: "5", expectedOutput: "5" },
      { input: "10", expectedOutput: "55" },
      { input: "15", expectedOutput: "610" },
      { input: "20", expectedOutput: "6765" },
      { input: "30", expectedOutput: "832040" },
    ],
    exampleCases: [
      { input: "n = 2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
      { input: "n = 3", output: "2", explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2." },
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." },
    ],
    constraints: ["0 ≤ n ≤ 30"],
    boilerplatePython: `def solve(n):
    # Return the nth Fibonacci number
    pass
`,
    boilerplateJavascript: `function solve(n) {
    // Return the nth Fibonacci number
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #3 ───────────────────────────────────────────────────────────────
  {
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as a string s.

Return the reversed string.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '"hello"', expectedOutput: "olleh" },
      { input: '"world"', expectedOutput: "dlrow" },
      { input: '"a"', expectedOutput: "a" },
      { input: '"ab"', expectedOutput: "ba" },
      { input: '"racecar"', expectedOutput: "racecar" },
      { input: '"abcdef"', expectedOutput: "fedcba" },
      { input: '""', expectedOutput: "" },
      { input: '"OpenAI"', expectedOutput: "IAnepO" },
      { input: '"12345"', expectedOutput: "54321" },
      { input: '"A man"', expectedOutput: "nam A" },
    ],
    exampleCases: [
      { input: 's = "hello"', output: "olleh" },
      { input: 's = "world"', output: "dlrow" },
    ],
    constraints: ["0 ≤ s.length ≤ 10⁵", "s consists of printable ASCII characters"],
    boilerplatePython: `def solve(s):
    # Return the reversed string
    pass
`,
    boilerplateJavascript: `function solve(s) {
    // Return the reversed string
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #4 ───────────────────────────────────────────────────────────────
  {
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Return true if the string is valid, false otherwise.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "'()'", expectedOutput: "true" },
      { input: "'()[]{}'", expectedOutput: "true" },
      { input: "'(]'", expectedOutput: "false" },
      { input: "'([)]'", expectedOutput: "false" },
      { input: "'{[]}'", expectedOutput: "true" },
      { input: "''", expectedOutput: "true" },
      { input: "'((()))'", expectedOutput: "true" },
      { input: "'(()'", expectedOutput: "false" },
      { input: "')('", expectedOutput: "false" },
      { input: "'[{()}]'", expectedOutput: "true" },
      { input: "'{{{{{'", expectedOutput: "false" },
    ],
    exampleCases: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: ["0 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}' "],
    boilerplatePython: `def solve(s):
    # Return True or False
    pass
`,
    boilerplateJavascript: `function solve(s) {
    // Return true or false
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #5 ───────────────────────────────────────────────────────────────
  {
    title: "Palindrome Number",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same forward and backward.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "121", expectedOutput: "true" },
      { input: "-121", expectedOutput: "false" },
      { input: "10", expectedOutput: "false" },
      { input: "0", expectedOutput: "true" },
      { input: "12321", expectedOutput: "true" },
      { input: "1234321", expectedOutput: "true" },
      { input: "123", expectedOutput: "false" },
      { input: "1", expectedOutput: "true" },
      { input: "11", expectedOutput: "true" },
      { input: "-1", expectedOutput: "false" },
    ],
    exampleCases: [
      { input: "x = 121", output: "true", explanation: "121 reads as 121 from left to right and from right to left." },
      { input: "x = -121", output: "false", explanation: "From left to right, it reads -121. From right to left it becomes 121-. Therefore it is not a palindrome." },
      { input: "x = 10", output: "false", explanation: "Reads 01 from right to left. Therefore it is not a palindrome." },
    ],
    constraints: ["-2³¹ ≤ x ≤ 2³¹ - 1"],
    boilerplatePython: `def solve(x):
    # Return True if x is a palindrome, else False
    pass
`,
    boilerplateJavascript: `function solve(x) {
    // Return true if x is a palindrome, else false
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #6 ───────────────────────────────────────────────────────────────
  {
    title: "Maximum Subarray Sum",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23" },
      { input: "[-1]", expectedOutput: "-1" },
      { input: "[-2,-1]", expectedOutput: "-1" },
      { input: "[1,2,3,4,5]", expectedOutput: "15" },
      { input: "[-1,-2,-3,-4]", expectedOutput: "-1" },
      { input: "[3,-2,5,-1]", expectedOutput: "6" },
      { input: "[0,0,0,0]", expectedOutput: "0" },
      { input: "[-3,1,2,-1,4,-2]", expectedOutput: "6" },
    ],
    exampleCases: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "The subarray [1] has the largest sum 1." },
      { input: "nums = [5,4,-1,7,8]", output: "23", explanation: "The subarray [5,4,-1,7,8] has the largest sum 23." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    boilerplatePython: `def solve(nums):
    # Return the maximum subarray sum
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return the maximum subarray sum
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #7 ───────────────────────────────────────────────────────────────
  {
    title: "Contains Duplicate",
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true" },
      { input: "[1]", expectedOutput: "false" },
      { input: "[0,0]", expectedOutput: "true" },
      { input: "[-1,2,-1]", expectedOutput: "true" },
      { input: "[100,200,300]", expectedOutput: "false" },
      { input: "[5,5]", expectedOutput: "true" },
      { input: "[1,2,3,4,5,6,7,8,9,10]", expectedOutput: "false" },
      { input: "[1,2,3,4,5,6,7,8,9,1]", expectedOutput: "true" },
    ],
    exampleCases: [
      { input: "nums = [1,2,3,1]", output: "true" },
      { input: "nums = [1,2,3,4]", output: "false" },
      { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁹ ≤ nums[i] ≤ 10⁹"],
    boilerplatePython: `def solve(nums):
    # Return True if any value appears at least twice
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return true if any value appears at least twice
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #8 ───────────────────────────────────────────────────────────────
  {
    title: "Merge Two Sorted Lists (Arrays)",
    description: `You are given two integer arrays list1 and list2, both sorted in non-decreasing order. Merge the two arrays into one sorted array.

Return the merged sorted array.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,2,4]\n[1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[]\n[]", expectedOutput: "[]" },
      { input: "[]\n[0]", expectedOutput: "[0]" },
      { input: "[1]\n[2]", expectedOutput: "[1,2]" },
      { input: "[1,3,5]\n[2,4,6]", expectedOutput: "[1,2,3,4,5,6]" },
      { input: "[1,1,1]\n[1,1,1]", expectedOutput: "[1,1,1,1,1,1]" },
      { input: "[-3,-1,0]\n[-2,2,5]", expectedOutput: "[-3,-2,-1,0,2,5]" },
      { input: "[5]\n[1,2,3,4]", expectedOutput: "[1,2,3,4,5]" },
      { input: "[1,2,3]\n[]", expectedOutput: "[1,2,3]" },
      { input: "[10,20,30]\n[5,15,25,35]", expectedOutput: "[5,10,15,20,25,30,35]" },
    ],
    exampleCases: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: ["0 ≤ list1.length, list2.length ≤ 50", "-100 ≤ list1[i], list2[i] ≤ 100", "Both lists are sorted in non-decreasing order."],
    boilerplatePython: `def solve(list1, list2):
    # Return the merged sorted array
    pass
`,
    boilerplateJavascript: `function solve(list1, list2) {
    // Return the merged sorted array
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #9 ───────────────────────────────────────────────────────────────
  {
    title: "Roman to Integer",
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol  Value
I       1
V       5
X       10
L       50
C       100
D       500
M       1000

For example, 2 is written as II, 12 is written as XII (X + II). The number 27 is written as XXVII (XX + V + II).

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to IX (9), XL (40), XC (90), CD (400) and CM (900).

Given a roman numeral string, convert it to an integer.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '"III"', expectedOutput: "3" },
      { input: '"LVIII"', expectedOutput: "58" },
      { input: '"MCMXCIV"', expectedOutput: "1994" },
      { input: '"IV"', expectedOutput: "4" },
      { input: '"IX"', expectedOutput: "9" },
      { input: '"XL"', expectedOutput: "40" },
      { input: '"XC"', expectedOutput: "90" },
      { input: '"CD"', expectedOutput: "400" },
      { input: '"CM"', expectedOutput: "900" },
      { input: '"MMMCMXCIX"', expectedOutput: "3999" },
      { input: '"I"', expectedOutput: "1" },
    ],
    exampleCases: [
      { input: 's = "III"', output: "3", explanation: "III = 3." },
      { input: 's = "LVIII"', output: "58", explanation: "L = 50, V = 5, III = 3." },
      { input: 's = "MCMXCIV"', output: "1994", explanation: "M = 1000, CM = 900, XC = 90 and IV = 4." },
    ],
    constraints: ["1 ≤ s.length ≤ 15", "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')", "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."],
    boilerplatePython: `def solve(s):
    # Return the integer value of the roman numeral
    pass
`,
    boilerplateJavascript: `function solve(s) {
    // Return the integer value of the roman numeral
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #10 ──────────────────────────────────────────────────────────────
  {
    title: "Plus One",
    description: `You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,2,3]", expectedOutput: "[1,2,4]" },
      { input: "[4,3,2,1]", expectedOutput: "[4,3,2,2]" },
      { input: "[9]", expectedOutput: "[1,0]" },
      { input: "[9,9]", expectedOutput: "[1,0,0]" },
      { input: "[9,9,9]", expectedOutput: "[1,0,0,0]" },
      { input: "[0]", expectedOutput: "[1]" },
      { input: "[1,0,0]", expectedOutput: "[1,0,1]" },
      { input: "[8,9,9,9]", expectedOutput: "[9,0,0,0]" },
      { input: "[1]", expectedOutput: "[2]" },
      { input: "[2,9,9]", expectedOutput: "[3,0,0]" },
    ],
    exampleCases: [
      { input: "digits = [1,2,3]", output: "[1,2,4]", explanation: "The array represents the integer 123. Incrementing by one gives 123 + 1 = 124." },
      { input: "digits = [4,3,2,1]", output: "[4,3,2,2]", explanation: "The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322." },
      { input: "digits = [9]", output: "[1,0]", explanation: "The array represents the integer 9. 9 + 1 = 10." },
    ],
    constraints: ["1 ≤ digits.length ≤ 100", "0 ≤ digits[i] ≤ 9", "digits does not contain any leading 0's."],
    boilerplatePython: `def solve(digits):
    # Return the digits array after adding one
    pass
`,
    boilerplateJavascript: `function solve(digits) {
    // Return the digits array after adding one
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #11 ──────────────────────────────────────────────────────────────
  {
    title: "Single Number",
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[2,2,1]", expectedOutput: "1" },
      { input: "[4,1,2,1,2]", expectedOutput: "4" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[0,1,0]", expectedOutput: "1" },
      { input: "[7,3,5,3,5]", expectedOutput: "7" },
      { input: "[-1,-1,2]", expectedOutput: "2" },
      { input: "[10,20,10]", expectedOutput: "20" },
      { input: "[99,100,99]", expectedOutput: "100" },
      { input: "[5,3,5,3,9]", expectedOutput: "9" },
      { input: "[1,2,3,2,1]", expectedOutput: "3" },
    ],
    exampleCases: [
      { input: "nums = [2,2,1]", output: "1" },
      { input: "nums = [4,1,2,1,2]", output: "4" },
      { input: "nums = [1]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 3 × 10⁴", "-3 × 10⁴ ≤ nums[i] ≤ 3 × 10⁴", "Each element appears twice except for exactly one."],
    boilerplatePython: `def solve(nums):
    # Return the element that appears only once
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return the element that appears only once
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #12 ──────────────────────────────────────────────────────────────
  {
    title: "Climbing Stairs",
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "1", expectedOutput: "1" },
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "4", expectedOutput: "5" },
      { input: "5", expectedOutput: "8" },
      { input: "6", expectedOutput: "13" },
      { input: "10", expectedOutput: "89" },
      { input: "15", expectedOutput: "987" },
      { input: "20", expectedOutput: "10946" },
      { input: "30", expectedOutput: "1346269" },
    ],
    exampleCases: [
      { input: "n = 2", output: "2", explanation: "There are two ways: 1+1 and 2." },
      { input: "n = 3", output: "3", explanation: "There are three ways: 1+1+1, 1+2, and 2+1." },
    ],
    constraints: ["1 ≤ n ≤ 45"],
    boilerplatePython: `def solve(n):
    # Return the number of distinct ways to climb n stairs
    pass
`,
    boilerplateJavascript: `function solve(n) {
    // Return the number of distinct ways to climb n stairs
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #13 ──────────────────────────────────────────────────────────────
  {
    title: "Count Vowels",
    description: `Given a string s, return the number of vowels in s. Vowels are 'a', 'e', 'i', 'o', 'u' (case-insensitive).`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '"hello"', expectedOutput: "2" },
      { input: '"world"', expectedOutput: "1" },
      { input: '"aeiou"', expectedOutput: "5" },
      { input: '"AEIOU"', expectedOutput: "5" },
      { input: '"bcdfg"', expectedOutput: "0" },
      { input: '""', expectedOutput: "0" },
      { input: '"a"', expectedOutput: "1" },
      { input: '"AaBbEe"', expectedOutput: "4" },
      { input: '"Programming"', expectedOutput: "3" },
      { input: '"rhythm"', expectedOutput: "0" },
    ],
    exampleCases: [
      { input: 's = "hello"', output: "2", explanation: "The vowels are 'e' and 'o'." },
      { input: 's = "aeiou"', output: "5", explanation: "All five characters are vowels." },
    ],
    constraints: ["0 ≤ s.length ≤ 10⁵", "s consists of English letters."],
    boilerplatePython: `def solve(s):
    # Return the count of vowels in s
    pass
`,
    boilerplateJavascript: `function solve(s) {
    // Return the count of vowels in s
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #14 ──────────────────────────────────────────────────────────────
  {
    title: "Power of Two",
    description: `Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two if there exists an integer x such that n == 2ˣ.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "1", expectedOutput: "true" },
      { input: "2", expectedOutput: "true" },
      { input: "3", expectedOutput: "false" },
      { input: "4", expectedOutput: "true" },
      { input: "16", expectedOutput: "true" },
      { input: "0", expectedOutput: "false" },
      { input: "-1", expectedOutput: "false" },
      { input: "1024", expectedOutput: "true" },
      { input: "1023", expectedOutput: "false" },
      { input: "536870912", expectedOutput: "true" },
    ],
    exampleCases: [
      { input: "n = 1", output: "true", explanation: "2⁰ = 1." },
      { input: "n = 16", output: "true", explanation: "2⁴ = 16." },
      { input: "n = 3", output: "false" },
    ],
    constraints: ["-2³¹ ≤ n ≤ 2³¹ - 1"],
    boilerplatePython: `def solve(n):
    # Return True if n is a power of two
    pass
`,
    boilerplateJavascript: `function solve(n) {
    // Return true if n is a power of two
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #15 ──────────────────────────────────────────────────────────────
  {
    title: "Missing Number",
    description: `Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.`,
    difficulty: "Easy",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[3,0,1]", expectedOutput: "2" },
      { input: "[0,1]", expectedOutput: "2" },
      { input: "[9,6,4,2,3,5,7,0,1]", expectedOutput: "8" },
      { input: "[0]", expectedOutput: "1" },
      { input: "[1]", expectedOutput: "0" },
      { input: "[0,1,2,3,5]", expectedOutput: "4" },
      { input: "[1,2,3]", expectedOutput: "0" },
      { input: "[0,1,2,3,4,5,6,7,9]", expectedOutput: "8" },
      { input: "[0,2]", expectedOutput: "1" },
      { input: "[5,3,0,1,4]", expectedOutput: "2" },
    ],
    exampleCases: [
      { input: "nums = [3,0,1]", output: "2", explanation: "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number." },
      { input: "nums = [0,1]", output: "2", explanation: "n = 2 since there are 2 numbers. 2 is the missing number." },
      { input: "nums = [9,6,4,2,3,5,7,0,1]", output: "8" },
    ],
    constraints: ["n == nums.length", "1 ≤ n ≤ 10⁴", "0 ≤ nums[i] ≤ n", "All the numbers of nums are unique."],
    boilerplatePython: `def solve(nums):
    # Return the missing number
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return the missing number
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━  MEDIUM (16-25)  ━━━━━━━━━━━━━━━━━━━━━

  // #16 ──────────────────────────────────────────────────────────────
  {
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" },
      { input: '"pwwkew"', expectedOutput: "3" },
      { input: '""', expectedOutput: "0" },
      { input: '" "', expectedOutput: "1" },
      { input: '"au"', expectedOutput: "2" },
      { input: '"dvdf"', expectedOutput: "3" },
      { input: '"abcdef"', expectedOutput: "6" },
      { input: '"aab"', expectedOutput: "2" },
      { input: '"tmmzuxt"', expectedOutput: "5" },
    ],
    exampleCases: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: "3", explanation: 'The answer is "wke", with the length of 3.' },
    ],
    constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols and spaces."],
    boilerplatePython: `def solve(s):
    # Return the length of the longest substring without repeating characters
    pass
`,
    boilerplateJavascript: `function solve(s) {
    // Return the length of the longest substring without repeating characters
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #17 ──────────────────────────────────────────────────────────────
  {
    title: "Binary Search",
    description: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12]\n2", expectedOutput: "-1" },
      { input: "[1]\n1", expectedOutput: "0" },
      { input: "[1]\n0", expectedOutput: "-1" },
      { input: "[1,2,3,4,5]\n5", expectedOutput: "4" },
      { input: "[1,2,3,4,5]\n1", expectedOutput: "0" },
      { input: "[2,5]\n5", expectedOutput: "1" },
      { input: "[2,5]\n2", expectedOutput: "0" },
      { input: "[-10,-5,0,5,10]\n-5", expectedOutput: "1" },
      { input: "[1,3,5,7,9,11,13,15,17,19]\n13", expectedOutput: "6" },
    ],
    exampleCases: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1." },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique.", "nums is sorted in ascending order."],
    boilerplatePython: `def solve(nums, target):
    # Return the index of target, or -1 if not found
    pass
`,
    boilerplateJavascript: `function solve(nums, target) {
    // Return the index of target, or -1 if not found
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #18 ──────────────────────────────────────────────────────────────
  {
    title: "Product of Array Except Self",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]" },
      { input: "[2,3]", expectedOutput: "[3,2]" },
      { input: "[1,1,1,1]", expectedOutput: "[1,1,1,1]" },
      { input: "[5,2,4]", expectedOutput: "[8,20,10]" },
      { input: "[0,0]", expectedOutput: "[0,0]" },
      { input: "[1,0]", expectedOutput: "[0,1]" },
      { input: "[2,2,2,2]", expectedOutput: "[8,8,8,8]" },
      { input: "[-1,-2,-3]", expectedOutput: "[6,-3,-2]" },
      { input: "[3,5,7,11]", expectedOutput: "[385,231,165,105]" },
    ],
    exampleCases: [
      { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30", "The product of any prefix or suffix fits in a 32-bit integer."],
    boilerplatePython: `def solve(nums):
    # Return the product of array except self
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return the product of array except self
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #19 ──────────────────────────────────────────────────────────────
  {
    title: "Group Anagrams",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.

Return a list of groups, where each group is a sorted list of strings, and the groups themselves are sorted by their first element.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["ate","eat","tea"],["bat"],["nat","tan"]]' },
      { input: '[""]', expectedOutput: '[[""]]' },
      { input: '["a"]', expectedOutput: '[["a"]]' },
      { input: '["ab","ba"]', expectedOutput: '[["ab","ba"]]' },
      { input: '["abc","bca","cab","xyz","zyx"]', expectedOutput: '[["abc","bca","cab"],["xyz","zyx"]]' },
      { input: '["listen","silent","hello"]', expectedOutput: '[["hello"],["listen","silent"]]' },
      { input: '["a","b","c"]', expectedOutput: '[["a"],["b"],["c"]]' },
      { input: '["aa","aa"]', expectedOutput: '[["aa","aa"]]' },
      { input: '["dog","god","cat","tac","act"]', expectedOutput: '[["act","cat","tac"],["dog","god"]]' },
      { input: '[""]', expectedOutput: '[[""]]' },
    ],
    exampleCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["ate","eat","tea"],["bat"],["nat","tan"]]', explanation: "There are 3 groups of anagrams." },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' },
    ],
    constraints: ["1 ≤ strs.length ≤ 10⁴", "0 ≤ strs[i].length ≤ 100", "strs[i] consists of lowercase English letters."],
    boilerplatePython: `def solve(strs):
    # Group the anagrams, sort each group, sort groups by first element
    pass
`,
    boilerplateJavascript: `function solve(strs) {
    // Group the anagrams, sort each group, sort groups by first element
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #20 ──────────────────────────────────────────────────────────────
  {
    title: "3Sum",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets. Return the triplets sorted in ascending order. Each triplet should also be sorted.`,
    difficulty: "Medium",
    timeLimit: 3000,
    memoryLimit: 256,
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[0,1,1]", expectedOutput: "[]" },
      { input: "[0,0,0]", expectedOutput: "[[0,0,0]]" },
      { input: "[-2,0,1,1,2]", expectedOutput: "[[-2,0,2],[-2,1,1]]" },
      { input: "[1,-1,0]", expectedOutput: "[[-1,0,1]]" },
      { input: "[-1,-1,-1,2]", expectedOutput: "[[-1,-1,2]]" },
      { input: "[3,0,-2,-1,1,2]", expectedOutput: "[[-2,-1,3],[-2,0,2],[-1,0,1]]" },
      { input: "[0,0,0,0]", expectedOutput: "[[0,0,0]]" },
      { input: "[-4,-2,-1]", expectedOutput: "[]" },
      { input: "[-1,0,1,-1,0,1]", expectedOutput: "[[-1,0,1]]" },
    ],
    exampleCases: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets are [-1,-1,2] and [-1,0,1]." },
      { input: "nums = [0,1,1]", output: "[]", explanation: "The only possible triplet does not sum up to 0." },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]", explanation: "The only possible triplet sums up to 0." },
    ],
    constraints: ["3 ≤ nums.length ≤ 3000", "-10⁵ ≤ nums[i] ≤ 10⁵"],
    boilerplatePython: `def solve(nums):
    # Return a list of unique triplets that sum to zero
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return an array of unique triplets that sum to zero
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #21 ──────────────────────────────────────────────────────────────
  {
    title: "Container With Most Water",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
      { input: "[1,1]", expectedOutput: "1" },
      { input: "[4,3,2,1,4]", expectedOutput: "16" },
      { input: "[1,2,1]", expectedOutput: "2" },
      { input: "[2,3,4,5,18,17,6]", expectedOutput: "17" },
      { input: "[1,8,6,2,5,4,8,25,7]", expectedOutput: "49" },
      { input: "[1,2,3,4,5]", expectedOutput: "6" },
      { input: "[5,4,3,2,1]", expectedOutput: "6" },
      { input: "[10,10]", expectedOutput: "10" },
      { input: "[3,1,2,4,5]", expectedOutput: "12" },
    ],
    exampleCases: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The max area of water is between lines at index 1 and index 8." },
      { input: "height = [1,1]", output: "1" },
    ],
    constraints: ["n == height.length", "2 ≤ n ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    boilerplatePython: `def solve(height):
    # Return the maximum amount of water a container can store
    pass
`,
    boilerplateJavascript: `function solve(height) {
    // Return the maximum amount of water a container can store
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #22 ──────────────────────────────────────────────────────────────
  {
    title: "Rotate Array",
    description: `Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Return the rotated array.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,2,3,4,5,6,7]\n3", expectedOutput: "[5,6,7,1,2,3,4]" },
      { input: "[-1,-100,3,99]\n2", expectedOutput: "[3,99,-1,-100]" },
      { input: "[1,2]\n1", expectedOutput: "[2,1]" },
      { input: "[1,2]\n3", expectedOutput: "[2,1]" },
      { input: "[1]\n0", expectedOutput: "[1]" },
      { input: "[1]\n1", expectedOutput: "[1]" },
      { input: "[1,2,3]\n0", expectedOutput: "[1,2,3]" },
      { input: "[1,2,3,4]\n4", expectedOutput: "[1,2,3,4]" },
      { input: "[1,2,3,4,5]\n2", expectedOutput: "[4,5,1,2,3]" },
      { input: "[10,20,30,40,50]\n7", expectedOutput: "[40,50,10,20,30]" },
    ],
    exampleCases: [
      { input: "nums = [1,2,3,4,5,6,7], k = 3", output: "[5,6,7,1,2,3,4]", explanation: "rotate 1 step to the right: [7,1,2,3,4,5,6]. Rotate 2 steps: [6,7,1,2,3,4,5]. Rotate 3 steps: [5,6,7,1,2,3,4]." },
      { input: "nums = [-1,-100,3,99], k = 2", output: "[3,99,-1,-100]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-2³¹ ≤ nums[i] ≤ 2³¹ - 1", "0 ≤ k ≤ 10⁵"],
    boilerplatePython: `def solve(nums, k):
    # Return the array rotated to the right by k steps
    pass
`,
    boilerplateJavascript: `function solve(nums, k) {
    // Return the array rotated to the right by k steps
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #23 ──────────────────────────────────────────────────────────────
  {
    title: "Valid Sudoku",
    description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note: A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated.

The board is given as a 9x9 2D array of strings, where "." represents an empty cell.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', expectedOutput: "true" },
      { input: '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', expectedOutput: "false" },
      { input: '[[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."]]', expectedOutput: "true" },
      { input: '[["1",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","1"]]', expectedOutput: "true" },
      { input: '[["1",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."]]', expectedOutput: "true" },
      { input: '[["1","2","3","4","5","6","7","8","9"],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."]]', expectedOutput: "true" },
      { input: '[["1","1",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]', expectedOutput: "false" },
      { input: '[["1",".",".",".",".",".",".",".","."],["1",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."]]', expectedOutput: "false" },
      { input: '[["1",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".","1",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]', expectedOutput: "false" },
      { input: '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]', expectedOutput: "true" },
    ],
    exampleCases: [
      { input: "A valid standard Sudoku board", output: "true" },
      { input: "Same board but top-left is 8 (duplicate 8 in column)", output: "false" },
    ],
    constraints: ["board.length == 9", "board[i].length == 9", "board[i][j] is a digit 1-9 or '.'"],
    boilerplatePython: `def solve(board):
    # Return True if the board is valid, False otherwise
    pass
`,
    boilerplateJavascript: `function solve(board) {
    // Return true if the board is valid, false otherwise
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #24 ──────────────────────────────────────────────────────────────
  {
    title: "Top K Frequent Elements",
    description: `Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Return the result as a sorted array.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,1,1,2,2,3]\n2", expectedOutput: "[1,2]" },
      { input: "[1]\n1", expectedOutput: "[1]" },
      { input: "[3,3,3,1,1,2]\n2", expectedOutput: "[1,3]" },
      { input: "[1,2,3,4,5]\n5", expectedOutput: "[1,2,3,4,5]" },
      { input: "[5,5,5,5]\n1", expectedOutput: "[5]" },
      { input: "[1,1,2,2,3,3]\n3", expectedOutput: "[1,2,3]" },
      { input: "[-1,-1,2,2,3]\n2", expectedOutput: "[-1,2]" },
      { input: "[4,4,4,1,1,2,2,2]\n2", expectedOutput: "[2,4]" },
      { input: "[7,7,7,7,8,8,9]\n1", expectedOutput: "[7]" },
      { input: "[1,2]\n2", expectedOutput: "[1,2]" },
    ],
    exampleCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
      { input: "nums = [1], k = 1", output: "[1]" },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴", "k is in the range [1, number of unique elements]", "The answer is guaranteed to be unique."],
    boilerplatePython: `def solve(nums, k):
    # Return the k most frequent elements as a sorted list
    pass
`,
    boilerplateJavascript: `function solve(nums, k) {
    // Return the k most frequent elements as a sorted array
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #25 ──────────────────────────────────────────────────────────────
  {
    title: "Spiral Matrix",
    description: `Given an m x n matrix, return all elements of the matrix in spiral order.`,
    difficulty: "Medium",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", expectedOutput: "[1,2,3,6,9,8,7,4,5]" },
      { input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]", expectedOutput: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
      { input: "[[1]]", expectedOutput: "[1]" },
      { input: "[[1,2],[3,4]]", expectedOutput: "[1,2,4,3]" },
      { input: "[[1,2,3]]", expectedOutput: "[1,2,3]" },
      { input: "[[1],[2],[3]]", expectedOutput: "[1,2,3]" },
      { input: "[[1,2],[3,4],[5,6]]", expectedOutput: "[1,2,4,6,5,3]" },
      { input: "[[1,2,3,4]]", expectedOutput: "[1,2,3,4]" },
      { input: "[[1,2,3],[4,5,6]]", expectedOutput: "[1,2,3,6,5,4]" },
      { input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]", expectedOutput: "[1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]" },
    ],
    exampleCases: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 ≤ m, n ≤ 10", "-100 ≤ matrix[i][j] ≤ 100"],
    boilerplatePython: `def solve(matrix):
    # Return elements in spiral order
    pass
`,
    boilerplateJavascript: `function solve(matrix) {
    // Return elements in spiral order
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━  HARD (26-30)  ━━━━━━━━━━━━━━━━━━━━━━━

  // #26 ──────────────────────────────────────────────────────────────
  {
    title: "Trapping Rain Water",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    difficulty: "Hard",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
      { input: "[4,2,0,3,2,5]", expectedOutput: "9" },
      { input: "[1,0,1]", expectedOutput: "1" },
      { input: "[3,0,0,2,0,4]", expectedOutput: "10" },
      { input: "[0,0,0]", expectedOutput: "0" },
      { input: "[5,4,3,2,1]", expectedOutput: "0" },
      { input: "[1,2,3,4,5]", expectedOutput: "0" },
      { input: "[5,2,1,2,1,5]", expectedOutput: "14" },
      { input: "[2,0,2]", expectedOutput: "2" },
      { input: "[0,7,1,4,6]", expectedOutput: "7" },
    ],
    exampleCases: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "6 units of rain water are trapped." },
      { input: "height = [4,2,0,3,2,5]", output: "9" },
    ],
    constraints: ["n == height.length", "1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    boilerplatePython: `def solve(height):
    # Return the total water trapped
    pass
`,
    boilerplateJavascript: `function solve(height) {
    // Return the total water trapped
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #27 ──────────────────────────────────────────────────────────────
  {
    title: "Minimum Window Substring",
    description: `Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The answer is guaranteed to be unique when it exists.`,
    difficulty: "Hard",
    timeLimit: 3000,
    memoryLimit: 256,
    testCases: [
      { input: '"ADOBECODEBANC"\n"ABC"', expectedOutput: "BANC" },
      { input: '"a"\n"a"', expectedOutput: "a" },
      { input: '"a"\n"aa"', expectedOutput: "" },
      { input: '"aa"\n"aa"', expectedOutput: "aa" },
      { input: '"abc"\n"b"', expectedOutput: "b" },
      { input: '"ADOBECODEBANC"\n"ABCC"', expectedOutput: "CODEBANC" },
      { input: '"ab"\n"b"', expectedOutput: "b" },
      { input: '"bba"\n"ab"', expectedOutput: "ba" },
      { input: '"cabwefgewcwaefgcf"\n"cae"', expectedOutput: "cwae" },
      { input: '"aaaaaaaaaaaabbbbbcdd"\n"abcdd"', expectedOutput: "abbbbbcdd" },
    ],
    exampleCases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: "BANC", explanation: "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t." },
      { input: 's = "a", t = "a"', output: "a" },
      { input: 's = "a", t = "aa"', output: '""', explanation: "Both 'a's from t must be included in the window but s only has one 'a'." },
    ],
    constraints: ["m == s.length", "n == t.length", "1 ≤ m, n ≤ 10⁵", "s and t consist of uppercase and lowercase English letters."],
    boilerplatePython: `def solve(s, t):
    # Return the minimum window substring, or "" if none exists
    pass
`,
    boilerplateJavascript: `function solve(s, t) {
    // Return the minimum window substring, or "" if none exists
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #28 ──────────────────────────────────────────────────────────────
  {
    title: "Longest Increasing Subsequence",
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.`,
    difficulty: "Hard",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4" },
      { input: "[0,1,0,3,2,3]", expectedOutput: "4" },
      { input: "[7,7,7,7,7,7,7]", expectedOutput: "1" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[1,2,3,4,5]", expectedOutput: "5" },
      { input: "[5,4,3,2,1]", expectedOutput: "1" },
      { input: "[3,5,6,2,5,4,19,5,6,7,12]", expectedOutput: "6" },
      { input: "[1,3,6,7,9,4,10,5,6]", expectedOutput: "6" },
      { input: "[2,2]", expectedOutput: "1" },
      { input: "[4,10,4,3,8,9]", expectedOutput: "3" },
    ],
    exampleCases: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4", explanation: "The longest increasing subsequence is [0,1,2,3]." },
      { input: "nums = [7,7,7,7,7,7,7]", output: "1" },
    ],
    constraints: ["1 ≤ nums.length ≤ 2500", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    boilerplatePython: `def solve(nums):
    # Return the length of the longest strictly increasing subsequence
    pass
`,
    boilerplateJavascript: `function solve(nums) {
    // Return the length of the longest strictly increasing subsequence
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #29 ──────────────────────────────────────────────────────────────
  {
    title: "Word Break",
    description: `Given a string s and a list of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
    difficulty: "Hard",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: '"leetcode"\n["leet","code"]', expectedOutput: "true" },
      { input: '"applepenapple"\n["apple","pen"]', expectedOutput: "true" },
      { input: '"catsandog"\n["cats","dog","sand","and","cat"]', expectedOutput: "false" },
      { input: '"a"\n["a"]', expectedOutput: "true" },
      { input: '"ab"\n["a","b"]', expectedOutput: "true" },
      { input: '"cars"\n["car","ca","rs"]', expectedOutput: "true" },
      { input: '"aaaaaaa"\n["aaa","aaaa"]', expectedOutput: "true" },
      { input: '"bb"\n["a","b","bbb","bbbb"]', expectedOutput: "true" },
      { input: '"goalspecial"\n["go","goal","goals","special"]', expectedOutput: "true" },
      { input: '"abcd"\n["a","abc","b","cd"]', expectedOutput: "true" },
    ],
    exampleCases: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explanation: '"leetcode" can be segmented as "leet code".' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true", explanation: '"applepenapple" can be segmented as "apple pen apple".' },
      { input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', output: "false" },
    ],
    constraints: ["1 ≤ s.length ≤ 300", "1 ≤ wordDict.length ≤ 1000", "1 ≤ wordDict[i].length ≤ 20", "s and wordDict[i] consist of only lowercase English letters.", "All strings in wordDict are unique."],
    boilerplatePython: `def solve(s, wordDict):
    # Return True if s can be segmented into dictionary words
    pass
`,
    boilerplateJavascript: `function solve(s, wordDict) {
    // Return true if s can be segmented into dictionary words
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },

  // #30 ──────────────────────────────────────────────────────────────
  {
    title: "Median of Two Sorted Arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Return the median as a number. If the total number of elements is even, the median is the average of the two middle elements.`,
    difficulty: "Hard",
    timeLimit: 2000,
    memoryLimit: 256,
    testCases: [
      { input: "[1,3]\n[2]", expectedOutput: "2" },
      { input: "[1,2]\n[3,4]", expectedOutput: "2.5" },
      { input: "[0,0]\n[0,0]", expectedOutput: "0" },
      { input: "[]\n[1]", expectedOutput: "1" },
      { input: "[2]\n[]", expectedOutput: "2" },
      { input: "[1,2,3]\n[4,5,6]", expectedOutput: "3.5" },
      { input: "[1]\n[2,3,4,5,6]", expectedOutput: "3.5" },
      { input: "[1,3,5]\n[2,4,6]", expectedOutput: "3.5" },
      { input: "[1,2]\n[1,2]", expectedOutput: "1.5" },
      { input: "[3]\n[-2,-1]", expectedOutput: "-1" },
    ],
    exampleCases: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2", explanation: "merged array = [1,2,3] and median is 2." },
      { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5", explanation: "merged array = [1,2,3,4] and median is (2+3)/2 = 2.5." },
    ],
    constraints: ["nums1.length == m", "nums2.length == n", "0 ≤ m ≤ 1000", "0 ≤ n ≤ 1000", "1 ≤ m + n ≤ 2000", "-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶"],
    boilerplatePython: `def solve(nums1, nums2):
    # Return the median of the two sorted arrays
    pass
`,
    boilerplateJavascript: `function solve(nums1, nums2) {
    // Return the median of the two sorted arrays
}
`,
      boilerplateCpp: `#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // TODO: Write your solution here
    void solve() {
        
    }
};

int main() {
    // Note: In CodeBattle Native Judge for C++, you must handle your own I/O.
    // Read your test cases from cin and output to cout.
    // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
    Solution sol;
    // Example: string s; while(cin >> s) { sol.solve(); }
    return 0;
}`,
    boilerplateJava: `import java.util.*;

public class Solution {
    // TODO: Write your solution here
    public void solve() {
        
    }

    public static void main(String[] args) {
        // Note: In CodeBattle Native Judge for Java, you must handle your own I/O.
        // Read your test cases from System.in and output to System.out.
        // Ensure you parse arrays like "[1,2,3]" correctly if they appear in input.
        Scanner scanner = new Scanner(System.in);
        Solution sol = new Solution();
        // Example: while(scanner.hasNext()) { sol.solve(); }
    }
}`,
  },
];

export async function seedProblems() {
  // Check if problems already exist to prevent re-seeding on every server restart.
  const problemCount = await storage.getProblemCount();
  if (problemCount > 0) {
    console.log("Problems already exist in the database. Skipping seeding.");
    return;
  }

  console.log("Seeding 30 problems...");
  for (const problem of sampleProblems) {
    try {
      // Parse through Zod schema to apply defaults (e.g. boilerplateCpp/Java default to "")
      const parsedProblem = insertProblemSchema.parse(problem);
      const created = await storage.createProblem(parsedProblem);
      console.log(`  ✓ [${created.difficulty}] ${created.title}`);
    } catch (error) {
      console.error(`  ✗ Error creating problem "${problem.title}":`, error);
    }
  }
  console.log("Seeding complete! 30 problems created.");
}
