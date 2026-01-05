'use server';

/**
 * @fileOverview A flow for suggesting new tasks based on user's past activity and the current date/time.
 *
 * - suggestTask - A function that handles the task suggestion process.
 * - SuggestTaskInput - The input type for the suggestTask function.
 * - SuggestTaskOutput - The return type for the suggestTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskInputSchema = z.object({
  pastActivity: z
    .string()
    .describe('A description of the user\'s past activity.'),
  currentDateTime: z.string().describe('The current date and time.'),
});
export type SuggestTaskInput = z.infer<typeof SuggestTaskInputSchema>;

const SuggestTaskOutputSchema = z.object({
  suggestedTask: z.string().describe('A suggested task based on the user\'s past activity and the current date/time.'),
});
export type SuggestTaskOutput = z.infer<typeof SuggestTaskOutputSchema>;

export async function suggestTask(input: SuggestTaskInput): Promise<SuggestTaskOutput> {
  return suggestTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPrompt',
  input: {schema: SuggestTaskInputSchema},
  output: {schema: SuggestTaskOutputSchema},
  prompt: `You are a personal assistant that suggests tasks to users based on their past activity and the current date/time.

  Past Activity: {{{pastActivity}}}
  Current Date/Time: {{{currentDateTime}}}

  Suggest a single, concise task that the user should add to their to-do list.`,
});

const suggestTaskFlow = ai.defineFlow(
  {
    name: 'suggestTaskFlow',
    inputSchema: SuggestTaskInputSchema,
    outputSchema: SuggestTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
