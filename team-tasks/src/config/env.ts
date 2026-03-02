export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  IS_DEV: import.meta.env.DEV,
  USE_MOCKS: import.meta.env.VITE_USE_MOCKS === 'true', 
};