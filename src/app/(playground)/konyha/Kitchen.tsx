"use client";

import OrderCardKitchen from "./_components/OrderCardKitchen";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import IfFullScreen from "@/components/IfFullScreen";
import { useFectchGet } from "@/app/hooks/useFetchGet";

function Kitchen() {
  const { loading, data: orders } = useFectchGet<Order[]>("/order/kitchen");
  console.log(orders);
  if (loading) {
    return <Loading isCentered={true} />;
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
