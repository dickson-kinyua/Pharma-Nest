const OrderSummary = ({ subTotal, total, shippingFee }) => {
  return (
    <div>
      <div>
        <p>Order Info</p>
        <div>
          <div className="flex flex-row justify-between">
            <p>Subtotal</p>
            <p>Ksh {subTotal}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Shipping Cost</p>
            <p>Ksh {shippingFee}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Total</p>
            <p>Ksh {subTotal}</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white p-2 w-full rounded-md mt-5">
          CHECKOUT (KSh. {total})
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
