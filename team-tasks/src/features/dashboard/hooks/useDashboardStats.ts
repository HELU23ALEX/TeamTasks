// import { useTasksQuery } from '../../tasks/hooks/useTasksQuery';
import { useTasksQuery } from '../../tasks'; // Good: Uses the Public A
import { useTeam } from '../../team'; 
import type { DashboardStats } from '../types/dashboard.types';
import type { Task } from '../../tasks/types/task.types';

export const useDashboardStats = () => {
  // 2. Reuse the hooks from other features
  const { data: tasks = [], isLoading: tasksLoading } = useTasksQuery();
  const { members, isLoading: teamLoading } = useTeam(); 

  // 3. Logic: Calculate stats from the data
  // This is the "Transformation" part of the State Strategy
  const stats: DashboardStats = {
    todo: (tasks as Task[]).filter((t) => t.status === 'todo').length,
    inProgress: (tasks as Task[]).filter((t) => t.status === 'in_progress').length,
    done: (tasks as Task[]).filter((t) => t.status === 'done').length,
    totalTasks: tasks.length,
    totalMembers: members.length,
  };

  return {
    stats,
    // Dashboard is "Loading" if either feature is still fetching
    isLoading: tasksLoading || teamLoading,
  };
};