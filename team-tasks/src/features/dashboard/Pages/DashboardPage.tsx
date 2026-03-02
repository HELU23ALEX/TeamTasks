import { useDashboardStats } from '../hooks/useDashboardStats';
import { useAuth } from '../../auth/hooks/useAuth';
import { StatCard } from '../components/StatCard';
import { LoadingSkeleton } from '../../../shared/components/States';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { stats, isLoading } = useDashboardStats();
  const isAdmin = user?.role === 'admin';

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h2 className="text-4xl font-black tracking-tight dark:text-white uppercase">Dashboard</h2>
        <p className="text-gray-500 mt-1 italic">Summary of workspace activity.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="To Do" value={stats.todo} color="gray" />
        <StatCard label="In Progress" value={stats.inProgress} color="blue" />
        <StatCard label="Done" value={stats.done} color="green" />

        {/* Security check: only show team size to admins */}
        {isAdmin && (
          <StatCard 
            label="Team Size" 
            value={stats.totalMembers} 
            color="purple" 
            subtext="Total registered accounts"
          />
        )}
      </div>

      {/* Hero Welcome Section */}
      <div className="mt-12 p-10 bg-blue-600 rounded-4xl text-white shadow-2xl shadow-blue-300 dark:shadow-none relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">
            Hello, {user?.name || user?.email.split('@')[0]}!
          </h3>
          <p className="text-blue-100 font-medium max-w-md">
            The workspace is currently tracking <span className="text-white font-bold underline decoration-2">{stats.totalTasks} tasks</span> across the entire team.
          </p>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full opacity-50" />
      </div>
    </div>
  );
};