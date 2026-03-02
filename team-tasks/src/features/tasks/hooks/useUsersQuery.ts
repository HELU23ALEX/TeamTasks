
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../auth/api/auth.api'; // IMPORT authApi

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ['users'], 
    queryFn: authApi.getUsers, // Use the one that reads from LocalStorage
  });
};