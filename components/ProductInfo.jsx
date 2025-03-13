import Image from "next/image";

const ProductInfo = ({ product }) => {
  return (
    <div>
      <div className="w-full relative h-48 flex items-center justify-center p-5 bg-slate-300">
        <Image src={product?.imageUrl} fill alt="product"></Image>
      </div>
      <p className="text-sm text-blue-600 font-bold">Shopping</p>

      <p className="font-bold text-xl">{product?.title}</p>
      <p className="font-bold text-xl">KSh {product?.price}</p>
      <p>in {product.category}</p>
    </div>
  );
};

export default ProductInfo;
