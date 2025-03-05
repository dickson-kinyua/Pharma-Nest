import Link from "next/link";

const Orders = () => {
  return (
    <div className="flex flex-col gap-2 bg-white p-2">
      <div className="flex flex-row justify-between">
        <p>My Orders</p>
        <Link href={"#"} className="underline">
          View All
        </Link>
      </div>
      <div className="flex flex-row justify-between">
        <Link href={"#"}>Unpaid</Link>
        <Link href={"#"}>To be shipped</Link>
        <Link href={"#"}>Shipped</Link>
      </div>
    </div>
  );
};

export default Orders;
