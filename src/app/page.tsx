"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, CheckCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
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
              <span className="font-bold sm:inline-block text-xl">
                Taskify
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
           <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
             <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
           </div>
          <div className="container relative mx-auto px-4 py-24 text-center md:py-32">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
              Organize your <br />
              <span className="font-serif italic text-primary">work and life.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-6 mb-10">
              Simplify life for you and your team. The most productive to-do list app.
            </p>
            <Button size="lg" asChild className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
              <Link href="/dashboard">
                Start your free trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/30 dark:bg-background">
           <div className="container mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold text-center mb-12 tracking-tighter">Why Taskify?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
                <p className="text-muted-foreground">
                  Our smart assistant suggests tasks based on your current workload and habits, keeping you on track.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
                <div className="p-4 bg-primary/20 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Effortless & Fast</h3>
                <p className="text-muted-foreground">
                  A clean, intuitive interface designed for speed. Add, manage, and complete tasks without the clutter.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border">
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
            <h2 className="text-4xl font-bold mb-4 tracking-tighter">Ready to Boost Your Productivity?</h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
                Join Taskify today and turn your to-do list into a to-done list.
            </p>
            <Button size="lg" asChild className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
              <Link href="/signup">
                Start Mastering Your Tasks
              </Link>
            </Button>
        </section>

      </main>

      <footer className="text-center py-6 text-muted-foreground text-sm border-t border-border/40">
        <p>Taskify &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
