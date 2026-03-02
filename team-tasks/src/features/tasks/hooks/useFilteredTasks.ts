import { useTasksQuery } from './useTasksQuery';
import { useTaskFilters } from '../state/taskFilters.store';
import type { Task } from '../types/task.types';

export const useFilteredTasks = () => {
  const { data: tasks = [], ...queryInfo } = useTasksQuery();
  const filters = useTaskFilters();

  const filteredTasks = (tasks as Task[]).filter((t) => {
    const matchesStatus = filters.status === 'all' || t.status === filters.status;
    const matchesSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesAssignee = filters.assigneeId === 'all' || t.assigneeId === filters.assigneeId;
    return matchesStatus && matchesSearch && matchesAssignee;
  });

  return { filteredTasks, ...queryInfo };
};