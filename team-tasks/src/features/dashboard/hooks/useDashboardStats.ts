import { useTasksQuery } from '../../tasks'; 
import type { DashboardStats } from '../types/dashboard.types';
import type { Task } from '../../tasks/types/task.types';

export const useDashboardStats = () => {
  // 2. Reuse the hooks from other features
  const { data: tasks = [], isLoading: tasksLoading } = useTasksQuery();

  // 3. Logic: Calculate stats from the data
  // This is the "Transformation" part of the State Strategy
  const stats: DashboardStats = {
    todo: (tasks as Task[]).filter((t) => t.status === 'todo').length,
    inProgress: (tasks as Task[]).filter((t) => t.status === 'in_progress').length,
    done: (tasks as Task[]).filter((t) => t.status === 'done').length,
    totalTasks: tasks.length,
  };

  return {
    stats,
    isLoading: tasksLoading,
  };
};