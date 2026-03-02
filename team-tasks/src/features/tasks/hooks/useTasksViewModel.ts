import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';
import { useTaskFilters } from '../state/taskFilters.store';
import { useUsersQuery } from './useUsersQuery';
// import type { Task } from '../types/task.types';

export const useTasksViewModel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTaskId = searchParams.get('taskId');
  const filters = useTaskFilters(); // Get filters from Zustand

  const listQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getTasks(),
  });

  const detailQuery = useQuery({
    queryKey: ['tasks', selectedTaskId],
    queryFn: () => tasksApi.getTaskById(selectedTaskId!),
    enabled: !!selectedTaskId && selectedTaskId !== 'new',
  });

  const { data: users = [] } = useUsersQuery();

  return {
    tasks: listQuery.data ?? [],
    users,
    filters, // FIX: Return filters so TasksPage can use them
    selectedTask: selectedTaskId === 'new' ? null : (detailQuery.data || null),
    selectedTaskId,
    isLoading: listQuery.isLoading,
    isDetailLoading: !!selectedTaskId && selectedTaskId !== 'new' && detailQuery.isLoading,
    isError: listQuery.isError,
    error: listQuery.error,
    openCreate: () => setSearchParams({ taskId: 'new' }),
    openEdit: (id: string) => setSearchParams({ taskId: id }),
    closeModal: () => setSearchParams({}),
  };
};