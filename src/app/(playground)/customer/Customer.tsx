"use client";

import { useFetchOrderOngoing } from "@/app/hooks/useFetchOrderOngoing";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import OrderCardCustomer from "./components/OrderCardCustomer";
import { Order } from "@/app/model/order-model";

function Customer() {
  const { loading, data: orders } =
    useFetchOrderOngoing<Order[]>("/order/ongoing");

  if (loading) {
    return <Loading />;
  }

  return (
    console.log(orders),
    (
      <Screen>
        <div className="grid grid-cols-4 gap-3">
          {orders?.map((order) => {
            return <OrderCardCustomer key={order._id} order={order} />;
          })}
        </div>
      </Screen>
    )
  );
}
export default Customer;
