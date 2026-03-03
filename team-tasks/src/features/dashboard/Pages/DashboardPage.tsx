import { useNavigate } from 'react-router-dom'; // For navigation
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useAuth } from '../../auth/hooks/useAuth';
import { useTaskFilters } from '../../tasks/state/taskFilters.store'; // To set filters
import { StatCard } from '../components/StatCard';
import { LoadingSkeleton } from '../../../shared/components/States';
import type { TaskStatus } from '../../tasks/types/task.types';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { stats, isLoading } = useDashboardStats();
  const navigate = useNavigate();
  const { setFilters } = useTaskFilters();
  
  // Handler to set filter and go to tasks page
  const handleStatClick = (status: TaskStatus | 'all') => {
    setFilters({ status }); // This updates Zustand
    navigate('/tasks');     // This moves to the next page
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-4xl font-black tracking-tight dark:text-white uppercase">Dashboard</h2>
        <p className="text-gray-500 mt-1 italic">Summary of workspace activity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* We map the labels to the specific TaskStatus strings used by the backend */}
        <StatCard 
          label="To Do" 
          value={stats.todo} 
          color="gray" 
          onClick={() => handleStatClick('todo')} 
        />
        <StatCard 
          label="In Progress" 
          value={stats.inProgress} 
          color="blue" 
          onClick={() => handleStatClick('in_progress')} 
        />
        <StatCard 
          label="Done" 
          value={stats.done} 
          color="green" 
          onClick={() => handleStatClick('done')} 
        />
      </div>

      {/* Hero Welcome Section - Click the whole banner to see ALL tasks */}
      <div 
        onClick={() => handleStatClick('all')}
        className="mt-12 p-10 bg-blue-600 rounded-4xl text-white shadow-2xl cursor-pointer hover:bg-blue-700 transition-all relative overflow-hidden group"
      >
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">
            Hello, {user?.name || user?.email.split('@')[0]}!
          </h3>
          <p className="text-blue-100 font-medium max-w-md">
            The workspace is currently tracking <span className="text-white font-bold underline decoration-2">{stats.totalTasks} tasks</span> across the entire team.
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            View All Tasks →
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 transition-transform group-hover:scale-125" />
      </div>
    </div>
  );
};