const OrderSummary = ({ subTotal, total, shippingFee }) => {
  return (
    <div className="fixed md:relative right-0 left-0 p-2 bottom-0 bg-white">
      <div className="w-fit">
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
            <p>Ksh {total}</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white p-2 w-full md:w-fit rounded-md mt-5 ">
          CHECKOUT (KSh. {total})
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
