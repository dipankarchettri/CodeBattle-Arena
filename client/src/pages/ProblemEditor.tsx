import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// ✅ THE FIX: 'queryClient' has been removed from this import.
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { InsertProblem, Problem } from "@shared/schema";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description is required."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  timeLimit: z.coerce.number().int().positive("Time limit must be a positive number."),
  memoryLimit: z.coerce.number().int().positive("Memory limit must be a positive number."),
  testCases: z.string().refine(val => { try { JSON.parse(val); return true; } catch { return false; } }, "Must be a valid JSON array."),
  exampleCases: z.string().refine(val => { try { JSON.parse(val); return true; } catch { return false; } }, "Must be a valid JSON array."),
  constraints: z.string().transform(val => val.split('\n').filter(Boolean)),
});

// This type represents the form's data BEFORE Zod's transformations.
type ProblemFormValues = z.input<typeof formSchema>;
// This type represents the form's data AFTER Zod's transformations.
type ProblemFormOutputValues = z.output<typeof formSchema>;

export default function ProblemEditor({ params }: { params: { id?: string } }) {
  const [_location, setLocation] = useLocation();
  const { toast } = useToast();
  
  const problemId = params?.id;
  const isEditing = !!problemId;

  const { data: problemData, isLoading: isLoadingProblem } = useQuery<Problem>({
    queryKey: ["/api/problems", problemId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/problems/${problemId}`);
      if (!res.ok) throw new Error("Failed to fetch problem data");
      return res.json();
    },
    enabled: isEditing,
  });

  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Easy",
      timeLimit: 1000,
      memoryLimit: 256,
      testCases: '[]',
      exampleCases: '[]',
      constraints: "",
    },
  });

  useEffect(() => {
    if (isEditing && problemData) {
      form.reset({
        title: problemData.title,
        description: problemData.description,
        difficulty: problemData.difficulty as "Easy" | "Medium" | "Hard",
        timeLimit: problemData.timeLimit,
        memoryLimit: problemData.memoryLimit,
        testCases: JSON.stringify(problemData.testCases, null, 2),
        exampleCases: JSON.stringify(problemData.exampleCases, null, 2),
        constraints: problemData.constraints.join('\n'),
      });
    }
  }, [problemData, isEditing, form]);

  const mutation = useMutation({
    mutationFn: (data: InsertProblem) => {
      const url = isEditing ? `/api/problems/${problemId}` : "/api/problems";
      const method = isEditing ? "PUT" : "POST";
      return apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/problems"] });
      toast({ title: isEditing ? "Problem Updated" : "Problem Created", description: "The problem has been saved successfully." });
      setLocation("/admin");
    },
    onError: (error: Error) => {
      toast({ title: "Save Failed", description: error.message, variant: "destructive" });
    }
  });

  // The 'values' object passed here has already been validated and transformed by zodResolver.
  // We type it with the schema's OUTPUT type.
  function onSubmit(values: ProblemFormOutputValues) {
    // We no longer need to call formSchema.parse() here.
    // We just need to parse the JSON strings, as they are not transformed.
    const finalData = {
      ...values, // `values.constraints` is already a string[]
      testCases: JSON.parse((values as any).testCases),
      exampleCases: JSON.parse((values as any).exampleCases),
    };
    mutation.mutate(finalData);
  }

  if (isLoadingProblem) return <div className="text-center p-8">Loading problem data...</div>;

  return (
    <div className="card max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? "Edit Problem" : "Create New Problem"}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ... (The rest of your JSX form fields remain the same) ... */}
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem><FormLabel>Description (Markdown supported)</FormLabel><FormControl><Textarea rows={10} {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField control={form.control} name="difficulty" render={({ field }) => (
              <FormItem><FormLabel>Difficulty</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Easy">Easy</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Hard">Hard</SelectItem></SelectContent></Select><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="timeLimit" render={({ field }) => (
              <FormItem><FormLabel>Time Limit (ms)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="memoryLimit" render={({ field }) => (
              <FormItem><FormLabel>Memory Limit (MB)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="constraints" render={({ field }) => (
            <FormItem><FormLabel>Constraints (one per line)</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="exampleCases" render={({ field }) => (
            <FormItem><FormLabel>Example Cases (JSON Array)</FormLabel><FormControl><Textarea rows={8} {...field} placeholder='[{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because..."}]' /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="testCases" render={({ field }) => (
            <FormItem><FormLabel>Test Cases (JSON Array)</FormLabel><FormControl><Textarea rows={8} {...field} placeholder='[{"input": "[2,7,11,15]\\n9", "expectedOutput": "[0,1]"}]' /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : (isEditing ? "Save Changes" : "Create Problem")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

