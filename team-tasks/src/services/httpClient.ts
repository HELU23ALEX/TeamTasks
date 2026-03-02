
import axios from 'axios';
import { ENV } from '../config/env';

export const httpClient = axios.create({
  baseURL: ENV.API_BASE_URL,
});

// INTERCEPTOR: Automatically adds the Bearer token to every request
httpClient.interceptors.request.use((config) => {
  const authData = localStorage.getItem('auth_user');
  if (authData) {
    const { token } = JSON.parse(authData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});