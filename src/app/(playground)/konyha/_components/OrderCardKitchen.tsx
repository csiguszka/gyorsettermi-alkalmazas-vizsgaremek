"use client"

import { useFetchPatch } from "@/app/hooks/useFetchPatch";
import { Order } from "@/app/model/order-model";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { motion } from "motion/react"

const MotionCard = motion(Card);
function OrderCardKitchen({
  order,
  onRemoveOrder,
}: {
  order: Order;
  onRemoveOrder: (orderId: string) => void;
}) {
  const fetchFunction = useFetchPatch();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = Date.now() +  60 * 60 * 1000;
      const past = new Date(order.orderedTime).getTime();
      const diffMs = now - past;
      const temp = Math.floor(diffMs / (1000 * 60));
      setElapsedTime(temp);
    };

    updateElapsedTime(); // Azonnali frissítés
    const interval = setInterval(updateElapsedTime, 60000); // 1 percenként frissítés

    return () => clearInterval(interval);
  }, [order.orderedTime]);

  const handleClick = async () => {
    console.log("clicked");
    try {
      await fetchFunction("/order/finish", order._id);
      onRemoveOrder(order._id);
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  const list = order.orderedProducts.map((product) => {
    return { name: product.details.name, value: product.quantity + " db" };
  });

  const hours = Math.floor(elapsedTime / 60);
  const minutes = elapsedTime % 60;

  return (
      <MotionCard 
        initial={{ scale: 0 }} 
        animate={{ scale: 1.0 }} 
        transition={{ duration: 0.3 }}
        className="card"
      >
        <CardHeader className="text-center text-3xl">
          <CardTitle>{order.orderNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table list={list} />
          <p className="mt-2">
            Leadás ennyi ideje: {hours !== 0 && `${hours} óra és`} {minutes} perc
          </p>
        </CardContent>
        <CardFooter className="float-right">
          <Button className="btn" onClick={handleClick}>
            Elkészültnek jelölés
          </Button>
        </CardFooter>
      </MotionCard>
  );
}

export default OrderCardKitchen;