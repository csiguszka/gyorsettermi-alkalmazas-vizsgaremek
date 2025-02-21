"use client";

import { useFetchOrderOngoing } from "@/app/hooks/useFetchOrderOngoing";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import OrderCardDesk from "./_components/OrderCardDesk";
import IfFullScreen from "@/components/IfFullScreen";

function Desk() {
  const { loading, data: orders } =
    useFetchOrderOngoing<Order[]>("/order/ongoing");

  if (loading) {
    return <Loading />;
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
