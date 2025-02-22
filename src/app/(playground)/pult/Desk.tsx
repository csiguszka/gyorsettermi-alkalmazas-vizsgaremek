"use client";

import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import OrderCardDesk from "./_components/OrderCardDesk";
import IfFullScreen from "@/components/IfFullScreen";
import { useFectchGet } from "@/app/hooks/useFetchGet";

function Desk() {
  const { loading, data: orders } = useFectchGet<Order[]>("/order/ongoing");

  if (loading) {
    return <Loading isCentered={true} />;
  }

  return (
    <Screen>
      <IfFullScreen>
        <h1 className="text-center text-4xl mb-5">Pult kijelző</h1>
      </IfFullScreen>
      <div className="grid grid-cols-4 gap-3">
        {orders?.map((order) => {
          return <OrderCardDesk key={order._id} order={order} />;
        })}
      </div>
    </Screen>
  );
}
export default Desk;
