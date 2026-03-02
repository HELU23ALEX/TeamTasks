import type { Task } from '../types/task.types';
import type { User } from '../../auth/types/auth.types';

interface TaskCardProps {
  task: Task;
  users: User[];
  onClick: () => void;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

const formatStatus = (s: string) => 
  s.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

export const TaskCard = ({ task, users, onClick, isAdmin, onDelete }: TaskCardProps) => {
  // 1. Identify the Lead (Primary Assignee)
  const leadUser = users.find(u => u.id === task.assigneeId);
  
  // 2. Identify the Collaborators (Others in the array)
  // We filter out the lead so we don't list them twice
  const collaborators = (task.assigneeIds || []).filter(id => id !== task.assigneeId);

  const statusStyles: Record<string, string> = {
    todo: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600",
    in_progress: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    done: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-100 dark:border-green-800"
  };

  return (
    <div 
      onClick={onClick}
      className="group p-5 border dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <div className="flex-1 space-y-3">
        {/* Status and Title */}
        <div className="flex items-center gap-3">
          <span className={`px-2.5 py-1 border rounded-full text-[9px] font-black uppercase tracking-tighter ${statusStyles[task.status] || statusStyles.todo}`}>
            {formatStatus(task.status)}
          </span>
          <h3 className="font-bold text-lg group-hover:text-blue-600 dark:text-white transition-colors">
            {task.title}
          </h3>
        </div>
        
        {/* Description Preview */}
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-1 max-w-2xl">
          {task.description || "No additional details provided for this task."}
        </p>

        {/* Metadata Row */}
        <div className="flex flex-wrap gap-5 pt-1">
          {/* Assignee Section */}
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <span className="text-sm">👤</span>
            <div className="flex flex-col">
              <span className="dark:text-gray-300">
                {leadUser ? (
                  <>
                    <span className="text-blue-500 dark:text-blue-400">Lead:</span> {leadUser.name}
                  </>
                ) : 'Unassigned'}
              </span>
              {collaborators.length > 0 && (
                <span className="text-[8px] text-gray-400 italic normal-case tracking-normal">
                  + {collaborators.length} contributor{collaborators.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest h-fit mt-1">
            <span className="text-sm">📅</span>
            <span className="dark:text-gray-300">Due: {task.dueDate}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all font-black text-[10px] uppercase tracking-widest">
          View Details →
        </div>
        
        {isAdmin && (
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if(window.confirm('Permanent delete: Are you sure?')) onDelete(task.id); 
            }} 
            className="p-2.5 text-gray-300 hover:text-white hover:bg-red-600 dark:hover:bg-red-600 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-700"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};