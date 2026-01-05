'use server';

import { suggestTask as suggestTaskFlow, SuggestTaskInput } from '@/ai/flows/intelligent-task-suggestion';
import type { Task } from '@/types';

export async function getAiSuggestion(tasks: Task[]): Promise<string> {
  const pastActivity = tasks.length > 0
    ? `The user has the following tasks in their list: ${tasks.map(t => `${t.title} (Completed: ${t.completed})`).join(', ')}.`
    : 'The user has no tasks yet.';

  const input: SuggestTaskInput = {
    pastActivity,
    currentDateTime: new Date().toString(),
  };

  try {
    const { suggestedTask } = await suggestTaskFlow(input);
    return suggestedTask;
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't come up with a suggestion right now.";
  }
}
