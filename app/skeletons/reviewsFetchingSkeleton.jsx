const ReviewsFetchingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3  p-4 grid grid-cols-1 gap-3">
      <div className=" rounded-md w-full  flex gap-4">
        <div className="bg-gray-300 rounded-md  h-10 w-10"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="bg-gray-300 rounded-md w-full h-4"></div>
          <div className="bg-gray-300 rounded-md w-full h-4"></div>
        </div>
      </div>
      <div className=" rounded-md w-full  flex gap-4">
        <div className="bg-gray-300 rounded-md  h-10 w-10"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="bg-gray-300 rounded-md w-full h-4"></div>
          <div className="bg-gray-300 rounded-md w-full h-4"></div>
        </div>
      </div>
      <div className=" rounded-md w-full  flex gap-4">
        <div className="bg-gray-300 rounded-md  h-10 w-10"></div>
        <div className="w-full flex flex-col gap-2">
          <div className="bg-gray-300 rounded-md w-full h-4"></div>
          <div className="bg-gray-300 rounded-md w-full h-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsFetchingSkeleton;
