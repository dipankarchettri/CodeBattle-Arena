import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Play, Clock } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Submission } from "@shared/schema";

type Language = "python" | "javascript" | "cpp" | "java";

// Monaco editor language mapping
const monacoLanguageMap: Record<Language, string> = {
  python: "python",
  javascript: "javascript",
  cpp: "cpp",
  java: "java",
};

interface CodeEditorProps {
  problemId: string;
  isLocked: boolean;
  boilerplatePython?: string;
  boilerplateJavascript?: string;
  boilerplateCpp?: string;
  boilerplateJava?: string;
}

const DEFAULT_BOILERPLATE: Record<Language, string> = {
  python: "def solve():\n    pass\n",
  javascript: "function solve() {\n    // your code here\n}\n",
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // your code here\n    return 0;\n}\n",
  java: "import java.util.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // your code here\n    }\n}\n",
};

export default function CodeEditor({
  problemId,
  isLocked,
  boilerplatePython,
  boilerplateJavascript,
  boilerplateCpp,
  boilerplateJava,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState(boilerplatePython || DEFAULT_BOILERPLATE.python);
  const [verdict, setVerdict] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [output, setOutput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (boilerplatePython) setCode(boilerplatePython);
  }, [boilerplatePython]);

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor;
    editor.onDidPaste(() => {
      toast({
        title: "Pasting Disabled",
        description: "Pasting is not allowed to ensure fair competition.",
        variant: "destructive",
      });
      editor.trigger('keyboard', 'undo', null);
    });
  };

  const getBoilerplateForLanguage = (lang: Language): string => {
    switch (lang) {
      case "python":      return boilerplatePython      || DEFAULT_BOILERPLATE.python;
      case "javascript":  return boilerplateJavascript  || DEFAULT_BOILERPLATE.javascript;
      case "cpp":         return boilerplateCpp          || DEFAULT_BOILERPLATE.cpp;
      case "java":        return boilerplateJava         || DEFAULT_BOILERPLATE.java;
    }
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/submissions", {
        problemId,
        code,
        language,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `Request failed with status ${response.status}`
        }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },
    onSuccess: (data: Submission) => {
      setIsPending(false);
      const v = data.verdict || (data.status === "correct" ? "AC" : data.status === "incorrect" ? "WA" : "RE");
      setVerdict(v);
      setExecutionTime(data.executionTime);
      setOutput(data.output || "Execution finished without output.");
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });

      if (v === "AC") {
        toast({ title: "✅ Accepted!", description: `All test cases passed in ${data.executionTime}ms` });
      } else if (v === "WA") {
        toast({ title: "❌ Wrong Answer", description: "Your output didn't match the expected output.", variant: "destructive" });
      } else if (v === "TLE") {
        toast({ title: "⏱️ Time Limit Exceeded", description: "Your solution was too slow.", variant: "destructive" });
      } else if (v === "MLE") {
        toast({ title: "💾 Memory Limit Exceeded", description: "Your solution used too much memory.", variant: "destructive" });
      } else if (v === "CE") {
        toast({ title: "⚠️ Compile Error", description: "Your code failed to compile.", variant: "destructive" });
      } else {
        toast({ title: "💥 Runtime Error", description: "Your code crashed during execution.", variant: "destructive" });
      }
    },
    onError: (error: Error) => {
      setIsPending(false);
      setVerdict("RE");
      setOutput(`Submission failed.\n\nMessage: ${error.message}`);
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    },
  });

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    setCode(getBoilerplateForLanguage(value));
    setVerdict(null);
    setExecutionTime(null);
    setOutput("");
  };

  const handleSubmit = () => {
    if (isLocked) {
      toast({
        title: "Submission Locked",
        description: "You have exceeded the maximum number of tab switches.",
        variant: "destructive",
      });
      return;
    }

    setIsPending(true);
    setVerdict(null);
    setOutput("⏳ Running test cases...");
    submitMutation.mutate();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[160px]" data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>

          {/* Verdict badge shown inline after submission */}
          {verdict && !isPending && (
            <div className="flex items-center gap-2">
              <VerdictBadge verdict={verdict} size="md" />
              {executionTime != null && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {executionTime}ms
                </span>
              )}
            </div>
          )}
          {isPending && (
            <span className="text-xs text-muted-foreground animate-pulse">Running...</span>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={submitMutation.isPending || isLocked}
          data-testid="button-submit-code"
        >
          <Play className="w-4 h-4 mr-2" />
          {submitMutation.isPending ? "Running..." : "Submit"}
        </Button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={monacoLanguageMap[language]}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: language === "python" ? 4 : 2,
          }}
        />
      </div>

      {/* Output panel */}
      {output && !isPending && (
        <div className={`border-t border-border p-4 ${
          verdict === "AC"
            ? "bg-emerald-950/30"
            : verdict === "WA" || verdict === "RE" || verdict === "CE"
            ? "bg-red-950/30"
            : verdict === "TLE"
            ? "bg-amber-950/30"
            : "bg-card"
        }`}>
          <h3 className="text-sm font-semibold mb-2">Output</h3>
          <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap" data-testid="text-output">
            {output}
          </pre>
        </div>
      )}
      {isPending && output && (
        <div className="border-t border-border bg-card p-4">
          <p className="text-sm text-muted-foreground animate-pulse">{output}</p>
        </div>
      )}
    </div>
  );
}
