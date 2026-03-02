
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi } from '../api/tasks.api';
import { useAuth } from '../../auth/hooks/useAuth';
import { useToastStore } from '../../../shared/state/useToastStore'; // 1. Import Store
import type { Task } from '../types/task.types';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { showToast } = useToastStore(); // 2. Initialize Toast

  const upsertMutation = useMutation({
    mutationFn: (task: Task) => {
      if (user?.role === 'admin' || !task.id) {
        return tasksApi.saveTask(task);
      } else {
        return tasksApi.updateStatus(task.id, task.status);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      // 3. Trigger dynamic success message
      const action = variables.id ? 'updated' : 'created';
      showToast(`Task successfully ${action}!`);
    },
    onError: () => showToast('Failed to save task', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      showToast('Task deleted successfully');
    },
    onError: () => showToast('Could not delete task', 'error'),
  });

  return { upsertMutation, deleteMutation };
};