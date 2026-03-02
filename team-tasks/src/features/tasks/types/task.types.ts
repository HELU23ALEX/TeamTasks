export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeIds: string[];
  assigneeId: string; // For backward compatibility with backend entity requirement  
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskFilters {
  status: TaskStatus | 'all';
  assigneeId: string | 'all'; // Filter remains single (Show tasks where this person is included)
  search: string;
}