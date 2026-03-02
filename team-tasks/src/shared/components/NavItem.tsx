import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  active: boolean;
}

export const NavItem = ({ to, label, active }: NavItemProps) => (
  <Link 
    to={to} 
    className={`block p-3 rounded-xl transition-all font-medium ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none' 
        : 'hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-gray-300'
    }`}
  >
    {label}
  </Link>
);