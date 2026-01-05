export type Task = {
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  completed: boolean;
};
