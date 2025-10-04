import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Submission } from "@shared/schema";

type Language = "python" | "javascript";
type SubmissionStatus = "pending" | "correct" | "incorrect" | "error" | null;

// ✅ THIS IS THE FIX ✅
// The interface now correctly includes the optional boilerplate props.
interface CodeEditorProps {
  problemId: string;
  isLocked: boolean;
  boilerplatePython?: string;
  boilerplateJavascript?: string;
}

export default function CodeEditor({
  problemId,
  isLocked,
  boilerplatePython,
  boilerplateJavascript,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const [output, setOutput] = useState("");
  const { toast } = useToast();
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (boilerplatePython) {
      setCode(boilerplatePython);
    }
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
      setStatus(data.status as SubmissionStatus);
      setOutput(data.output || "Execution finished without output.");
      queryClient.invalidateQueries({ queryKey: ["/api/submissions"] });

      if (data.status === "correct") {
        toast({ title: "Accepted!", description: `Execution time: ${data.executionTime}ms` });
      } else if (data.status === "incorrect") {
        toast({ title: "Wrong Answer", description: "See output for details.", variant: "destructive" });
      } else {
        toast({ title: "Runtime Error", description: "See output for details.", variant: "destructive" });
      }
    },
    onError: (error: Error) => {
      console.error("Detailed Submission Error:", error);
      setStatus("error");
      setOutput(`Submission failed. Check the browser's developer console (F12) for details.\n\nMessage: ${error.message}`);
      toast({ title: "Submission Error", description: error.message, variant: "destructive" });
    },
  });

  const handleLanguageChange = (value: Language) => {
    setLanguage(value);
    if (value === "javascript" && boilerplateJavascript) {
      setCode(boilerplateJavascript);
    } else if (value === "python" && boilerplatePython) {
      setCode(boilerplatePython);
    }
    setStatus(null);
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
    
    setStatus("pending");
    setOutput("Running test cases...");
    submitMutation.mutate();
  };

  const getStatusBadge = () => {
    if (status === "correct") return <Badge className="bg-primary text-primary-foreground"><CheckCircle2 className="w-4 h-4 mr-1" /> Accepted</Badge>;
    if (status === "incorrect") return <Badge variant="destructive"><XCircle className="w-4 h-4 mr-1" /> Wrong Answer</Badge>;
    if (status === "error") return <Badge variant="destructive"><AlertCircle className="w-4 h-4 mr-1" /> Runtime Error</Badge>;
    return null;
  };

  if (!boilerplatePython) {
    return <div className="p-4">Loading Editor...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]" data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>
          {getStatusBadge()}
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

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
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

      {(status && status !== 'pending') && (
        <div className="border-t border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Output</h3>
          <pre className="font-mono text-sm text-text-secondary whitespace-pre-wrap" data-testid="text-output">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

