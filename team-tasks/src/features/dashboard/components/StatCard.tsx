interface StatCardProps {
  label: string;
  value: number;
  color: 'gray' | 'blue' | 'green' | 'purple';
  subtext?: string;
  onClick?: () => void; // Added onClick prop
}

const colors: Record<string, string> = {
  gray: "bg-gray-50 border-gray-100 dark:bg-gray-800 dark:border-gray-700",
  blue: "bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800",
  green: "bg-green-50 border-green-100 dark:bg-green-900/20 dark:border-green-800",
  purple: "bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800",
};

const textColors: Record<string, string> = {
  gray: "text-gray-600 dark:text-gray-400",
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
};

export const StatCard = ({ label, value, color, subtext, onClick }: StatCardProps) => (
  <div 
    onClick={onClick}
    className={`p-6 rounded-3xl border ${colors[color]} transition-all hover:scale-105 duration-200 ${
      onClick ? 'cursor-pointer active:scale-95' : ''
    }`}
  >
    <p className={`text-[10px] font-black uppercase tracking-widest ${textColors[color]} mb-1`}>
      {label}
    </p>
    <p className="text-4xl font-black dark:text-white">{value}</p>
    {subtext && (
      <p className="text-[10px] mt-2 opacity-50 font-bold uppercase dark:text-gray-400">
        {subtext}
      </p>
    )}
  </div>
);