
import { useQuery } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';


export const useTasksQuery = () => {
  return useQuery({
    queryKey: ['tasks'],
    // FIX: Wrap in an arrow function so it doesn't receive TanStack's context object
    queryFn: () => tasksApi.getTasks(), 
  });
};

