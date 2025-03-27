import Image from "next/image";

const ProductDescription = ({ product }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="w-full md:w-1/4 relative h-48 md:h-72 flex items-center justify-center p-5 bg-slate-300">
        <Image src={product?.imageUrl} fill alt="product"></Image>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <p className="my-3 font-semibold text-blue-500">
            KSH {product.price}
          </p>
          <p className="line-through text-gray-400">
            Ksh {product.price + (10 / 100) * product.price}{" "}
          </p>
          <span className="text-red-500">(-10%)</span>
        </div>
        <p>{product.title}</p>
        <div className="mt-4">
          <p className="uppercase font-semibold mb-1">Product Information</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
