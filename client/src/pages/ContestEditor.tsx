import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Navbar from "@/components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest , queryClient } from "@/lib/queryClient";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import type { Problem, Contest } from "@shared/schema";

// Zod schema for validating the contest form data
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid start date"),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid end date"),
  problemIds: z.array(z.string()).min(1, "You must select at least one problem."),
});

type ContestFormValues = z.infer<typeof formSchema>;

type ContestWithProblems = Contest & { problemIds: string[] };

export default function ContestEditor({ params }: { params: { id?: string } }) {
  const [_location, setLocation] = useLocation();
  const { toast } = useToast();
  const contestId = params?.id;
  const isEditing = !!contestId;

  // Query 1: Fetch all problems to display in the checklist
  const { data: allProblems, isLoading: isLoadingProblems } = useQuery<Problem[]>({
    queryKey: ["/api/problems"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/problems");
      return res.json();
    },
  });

  // Query 2: Fetch existing contest data, but only if we are in "edit" mode
  const { data: contestData, isLoading: isLoadingContest } = useQuery<ContestWithProblems>({
    queryKey: ["/api/contests", contestId],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/contests/${contestId}`);
      if (!res.ok) throw new Error("Failed to fetch contest data");
      return res.json();
    },
    enabled: isEditing,
  });

  // Query 3: Fetch participants if in "edit" mode
  const { data: participants, isLoading: isLoadingParticipants } = useQuery<{id: string, username: string, email: string}[]>({
    queryKey: ["/api/admin/contests", contestId, "participants"],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/admin/contests/${contestId}/participants`);
      if (!res.ok) throw new Error("Failed to fetch participants");
      return res.json();
    },
    enabled: isEditing,
  });

  const form = useForm<ContestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startTime: "",
      endTime: "",
      problemIds: [],
    },
  });

  // Effect to populate the form once data is loaded in "edit" mode
  useEffect(() => {
    if (isEditing && contestData) {
      form.reset({
        title: contestData.title,
        startTime: format(new Date(contestData.startTime), "yyyy-MM-dd'T'HH:mm"),
        endTime: format(new Date(contestData.endTime), "yyyy-MM-dd'T'HH:mm"),
        problemIds: contestData.problemIds || [],
      });
    }
  }, [contestData, isEditing, form]);

  const mutation = useMutation({
    mutationFn: (data: { contest: Omit<ContestFormValues, 'problemIds'>, problemIds: string[] }) => {
      const url = isEditing ? `/api/contests/${contestId}` : "/api/contests";
      const method = isEditing ? "PUT" : "POST";
      return apiRequest(method, url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contests"] });
      toast({ title: isEditing ? "Contest Updated" : "Contest Created" });
      setLocation("/contests");
    },
    onError: (error: Error) => {
      toast({ title: "Save Failed", description: error.message, variant: "destructive" });
    }
  });

  function onSubmit(values: ContestFormValues) {
    const { problemIds, ...contestDetails } = values;
    mutation.mutate({ contest: contestDetails, problemIds });
  }

  if (isLoadingProblems || (isEditing && isLoadingContest)) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="text-center p-8">Loading form data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{isEditing ? "Edit Contest" : "Create New Contest"}</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Contest Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField control={form.control} name="startTime" render={({ field }) => (
                  <FormItem><FormLabel>Start Time</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="endTime" render={({ field }) => (
                  <FormItem><FormLabel>End Time</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField
                control={form.control}
                name="problemIds"
                render={() => (
                  <FormItem>
                    <FormLabel>Select Problems</FormLabel>
                    <div className="space-y-2 rounded-md border p-4 max-h-60 overflow-y-auto">
                      {allProblems?.map((problem) => (
                        <FormField
                          key={problem.id}
                          control={form.control}
                          name="problemIds"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(problem.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, problem.id])
                                      : field.onChange(field.value?.filter((id) => id !== problem.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{problem.title}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : (isEditing ? "Save Changes" : "Create Contest")}
              </Button>
            </form>
          </Form>
        </div>

        {isEditing && (
          <div className="card max-w-4xl mx-auto mt-12 bg-card p-6 md:p-8 rounded-lg shadow-sm border border-border/50">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Registered Participants</h2>
            {isLoadingParticipants ? (
              <p className="text-muted-foreground">Loading participants...</p>
            ) : participants && participants.length > 0 ? (
              <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">Username</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p, i) => (
                      <tr key={p.id} className={i !== participants.length - 1 ? "border-b" : ""}>
                        <td className="py-3 px-4 font-medium">{p.username}</td>
                        <td className="py-3 px-4 text-muted-foreground">{p.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed border-border/50">
                <p className="text-muted-foreground">No users have registered for this contest yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
