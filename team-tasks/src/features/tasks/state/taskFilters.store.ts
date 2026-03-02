// src/features/tasks/state/taskFilters.store.ts
import { create } from 'zustand';
import type { TaskFilters } from '../types/task.types';

interface FilterStore extends TaskFilters {
  setFilters: (filters: Partial<TaskFilters>) => void;
}

export const useTaskFilters = create<FilterStore>((set) => ({
  status: 'all',   
  assigneeId: 'all', 
  search: '',
  setFilters: (newFilters) => set((state) => ({ ...state, ...newFilters })),
}));