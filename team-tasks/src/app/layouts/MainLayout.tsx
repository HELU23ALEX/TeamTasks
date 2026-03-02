import { Outlet } from 'react-router-dom';
import { TopBar } from '../../shared/components/TopBar';
import { Sidebar } from '../../shared/components/Sidebar';
import { ToastContainer } from '../../shared/components/Toast'; 

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <ToastContainer /> 
    </div>
  );
};