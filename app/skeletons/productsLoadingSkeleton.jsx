const ProductsLoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3 p-4 grid grid-cols-2 gap-3 mt-[150px]">
      <div className=" rounded-md w-full h-24 flex justify-between"></div>
      <div className="bg-gray-300 rounded-md w-full h-24"></div>
      <div className="bg-gray-300 rounded-md w-full h-24"></div>
      <div className="bg-gray-300 rounded-md w-full h-24"></div>
      <div className="bg-gray-300 rounded-md w-full h-24"></div>
      <div className="bg-gray-300 rounded-md w-full h-24"></div>
    </div>
  );
};

export default ProductsLoadingSkeleton;
