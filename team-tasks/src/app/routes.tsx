import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from '../features/auth';
import { TasksPage } from '../features/tasks';
import { DashboardPage } from '../features/dashboard';


export const AppRoutes = () => {
  const { user } = useAuth();

  // 1. Unauthenticated Route Guard
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // 2. Authenticated App Shell
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Feature: Dashboard */}
        <Route path="/" element={<DashboardPage />} />
        
        {/* Feature: Tasks */}
        <Route path="/tasks" element={<TasksPage />} />

        {/* Catch-all for logged in users */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};