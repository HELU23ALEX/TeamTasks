import { TaskCard } from './TaskCard';
import { LoadingSkeleton, ErrorState, EmptyState } from '../../../shared/components/States';
import type { Task } from '../types/task.types';
import type { User } from '../../auth/types/auth.types';

interface TaskListProps {
  tasks: Task[];
  users: User[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isAdmin: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onEmptyAction?: () => void;
}

export const TaskList = ({ tasks, users, isLoading, isError, error, isAdmin, onEdit, onDelete, onEmptyAction }: TaskListProps) => {
  if (isLoading) return <LoadingSkeleton />;
  
  if (isError) return <ErrorState message={error instanceof Error ? error.message : 'Error'} />;
  
  if (tasks.length === 0) {
    return <EmptyState message="No tasks found." onAction={isAdmin ? onEmptyAction : undefined} />;
  }

  return (
    <div className="grid gap-4 mt-6">
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          users={users} 
          onClick={() => onEdit(task.id)} 
          isAdmin={isAdmin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};