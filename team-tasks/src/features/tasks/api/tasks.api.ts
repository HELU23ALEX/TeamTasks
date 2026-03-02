
import { ENV } from '../../../config/env';
import { httpClient } from '../../../services/httpClient';
import type { TaskFilters, Task, TaskStatus } from '../types/task.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const tasksApi = {
  /**
   * GET /tasks
   */
  getTasks: async (params?: Partial<TaskFilters>): Promise<Task[]> => {
    if (ENV.USE_MOCKS) {
      await delay(500);
      const saved = localStorage.getItem('tasks');
      let tasks: Task[] = saved ? JSON.parse(saved) : [];

      if (params) {
        if (params.status && params.status !== 'all') {
          tasks = tasks.filter(t => t.status === params.status);
        }
        // if (params.assigneeId && params.assigneeId !== 'all') {
        //   tasks = tasks.filter(t => t.assigneeIds.includes(params.assigneeId!));
        // }

        if (params?.assigneeId && params.assigneeId !== 'all') {
      tasks = tasks.filter(t => 
        t.assigneeId === params.assigneeId || 
        t.assigneeIds.includes(params.assigneeId!)
      );}
        if (params.search) {
          tasks = tasks.filter(t => t.title.toLowerCase().includes(params.search!.toLowerCase()));
        }
      }
      return tasks;
    }

    const { data } = await httpClient.get<Task[]>('/tasks', { params });
    return data;
  },

  /**
   * POST /tasks or PUT /tasks/:id
   */
  saveTask: async (task: Task): Promise<Task> => {
    // FIX: Use ENV.USE_MOCKS
    if (ENV.USE_MOCKS) {
      await delay(500);
      const tasks = await tasksApi.getTasks();
      
      if (!task.id) {
        const newTask = { 
          ...task, 
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString() 
        };
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
        return newTask;
      }

      const newTasks = tasks.map(t => t.id === task.id ? { ...task, updatedAt: new Date().toISOString() } : t);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return task;
    }

    return task.id 
      ? (await httpClient.put<Task>(`/tasks/${task.id}`, task)).data
      : (await httpClient.post<Task>('/tasks', task)).data;
  },

  /**
   * PATCH /tasks/:id/status
   */
  updateStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    // FIX: Use ENV.USE_MOCKS
    if (ENV.USE_MOCKS) {
      const task = await tasksApi.getTaskById(id);
      return tasksApi.saveTask({ ...task, status });
    }
    
    const { data } = await httpClient.patch<Task>(`/tasks/${id}/status`, { status });
    return data;
  },

  /**
   * DELETE /tasks/:id
   */
  deleteTask: async (id: string): Promise<void> => {
    // FIX: Use ENV.USE_MOCKS
    if (ENV.USE_MOCKS) {
      await delay(300);
      const tasks = await tasksApi.getTasks();
      localStorage.setItem('tasks', JSON.stringify(tasks.filter(t => t.id !== id)));
      return;
    }
    await httpClient.delete(`/tasks/${id}`);
  },

  getTaskById: async (id: string): Promise<Task> => {
    const tasks = await tasksApi.getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  }
};