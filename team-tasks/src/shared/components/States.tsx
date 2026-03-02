export const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
    ))}
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
    <p className="font-bold">Error</p>
    <p>{message}</p>
  </div>
);

export const EmptyState = ({ message, onAction }: { message: string; onAction?: () => void }) => (
  <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
    <p className="text-gray-500 mb-4">{message}</p>
    {onAction && (
      <button onClick={onAction} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create your first task
      </button>
    )}
  </div>
);