"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const MotionCard = motion(Card);

function OrderCardKitchen({
  order,
  isFirstReload,
  onRemoveOrder,
}: {
  order: Order;
  isFirstReload: boolean;
  onRemoveOrder: (orderId: string) => void;
}) {
  const fetchFunction = useFetchPatch();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false); // Állapot az animációhoz

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = Date.now();
      const past = new Date(order.orderedTime).getTime();
      const diffMs = now - past;
      setElapsedTime(Math.floor(diffMs / (1000 * 60)));
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(interval);
  }, [order.orderedTime]);

  const handleClick = async () => {
    setIsRemoving(true); // Indítsd el az animációt
    try {
      await fetchFunction("/order/finish", order._id);
      setTimeout(() => {
        onRemoveOrder(order._id); // Az animáció után távolítsd el az elemet
      }, 300); // Az időtartamnak egyeznie kell az animáció transition értékével
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  const list = order.orderedProducts.map((product) => ({
    name: product.details?.name || "",
    value: product.quantity + " db",
  }));

  const hours = Math.floor(elapsedTime / 60);
  const minutes = elapsedTime % 60;

  return (
    <AnimatePresence>
      {!isRemoving && (
        <MotionCard
          initial={!isFirstReload ? { scale: 0 } : { scale: 1 }}
          animate={!isFirstReload && { scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }} // Kimenő animáció
          transition={{ duration: 0.3 }}
          className="card"
        >
          <CardHeader className="text-center text-3xl">
            <CardTitle>{order.orderNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table list={list} />
            <p className="mt-2">
              Leadás ennyi ideje: {hours !== 0 && `${hours} óra és`} {minutes}{" "}
              perc
            </p>
          </CardContent>
          <CardFooter className="float-right">
            <Button className="btn" onClick={handleClick}>
              Elkészültnek jelölés
            </Button>
          </CardFooter>
        </MotionCard>
      )}
    </AnimatePresence>
  );
}

export default OrderCardKitchen;
