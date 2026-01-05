"use client";

import {
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddTaskDialog } from "./add-task-dialog";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (task: Task) => void;
}

export function TaskCard({
  task,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
}: TaskCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card
        className={cn(
          "flex flex-col h-full transition-all duration-300",
          task.completed ? "bg-card/60 border-accent/50" : "bg-card"
        )}
      >
        <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
          <div className="flex-grow">
            <CardTitle
              className={cn(
                "text-lg transition-all",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 ml-auto">
             <Checkbox
                id={`complete-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task.id)}
                aria-label={`Mark task ${task.completed ? 'incomplete' : 'complete'}`}
                className="h-5 w-5"
              />
          </div>
        </CardHeader>

        <CardContent className="flex-grow pb-4">
          {task.description && (
            <CardDescription
              className={cn(
                "transition-all",
                task.completed && "line-through text-muted-foreground/80"
              )}
            >
              {task.description}
            </CardDescription>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteTask(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </CardFooter>
      </Card>
      <AddTaskDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        taskToEdit={task}
        onUpdateTask={onUpdateTask}
      />
    </>
  );
}
