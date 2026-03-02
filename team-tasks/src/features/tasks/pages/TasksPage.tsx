import { useTasksViewModel } from '../hooks/useTasksViewModel';
import { useTaskMutations } from '../hooks/useTaskMutations';
import { useAuth } from '../../auth/hooks/useAuth';
import { TaskFilterBar } from '../components/TaskFilterBar';
import { TaskModal } from '../components/TaskModal';
import { TaskList } from '../components/TaskList';
import type { Task } from '../types/task.types';

export const TasksPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const vm = useTasksViewModel(); 
  const { upsertMutation, deleteMutation } = useTaskMutations();

  // Logic to determine if the Modal is ready to be shown with data
  const isModalReady = vm.selectedTaskId === 'new' || (!!vm.selectedTask && !vm.isDetailLoading);

  // Requirement: Multi-assignee Filtering Logic
  const filteredTasks = (vm.tasks as Task[]).filter((t: Task) => {
    // 1. Filter by Status
    const matchesStatus = vm.filters.status === 'all' || t.status === vm.filters.status;
    
    // 2. Filter by Search Title
    const matchesSearch = t.title.toLowerCase().includes(vm.filters.search.toLowerCase());
    
    // 3. Filter by Assignee: Check if the filter ID exists inside the task's array of IDs
    const matchesAssignee = vm.filters.assigneeId === 'all' || t.assigneeIds.includes(vm.filters.assigneeId);
    
    return matchesStatus && matchesSearch && matchesAssignee;
  });

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tight dark:text-white uppercase">Tasks</h2>
          <p className="text-gray-500 mt-1 italic uppercase text-[10px] tracking-widest">
            Manage team responsibilities and deadlines.
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={vm.openCreate} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-blue-200 active:scale-95 uppercase text-xs tracking-widest"
          >
            + New Task
          </button>
        )}
      </header>

      <TaskFilterBar />

      <TaskList 
        tasks={filteredTasks} // Pass the newly filtered list
        users={vm.users}
        isLoading={vm.isLoading}
        isError={vm.isError}
        error={vm.error}
        isAdmin={isAdmin}
        onEdit={vm.openEdit}
        onDelete={(id) => deleteMutation.mutate(id)}
        onEmptyAction={vm.openCreate}
      />

      {/* 
        Key architectural choice: 
        Component only mounts when data is fetched, ensuring form state is correct.
      */}
      {vm.selectedTaskId && isModalReady && (
        <TaskModal 
          key={vm.selectedTaskId} 
          isOpen={true} 
          task={vm.selectedTask} 
          onClose={vm.closeModal} 
          onSave={(t) => upsertMutation.mutate(t)} 
        />
      )}

      {/* Visual Cue for page refresh / URL navigation */}
      {vm.isDetailLoading && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-60 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-2xl font-black text-[10px] uppercase tracking-[0.2em] animate-pulse border dark:border-gray-700">
            Syncing Details...
          </div>
        </div>
      )}
    </div>
  );
};