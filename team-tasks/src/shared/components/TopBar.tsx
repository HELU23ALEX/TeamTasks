import { useAuth } from '../../features/auth/hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export const TopBar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
      <span className="font-black text-blue-600 text-2xl tracking-tighter">TEAM TASKS</span>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-xl"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        <div className="text-right hidden sm:block border-l pl-4 dark:border-gray-700">
          <p className="text-sm font-bold dark:text-white">{user?.email}</p>
          <p className="text-[10px] uppercase text-blue-500 font-black tracking-widest">
            {user?.role}
          </p>
        </div>
        
        <button 
          onClick={handleLogout} 
          className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-bold border border-red-100 transition-all"
        >
          Logout
        </button>
      </div>
    </header>
  );
};