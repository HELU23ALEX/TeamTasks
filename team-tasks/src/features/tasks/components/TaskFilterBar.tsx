

import { useTaskFilters } from '../state/taskFilters.store';
import { useUsersQuery } from '../hooks/useUsersQuery';
import type { TaskStatus } from '../types/task.types';

export const TaskFilterBar = () => {
  // Use assigneeId to match our Backend Requirements logic
  const { status, search, assigneeId, setFilters } = useTaskFilters();
  
  // Fetch dynamic users from the same list used in Team Management
  const { data: users = [] } = useUsersQuery();

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      {/* Search Input */}
      <div className="flex-1 min-w-50">
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Search</label>
        <input 
          type="text" 
          placeholder="Filter by title..." 
          className="w-full p-2.5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>
      
      {/* Status Filter */}
      <div className="w-full md:w-48">
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Status</label>
        <select 
          className="w-full p-2.5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setFilters({ status: e.target.value as TaskStatus | 'all' })}
        >
          <option value="all">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Dynamic Assignee Filter */}
      {/* <div className="w-full md:w-48">
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Assignee</label>
        <select 
          className="w-full p-2.5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
          value={assigneeId}
          onChange={(e) => setFilters({ assigneeId: e.target.value })}
        >
          <option value="all">All Assignees</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div> */}
      {/* Dynamic Assignee Filter */}
<div className="w-full md:w-48">
  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 ml-1">Assignee</label>
  <select 
    className="w-full p-2.5 border rounded-xl bg-white dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
    value={assigneeId}
    onChange={(e) => setFilters({ assigneeId: e.target.value })}
  >
    <option value="all">All Assignees</option>
    {/* FIX: Filter out admins before mapping */}
    {users
      .filter(user => user.role !== 'admin') 
      .map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
    ))}
  </select>
</div>
    </div>
  );
};