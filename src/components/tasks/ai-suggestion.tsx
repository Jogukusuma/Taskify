"use client";

import { useState, useTransition } from "react";
import { Sparkles, PlusCircle } from "lucide-react";
import type { Task } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAiSuggestion } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { AddTaskDialog } from "./add-task-dialog";
import { cn } from "@/lib/utils";

interface AiSuggestionProps {
  tasks: Task[];
  onAddTask: (taskData: Omit<Task, "id" | "completed">) => void;
}

export function AiSuggestion({ tasks, onAddTask }: AiSuggestionProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isAddTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [taskToSuggest, setTaskToSuggest] = useState<
    Partial<Task> | undefined
  >(undefined);

  const { toast } = useToast();

  const handleGetSuggestion = () => {
    startTransition(async () => {
      setIsError(false);
      try {
        const result = await getAiSuggestion(tasks);
        if (result.startsWith("Sorry")) {
          setIsError(true);
        }
        setSuggestion(result);
      } catch (error) {
        console.error("AI suggestion failed:", error);
        setIsError(true);
        setSuggestion("Failed to get a suggestion. Please try again.");
      }
    });
  };

  const handleAcceptSuggestion = () => {
    setTaskToSuggest({ title: suggestion || "" });
    setSuggestion(null);
    setAddTaskDialogOpen(true);
  };
  
  const handleManualAdd = () => {
    setTaskToSuggest(undefined);
    setAddTaskDialogOpen(true);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isPending}>
            <Sparkles className={cn("mr-2 h-4 w-4", isPending && "animate-spin")} />
            {isPending ? "Thinking..." : "New Task"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleGetSuggestion}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Get AI Suggestion</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleManualAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add Manually</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={!!suggestion} onOpenChange={() => setSuggestion(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isError ? "Oops!" : "AI Task Suggestion"}
            </AlertDialogTitle>
            <AlertDialogDescription>{suggestion}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
            {!isError && (
              <AlertDialogAction onClick={handleAcceptSuggestion}>
                Add Task
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AddTaskDialog
        isOpen={isAddTaskDialogOpen}
        onOpenChange={setAddTaskDialogOpen}
        onAddTask={(data) => {
          onAddTask(data);
          toast({
            title: "Task Added!",
            description: `"${data.title}" has been added to your list.`,
            className: "bg-accent text-accent-foreground border-accent",
          });
        }}
        taskToEdit={taskToSuggest}
      />
    </>
  );
}
