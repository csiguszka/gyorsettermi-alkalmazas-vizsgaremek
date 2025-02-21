"use client";

import { useFetchOrderOngoing } from "@/app/hooks/useFetchOrderOngoing";
import OrderCardKitchen from "./_components/OrderCardKitchen";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import IfFullScreen from "@/components/IfFullScreen";

function Kitchen() {
  const { loading, data: orders } =
    useFetchOrderOngoing<Order[]>("/order/ongoing");

  if (loading) {
    return <Loading />;
  }

  return (
    <Screen>
      <IfFullScreen>
        <h1 className="text-center text-4xl mb-5">Konyhai kijelző</h1>
      </IfFullScreen>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {orders?.map((order) => {
          return <OrderCardKitchen key={order._id} order={order} />;
        })}
      </div>
    </Screen>
  );
}
export default Kitchen;
