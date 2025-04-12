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
import { useRouter } from "next/navigation";

function Kitchen() {
  const router = useRouter();
  const { loading, data: initialOrders } =
    useFectchGet<Order[]>("/order/kitchen");
  const [orders, setOrders] = useState<Order[]>(initialOrders || []);
  const [isFirstReload, setIsFirstReload] = useState<boolean>(true);

  useEffect(() => {
    if (initialOrders) {
      console.log(initialOrders);
      console.log("initialOrders");
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const handleRemoveOrder = (orderId: string) => {
    console.log(orderId);
    setOrders((prevOrders) => {
      const newOrders = prevOrders.filter((order) => {
        return order._id !== orderId;
      });
      return newOrders;
    });
  };

  if (loading) {
    return <Loading isCentered={true} />;
  }

  return (
    <Screen>
      <IfFullScreen>
        <h1 className="text-center text-4xl mb-5">Konyhai kijelző</h1>
      </IfFullScreen>
      <MyWebSocketComponent
        setIsFirstReload={setIsFirstReload}
        setOrders={setOrders}
        name="kitchen"
      />
      <Button
        onClick={() => router.push("/kitchen-orders")}
        className="btn mb-4"
      >
        Előző Rendelések
      </Button>
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
