"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
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
                TaskMaster
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-primary">
            Master Your Day, Intelligently.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            TaskMaster is a smart to-do list that helps you focus on what truly matters. Stop planning, start doing.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/50">
           <div className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Why TaskMaster?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
                <p className="text-muted-foreground">
                  Our smart assistant suggests tasks based on your current workload and habits, keeping you on track.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Effortless & Fast</h3>
                <p className="text-muted-foreground">
                  A clean, intuitive interface designed for speed. Add, manage, and complete tasks without the clutter.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
                <p className="text-muted-foreground">
                  Filter tasks by status, set due dates, and never miss a deadline again. Your productivity, simplified.
                </p>
              </div>
            </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
                Join TaskMaster today and turn your to-do list into a to-done list.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Mastering Your Tasks
              </Link>
            </Button>
        </section>

      </main>

      <footer className="text-center py-4 text-muted-foreground text-sm">
        <p>TaskMaster &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
