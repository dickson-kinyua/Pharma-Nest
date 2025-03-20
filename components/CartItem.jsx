"use client";

import { useState } from "react";

const CartItem = ({ item, handleDelete }) => {
  const [quantity, setQuantity] = useState(1);

  function decrement() {
    if (quantity >= 1) setQuantity((q) => q - 1);
  }

  function increment() {
    setQuantity((q) => q + 1);
  }

  return (
    <li className="flex flex-row justify-between sm:justify-normal gap-7 border-b border-solid p-2 bg-gray-200">
      <img
        className="w-16 h-10"
        src={item.productId.imageUrl}
        alt={item.title}
      />
      <div className="w-36 ">
        <p className="font-bold  truncate">{item.productId.title}</p>
        <p>KSh. {item.productId.price}</p>
        <p>Quantity:{item.quantity}</p>
        <div className="flex gap-5 text-[16px] mt-2">
          <button onClick={decrement}>-</button>
          <p>{item.quantity}</p>
          <button onClick={increment}>+</button>
        </div>
      </div>
      <button
        className="self-start"
        onClick={() => handleDelete(item.productId._id)}
      >
        ❌
      </button>
    </li>
  );
};

export default CartItem;
