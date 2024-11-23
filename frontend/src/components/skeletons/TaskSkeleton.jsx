const TaskSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-evenly gap-4 mt-8">
      <div className="flex-grow max-w-xs sm:max-w-sm md:max-w-md">
        <div className="skeleton h-64 w-82"></div>
      </div>
      <div className="flex-grow max-w-xs sm:max-w-sm md:max-w-md">
        <div className="skeleton h-64 w-82"></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
