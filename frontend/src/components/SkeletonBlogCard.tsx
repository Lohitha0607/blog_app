export const SkeletonBlogCard = () => {
    return (
      <div className="p-6 border-b border-slate-200 pb-4 animate-pulse">
        <div className="flex">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="mt-4 h-4 bg-gray-300 rounded w-24"></div>
      </div>
    );
  };
  