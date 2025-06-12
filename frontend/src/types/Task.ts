
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  inserted_at: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';