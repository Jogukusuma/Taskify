"use client";

import type { Task } from "@/types";
import { AiSuggestion } from "@/components/tasks/ai-suggestion";
import { ThemeToggle } from "../theme-toggle";
import Link from 'next/link';
import { Button } from "../ui/button";

interface HeaderProps {
  tasks: Task[];
  onAddTask: (taskData: Omit<Task, "id" | "completed">) => void;
}

export function Header({ tasks, onAddTask }: HeaderProps) {
  const isLoggedIn = false; // Placeholder for auth state

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M15 6.5l-3.5-3.5-3.5 3.5" />
              <path d="M11.5 3v10" />
              <path d="M7 16h9" />
              <path d="M9 21h6" />
            </svg>
            <span className="font-bold sm:inline-block font-headline text-xl">
              Taskify
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLoggedIn ? (
            <>
              <AiSuggestion tasks={tasks} onAddTask={onAddTask} />
              <ThemeToggle />
              {/* Add User Dropdown here */}
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
