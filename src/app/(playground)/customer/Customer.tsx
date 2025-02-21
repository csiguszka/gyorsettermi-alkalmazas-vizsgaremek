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
        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full">
          <div className="sm:w-1/2">
            <h1 className="text-5xl text-center sm:text-6xl mb-5">Készül</h1>
            <div className="grid sm:flex flex-col lg:grid grid-cols-2 gap-5">
              {orders?.map((order) => {
                return <OrderCardCustomer key={order._id} order={order} />;
              })}
            </div>
          </div>
          <div className="w-2 bg-primary"></div>
          <div className="sm:w-1/2">
            <h1 className="text-5xl text-center sm:text-6xl mb-5">Elkészült</h1>
            <div className="grid sm:flex flex-col lg:grid grid-cols-2 gap-5">
              {orders?.map((order) => {
                return <OrderCardCustomer key={order._id} order={order} />;
              })}
            </div>
          </div>
        </div>
      </Screen>
    )
  );
}
export default Customer;
