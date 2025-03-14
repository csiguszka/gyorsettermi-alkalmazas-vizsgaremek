"use client";

import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import OrderCardDesk from "./_components/OrderCardDesk";
import IfFullScreen from "@/components/IfFullScreen";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import MyWebSocketComponent from "@/components/MyWebSocketComponent";
import { useEffect, useState } from "react";

function Desk() {
  const { loading, data: initialOrders } = useFectchGet<Order[]>("/order/salesman");
  const [orders, setOrders] = useState<Order[]>(initialOrders || []);

  useEffect(() => {
    if (initialOrders) {
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  const handleRemoveOrder = (orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
  };

  if (loading) {
    return <Loading isCentered={true} />;
  }

  return (
    <Screen>
      <IfFullScreen>
        <h1 className="text-center text-4xl mb-5">Pult kijelző</h1>
        <MyWebSocketComponent setOrders={setOrders} name="salesman" />
      </IfFullScreen>
      <div className="grid grid-cols-4 gap-3">
        {orders?.map((order) => (
          <OrderCardDesk key={order._id} order={order} onRemoveOrder={handleRemoveOrder} />
        ))}
      </div>
    </Screen>
  );
}

export default Desk;
