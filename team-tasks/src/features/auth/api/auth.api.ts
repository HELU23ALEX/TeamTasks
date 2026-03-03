
import { httpClient } from '../../../services/httpClient';
import { ENV } from '../../../config/env';
import type { User, AuthResponse } from '../types/auth.types';

interface StoredUser extends User {
  password?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    if (ENV.USE_MOCKS) {
      await delay(800);
      const users = (await authApi.getUsers()) as StoredUser[];
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      const storedPassword = foundUser?.password || 'password123';
      const isValid = foundUser && password === storedPassword;

      if (!isValid) {
        // Specific error for the UI to catch
        throw new Error("Invalid email or password.");
      }

      return {
        access_token: `fake-jwt-token-${foundUser.id}`,
        user: { id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role }
      };
    }
    const { data } = await httpClient.post<AuthResponse>('/auth/login', { email, password });
    return data;
  },

  registerUser: async (userData: { email: string; name: string; password: string }): Promise<AuthResponse> => {
    if (ENV.USE_MOCKS) {
      await delay(800);
      const currentUsers = await authApi.getUsers();

      const exists = currentUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) {
        // Specific error for existing users
        throw new Error("This email is already registered. Please sign in instead.");
      }

      const newUser: User = { 
        id: crypto.randomUUID(), 
        email: userData.email, 
        name: userData.name, 
        role: 'member' 
      };

      const userToStore: StoredUser = { ...newUser, password: userData.password };
      localStorage.setItem('all_users', JSON.stringify([...currentUsers, userToStore]));

      return { access_token: `fake-jwt-token-new-${newUser.id}`, user: newUser };
    }
    const { data } = await httpClient.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  getUsers: async (): Promise<User[]> => {
    if (ENV.USE_MOCKS) {
      const saved = localStorage.getItem('all_users');
      if (!saved) {
        const initialUsers: StoredUser[] = [
          { id: '101', name: 'Admin User', email: 'admin@company.com', role: 'admin', password: 'password123' },
          { id: '102', name: 'Jane Member', email: 'jane@company.com', role: 'member', password: 'password123' }
        ];
        localStorage.setItem('all_users', JSON.stringify(initialUsers));
        return initialUsers as User[];
      }
      return JSON.parse(saved) as User[];
    }
    const { data } = await httpClient.get<User[]>('/users');
    return data;
  }
};