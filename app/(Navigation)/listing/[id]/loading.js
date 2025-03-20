const Loading = () => {
  return (
    <div className="animate-pulse space-y-3  p-4">
      <div className=" rounded-md w-full h-4 flex justify-between">
        <p className="w-20 bg-gray-300"></p>
        <p className="w-20 bg-gray-300"></p>
        <p className="w-20 bg-gray-300"></p>
        <p className="w-20 bg-gray-300"></p>
      </div>
      <div className="bg-gray-300 rounded-md w-full h-32"></div>
      <div className="bg-gray-300 rounded-md w-full h-4"></div>
      <div className="bg-gray-300 rounded-md w-1/4 h-12"></div>
    </div>
  );
};

export default Loading;
