"use client";

const CartItem = ({ item, handleDelete }) => {
  //Takes an item prop from cartItems component

  return (
    <li className="flex flex-row gap-4 border-b border-solid p-1">
      <img
        className="w-16 h-10"
        src={item.productId.imageUrl}
        alt={item.title}
      />
      <div className="w-36">
        <p className="font-bold  truncate">{item.productId.title}</p>
        <p>KSh. {item.productId.price}</p>
        <p>Quantity:{item.quantity}</p>
        <div className="flex gap-2">
          <p>-</p>
          <p>1</p>
          <p>+</p>
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
