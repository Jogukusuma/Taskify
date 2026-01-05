"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/types";
import { Header } from "@/components/layout/header";
import { TaskList } from "@/components/tasks/task-list";

// Generate a unique ID
const generateId = () => `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const initialTasks: Task[] = [
  {
    id: generateId(),
    title: "Set up project structure",
    description: "Initialize Next.js app and set up folders for components, types, and lib.",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    completed: true,
  },
  {
    id: generateId(),
    title: "Design the UI",
    description: "Create mockups and decide on the color scheme and typography.",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    completed: true,
  },
  {
    id: generateId(),
    title: "Develop Task Components",
    description: "Build the TaskCard and TaskList components.",
    dueDate: new Date(),
    completed: false,
  },
  {
    id: generateId(),
    title: "Implement State Management",
    description: "Use React hooks to manage the state of tasks.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    completed: false,
  },
  {
    id: generateId(),
    title: "Integrate AI suggestions",
    description: "Connect the GenAI flow to suggest new tasks.",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    completed: false,
  },
];


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Load tasks from local storage on mount, only on client
    setIsClient(true);
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks, (key, value) => {
          if (key === 'dueDate' && value) {
            return new Date(value);
          }
          return value;
        });
        setTasks(parsedTasks);
      } else {
        setTasks(initialTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks from local storage", error);
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever they change
    if(isClient) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const handleAddTask = (taskData: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => task.id === updatedTask.id ? updatedTask : task));
  };

  if (!isClient) {
    // Render a loading state or nothing on the server to avoid hydration mismatch
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header tasks={tasks} onAddTask={handleAddTask} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
        />
      </main>
      <footer className="text-center py-4 text-muted-foreground text-sm">
        <p>Built with ❤️ for productivity. TaskMaster &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
