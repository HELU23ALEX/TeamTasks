
import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types/task.types';
import { useAuth } from '../../auth/hooks/useAuth';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { Button } from '../../../shared/components/Button';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave }) => {
  const { user } = useAuth();
  const { data: users = [] } = useUsersQuery();
  const isAdmin = user?.role === 'admin';

  // Get "Today" in YYYY-MM-DD format for the HTML 'min' attribute
  const todayString = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<Partial<Task>>(
    task || {
      title: '',
      description: '',
      status: 'todo',
      assigneeIds: [],
      dueDate: todayString, // Default to today
    }
  );

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleToggleAssignee = (userId: string) => {
    if (!isAdmin) return;
    const currentIds = formData.assigneeIds || [];
    const newIds = currentIds.includes(userId)
      ? currentIds.filter(id => id !== userId)
      : [...currentIds, userId];
    setFormData({ ...formData, assigneeIds: newIds });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Title Validation
    if (!formData.title?.trim()) {
      setError('Title is required.');
      return;
    }

    // 2. Assignee Validation
    if (!formData.assigneeIds?.length) {
      setError('At least one assignee is required.');
      return;
    }

    // 3. Due Date Validation (Strict)
    // We create dates at midnight to compare ONLY the calendar day
    const selectedDate = new Date(formData.dueDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }
 const finalTask: Task = {
    ...task,
    ...formData,
    id: task?.id || '',
    // Logic: The first person in the array becomes the primary assigneeId
    assigneeId: formData.assigneeIds[0], 
    assigneeIds: formData.assigneeIds,
  } as Task;

  onSave(finalTask);
  onClose();
};


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black dark:text-white uppercase">
            {task ? (isAdmin ? 'Edit Task' : 'Task Details') : 'New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg font-bold border border-red-100 animate-in fade-in zoom-in duration-200">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Title</label>
            <input 
              disabled={!isAdmin}
              className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white disabled:opacity-50 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={formData.title || ''}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Description</label>
            <textarea 
              disabled={!isAdmin}
              placeholder="Describe the objective of this task..."
              rows={3}
              className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white disabled:opacity-50 outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description || ''}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Status</label>
              <select 
                className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status || 'todo'}
                onChange={e => setFormData({...formData, status: e.target.value as TaskStatus})}
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Due Date</label>
              <input 
                disabled={!isAdmin}
                type="date"
                // UI Fix: Prevents picking past dates in the calendar picker
                min={todayString} 
                className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-700 dark:text-white disabled:opacity-50 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.dueDate || ''}
                onChange={e => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>

          {/* <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Assign Team Members</label>
            <div className="border dark:border-gray-700 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              {users.map(u => (
                <label key={u.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    disabled={!isAdmin}
                    checked={formData.assigneeIds?.includes(u.id)}
                    onChange={() => handleToggleAssignee(u.id)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                    {u.name}
                  </span>
                   <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-900 text-gray-400 font-bold">
      {u.role}
    </span>
                </label>
              ))}
            </div>
          </div> */}

          <div>
  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Assign Team Members</label>
  <div className="border dark:border-gray-700 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-900">
    {/* FIX: Filter out admins before mapping checkboxes */}
    {users
      .filter(u => u.role !== 'admin')
      .map(u => (
        <label key={u.id} className="flex items-center justify-between p-1 hover:bg-white dark:hover:bg-gray-800 rounded-lg cursor-pointer group transition-colors">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox"
              disabled={!isAdmin}
              checked={formData.assigneeIds?.includes(u.id)}
              onChange={() => handleToggleAssignee(u.id)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm dark:text-gray-300 group-hover:text-blue-500 transition-colors">
              {u.name}
            </span>
          </div>
          {/* Optional: Role Badge (now will only show 'member' badges) */}
          <span className="text-[8px] uppercase px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 font-black tracking-tighter">
            {u.role}
          </span>
        </label>
    ))}
  </div>
</div>

          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">
              {task ? (isAdmin ? 'Save Changes' : 'Update Status') : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};