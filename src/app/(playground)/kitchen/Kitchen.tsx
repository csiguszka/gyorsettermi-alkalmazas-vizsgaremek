"use client";

import React, { useEffect, useState } from "react";
import OrderCardKitchen from "./_components/OrderCardKitchen";
import Loading from "@/components/Loading";
import Screen from "@/components/Screen";
import { Order } from "@/app/model/order-model";
import IfFullScreen from "@/components/IfFullScreen";
import { useFectchGet } from "@/app/hooks/useFetchGet";
import MyWebSocketComponent from "@/components/MyWebSocketComponent";
import { Button } from "@/components/ui/button";

function Kitchen() {
  const { loading, data: initialOrders } =
    useFectchGet<Order[]>("/order/kitchen");
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
        <h1 className="text-center text-4xl mb-5">Konyhai kijelző</h1>
      </IfFullScreen>
      <MyWebSocketComponent<Order>
        setIsFirstReload={setIsFirstReload}
        setOrders={setOrders}
        name="kitchen"
      />
      <Button className="btn mb-4">Előző Rendelések</Button>
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {orders.map((order) => (
          <OrderCardKitchen
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

export default Kitchen;
