"use client";

import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import OrderCardDesk from "./_components/OrderCardDesk";
import IfFullScreen from "@/components/IfFullScreen";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import MyWebSocketComponent from "@/components/MyWebSocketComponent";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Desk() {
  const { loading, data: initialOrders } =
    useFectchGet<Order[]>("/order/salesman");
  const [orders, setOrders] = useState<Order[]>(initialOrders || []);
  const [isFirstReload, setIsFirstReload] = useState<boolean>(true);

  useEffect(() => {
    if (initialOrders) {
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  const handleRemoveOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderId)
    );
  };

  if (loading) {
    return <Loading isCentered={true} />;
  }

  return (
    <Screen>
      <IfFullScreen>
        <h1 className="text-center text-4xl mb-5">Pult kijelző</h1>
      </IfFullScreen>
      <MyWebSocketComponent
        setIsFirstReload={setIsFirstReload}
        setOrders={setOrders}
        name="salesman"
      />
      <Button className="btn mb-4">Előző Rendelések</Button>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {orders?.map((order) => (
          <OrderCardDesk
            key={order._id}
            order={order}
            onRemoveOrder={handleRemoveOrder}
            isFirstReload={isFirstReload}
          />
        ))}
      </div>
    </Screen>
  );
}

export default Desk;
