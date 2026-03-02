export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  token?: string;
}

export interface AuthResponse {
  access_token: string; // Matches Swagger image
  user: User;
}