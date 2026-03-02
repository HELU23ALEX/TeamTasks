import { useLocation } from 'react-router-dom';
// import { useAuth } from '../../features/auth/hooks/useAuth';
import { NavItem } from './NavItem';

export const Sidebar = () => {
  // const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-64 border-r dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900 hidden md:block">
      <nav className="space-y-1">
        <NavItem to="/" label="Dashboard" active={location.pathname === '/'} />
        <NavItem to="/tasks" label="Tasks" active={location.pathname === '/tasks'} />
      </nav>
    </aside>
  );
};